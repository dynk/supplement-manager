const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    require: true,
    minlength: 1
  },
  accessLevel: {
    type: String,
    enum: ['ADMIN', 'REGULAR'],
    default: 'REGULAR'
  }
});


UsersSchema.methods.toJSON = function () {
  const candidate = this;
  const candidateObject = candidate.toObject();
  return _.pick(candidateObject, ['_id', 'email']);
};

UsersSchema.methods.removeToken = function (authenticationToken) {
  const candidate = this;
  return candidate.update({
    $pull: {
      authenticationTokens: {authenticationToken}
    }
  });
};

UsersSchema.pre('save', function (next) {
  const candidate = this;
  candidate.lastUpdateDate = new Date();
  next();
});

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = {UsersModel};
