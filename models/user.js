// dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = require('./role');
var Team = require('./team');
var Department = require('./department');

var crypto = require('crypto');
var util = require('util');

var userSchema = new Schema({
  name: String,
  lastname: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  team: {
    type: Schema.Types.Mixed,
    default: null
  },
  department: {
    type: Schema.Types.Mixed,
    default: null
  },
  role: {
    type: Schema.Types.Mixed,
    default: null
  },
  avatar: String,
  skype: {
    type: String,
    default: 'Unknown'
  },
  phone: {
    type: Number,
    default: 0
  }
});

userSchema.methods.checkAccess = function(role, callback) {
  Role.checkAccess(this.role.name, role, callback);
};

userSchema.statics.createUser = function(firstName, lastName, login, password, team, department, role, callback) {
  //todo: check team, department.
  var user = new User({
    name: firstName,
    lastname: lastName,
    username: login,
    password: User.hashPassword(password)
  });


  //console.log(typeof department.name);
  //console.log(department);
  //todo: refactor, check for reflection, synchronize.
  if (util.isString(department.name)) {
    Department.findOne({name: department.name}, function(err, model) {
      if (model) {
        user.department = model;

        user.setTeam(team.name);

        user.save();
      }
    });
  } else if (department instanceof Department) {
    user.department = department;

    user.setTeam(team.name);
  }

  if (util.isString(role)) {
    //console.log('role is string = ' + role);
    Role.findOne({name: role}, function(err, model) {
      if (model) {
        //console.log('role found');
        user.role = model;

        user.save();
      }
    });
  } else if (role instanceof Role) {
    user.role = role;
  }

  user.save(callback);
};

userSchema.methods.setTeam = function(team) {
  var self = this;

  this.department.teams.forEach(function(item) {
    //console.log(item);
    if (item.name == team) {
      //console.log('team is found');
      self.team = item;
      return true;
    }
  });
};

//todo: make it work.
userSchema.statics.hashPassword = function(password) {
  //return crypto.createHash('md5').update(password).digest('hex');
  return password;
}

userSchema.methods.getSafeFields = function() {
  //todo: delete not safe fields based on model config.
};

var User = mongoose.model('User', userSchema);

module.exports = User;
