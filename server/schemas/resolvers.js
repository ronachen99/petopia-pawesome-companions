const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Species, Need } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "pets",
          populate: {
            path: "species",
            populate: {
              path: "needs",
            },
          },
        });
        console.log(user);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    species: async () => {
      return await Species.find().populate("needs");
    },
  },
  Mutation: {
    // addUser mutation logic
    addUser: async (parent, args) => {
      try {
        console.log(args);
        // create the new user
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    // login mutation logic
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // addPet mutation logic
    addPet: async (parent, { name, speciesID, age, gender }, context) => {
      if (context.user) {
        try {
          console.log({ name, speciesID, age, gender });
          // create the new pet
          const pet = await Pet.create({
            name,
            species: speciesID,
            age,
            gender,
            owner: context.user._id,
          });

          // update the user's pets array
          await User.findByIdAndUpdate(context.user._id, { $push: { pets: pet._id } });
          return Pet.findOne({ _id: pet._id })
            .populate("owner")
            .populate({
              path: "species",
              populate: {
                path: "needs",
              },
            });
        } catch (error) {
          console.log(error);
        }
      }
      throw new AuthenticationError("Not logged in");
    },
    // updatePet mutation logic
    updatePet: async (parent, { petID, name }, context) => {
      if (context.user) {
        try {
          console.log({ petID, name });
          // find the pet by ID and update its name
          await Pet.findByIdAndUpdate(petID, { name }, { new: true });

          return Pet.findOne({ _id: petID })
            .populate("owner")
            .populate({
              path: "species",
              populate: {
                path: "needs",
              },
            });
        } catch (error) {
          console.log(error);
        }
      }
      throw new AuthenticationError("Not logged in");
    },
    // deletePet mutation logic
    deletePet: async (parent, { petID, userID }, context) => {
      if (context.user) {
        try {
          console.log({ petID, userID });
          // find the pet by ID and owner
          const pet = await Pet.findOneAndDelete({ _id: petID, owner: userID });

          if (!pet) {
            throw new Error("Pet not found or you are not the owner.");
          }

          // update user's pets arrray
          await User.findByIdAndUpdate(userID, { $pull: { pets: petID } });

          // return the updated user
          const user = await User.findById(userID).populate("pets");
          return user;
        } catch (error) {
          console.log(error);
        }
      }
      throw new AuthenticationError("Not logged in");
    },
    addSpecies: async (
      parent,
      { speciesType, description, needs, image, alt }
    ) => {
      try {
        // Create the new species
        const species = await Species.create({
          speciesType,
          description,
          image,
          alt,
        });

        // if needs are provided, create and associate them with the species
        if (needs && needs.length > 0) {
          const createdNeeds = await Need.insertMany(needs);
          console.log(createdNeeds);
          await Species.updateOne(
            { _id: species._id },
            { $addToSet: { needs: { $each: createdNeeds } } }
          );
        }
        return Species.findOne({ _id: species._id }).populate("needs");
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
