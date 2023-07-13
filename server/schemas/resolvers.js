const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Species, Need } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("pets");
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    species: async () => {
      return await Species.find();
    },
    needs: async () => {
      return await Need.find();
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
    addPet: async (parent, { name, species, age, gender, owner }, context) => {
      if (context.user) {
        try {
          console.log({ name, species, age, gender, owner });
          // create the new pet
          const pet = await Pet.create({
            name,
            species,
            age,
            gender,
            owner,
          });

          // update the user's pets array
          await User.findByIdAndUpdate(owner, { $push: { pets: pet._id } });

          return pet;
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
          const pet = await Pet.findByIdAndUpdate(
            petID,
            { name },
            { new: true }
          );

          return pet;
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
          const pet = await Pet.findOne({ _id: petID, owner: userID });

          if (!pet) {
            throw new Error("Pet not found or you are not the owner.");
          }

          // remove the pet
          await pet.remove();

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
    addSpecies: async (parent, { speciesType, description }) => {
      // logic for addSpecies mutation
      const species = await Species.create({ speciesType, description });
      return species;
    },
    addNeed: async (parent, { needType, description }) => {
      // logic for addNeed mutation
      const need = await Need.create({ needType, description });
      return need;
    },
  },
};

module.exports = resolvers;
