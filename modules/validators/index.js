var logger = require('../alice-logger');

module.exports.emailValidator = [function(val) {
  logger.debug('[Validators::emailValidator] call');

  if (val == null) {
    return true;
  }

  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(val);
}, 'InvalidEmail'];

module.exports.githubValidator = [function(val) {
  logger.debug('[Validators::githubValidator] call');

  if (val == null) {
      return true;
  }

  var githubRegex = /https:\/\/github.com\/.{1}.*/;
  return githubRegex.test(val);
}, 'InvalidGithubUrl'];

module.exports.phoneValidator = [function(val) {
  logger.debug('[Validators::phoneValidator] call');

  if (val == null) {
    return true;
  }

  var phoneRegex = /^\d{11}$/;
  return phoneRegex.test(val);

}, 'InvalidPhone'];

module.exports.siteValidator = [function(val) {
  logger.debug('[Validators::siteValidator] call');

  if (val == null) {
    return true;
  }

  var siteRegex = /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/;
  return siteRegex.test(val);

}, 'InvalidSite'];
