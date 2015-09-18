'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TestGenerator = module.exports = function TestGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.option('initialOption', {
    desc: 'The initial generator option',
    type: String
  });
};

util.inherits(TestGenerator, yeoman.generators.Base);

TestGenerator.prototype.prompting = function askFor() {
  var self = this;
  var cb = this.async();

  var prompts = [{
    name: 'initialOption',
    message: 'What is your initial option?',
    default: 'initial option',
    when: function() {return !self.options.initialOption;}
  }];

  this.prompt(prompts, function (props) {
    self.initialOption = self.options.initialOption || props.initialOption;

    // compose with sub gen
    self.composeWith('test:sub', {
      options: {
        subOption: 'my sub options'
      },
      args: ['sub']
    });

    cb();
  });
};

TestGenerator.prototype.default = function app() {
  this.log('running initial gen');
};
