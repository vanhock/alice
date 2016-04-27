var restful = require('node-restful');
var mongoose = restful.mongoose;

var validators = require('../modules/validators');

var teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  logo: {
    type: String,
    default: '../img/empty-img.jpg'
  },
  color: {
    type: String,
    default: null,
    validate: validators.colorValidator
  },
  phone: {
    type: String,
    default: null,
    validate: validators.phoneValidator
  },
  description: {
    type: String,
    default: null
  },
  lead: {
    type: [mongoose.Schema.Types.Mixed]
  }
});

teamSchema.statics.createTeam = function(name, callback) {
  var team = new Team({
    name: name
  });

  team.save(function (err, team) {
    if (err) {
      callback(err);
    } else {
      callback(null, team);
    }
  });
};

var Team = mongoose.model('Teams', teamSchema);

module.exports = Team;
