'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var SubGenerator = module.exports = function SubGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.option('subOption', {
    desc: 'The sub generator option',
    type: String
  });
};

util.inherits(SubGenerator, yeoman.generators.NamedBase);

SubGenerator.prototype.prompting = function askFor() {
  var self = this;
  var cb = this.async();

  var prompts = [{
    name: 'subOption',
    message: 'What is your sub option?',
    default: 'sub option',
    when: function() {return !self.options.subOption;}
  }];

  this.prompt(prompts, function (props) {
    self.subOption = self.options.subOption || props.subOption;

    cb();
  });
};

SubGenerator.prototype.default = function app() {
  this.log('running sub gen with ' + this.subOption);
};
