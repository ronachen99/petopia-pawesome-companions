const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Species, Need } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('pets');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    species: async () => {
      return await Species.find();
    }
  },
  Mutation: {
    // addUser mutation logic
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // login mutation logic
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // addPet mutation logic
    addPet: async (parent, { name, species, age, gender, owner }) => {},
    // updatePet mutation logic
    updatePet: async (parent, { petID, name }) => {},
    // deletePet mutation logic
    deletePet: async (parent, { petID, userID }) => {}
  }
};
