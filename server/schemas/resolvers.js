// require authenticationerror class which is used to throw errors when an user is not authenticated
const { AuthenticationError } = require("apollo-server-express");
// imports the models that was defined with the Mongoose schema
const { User, Pet, Species, Need } = require("../models");
// used to sign a JWT for authentication purposes
const { signToken } = require("../utils/auth");

// resolver object responsible for queries and mutations defined in the GraphQL APIs (typeDefs)
const resolvers = {
  // the fetching of the data
  Query: {
    // retrieves information about a user
    user: async (parent, args, context) => {
      if (context.user) {
        // the context handles authentication and carry the JWT for authenticated request
        const user = await User.findById(context.user._id).populate({
          // populates the pets array in user
          path: "pets",
          // populates the species data in each pet
          populate: {
            path: "speciesId",
            // populate needs data within the species object
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
    // retrieves information of all available species
    species: async () => {
      return await Species.find().populate("needs");
    },
  },
  // changes to the data
  Mutation: {
    // addUser mutation logic
    addUser: async (parent, args) => {
      try {
        console.log(args);
        // create the new user
        const user = await User.create(args);
        const token = signToken(user);

        // generate token once logged in
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    // login mutation logic
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        // if email does not match throw error
        throw new AuthenticationError("Incorrect credentials");
      }
      // check for password
      const correctPw = await user.isCorrectPassword(password);

      // if password does not match throw error
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // generate token once logged in
      const token = signToken(user);

      return { token, user };
    },
    // addPet mutation logic
    addPet: async (parent, { name, speciesId, age, gender }, context) => {
      if (context.user) {
        try {
          console.log({ name, speciesId, age, gender });
          // create the new pet
          const pet = await Pet.create({
            name,
            speciesId: speciesId,
            age,
            gender,
            owner: context.user._id,
          });

          // update the user's pets array
          await User.findByIdAndUpdate(context.user._id, {
            $push: { pets: pet._id },
          });
          return Pet.findOne({ _id: pet._id })
            .populate("owner")
            .populate({
              path: "speciesId",
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
          // return the update pet object
          return Pet.findOne({ _id: petID })
            .populate("owner")
            .populate({
              path: "speciesId",
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
          // find the pet by pet id and user id and delete it
          const pet = await Pet.findOneAndDelete({ _id: petID, owner: userID });
          // if no pet is found using the id then throw error
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
        // create the new species
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
          // insert the needs into the found species
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
