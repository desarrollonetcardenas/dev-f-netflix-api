const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birth_date: {
    type: Date
  },
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  nationality: {
    type: String
  },
  user_payment: {
    type: String
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: "subscriptions"
  },
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'movies'
  }],
  is_active: {
    type: Boolean,
    default: true
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'movies'
  }]
}, {
  'collection': 'users',
  timestamps: true
});

/**
 * Hooks. Estas son funcionalidades que se ejecutan antes de guardar (pre) y/o despues de ejecutar alguna accion (post)
 */
UserSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {

    if( err ) return next( err );

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });

  });
});

UserSchema.methods.comparePasswords = function (candidate, cb) {
  bcrypt.compare(candidate, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
}

module.exports = mongoose.model('users', UserSchema, 'users');
