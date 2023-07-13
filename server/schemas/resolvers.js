const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Species, Need } = require('../models');
const { signToken } = require('../utils/auth');
