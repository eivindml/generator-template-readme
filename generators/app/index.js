'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const remote = require('yeoman-remote');
const path = require('path');

module.exports = class extends Generator {
	prompting() {

		this.log(
			'\nWelcome to ' + chalk.red('generator-template-readme') + ' generator! 👨🏼‍🍳\n'
		);

		const prompts = [{
			type: 'confirm',
			name: 'someAnswer',
			message: 'Would you like to enable this option?',
			default: true
		},
        {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	writing() {

		remote('eivindml', 'template-readme', function(error, cachePath) {
			this.fs.copyTpl(
				path.join(cachePath, 'template-readme.md'),
				this.destinationPath('readme.md'), {
					name: this.props.name,
                    username: this.props.name,
                    repoName: this.props.name,
                    description: this.props.name,
                    fullName: this.props.name,
                    websiteUrl: this.props.name
				}
			);
		}.bind(this));
	}

	install() {
        /**
        this.installDependencies({
			npm: false,
			bower: false,
			yarn: false
		});
        */
	}
};
