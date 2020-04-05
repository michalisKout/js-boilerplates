import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import config from './config/config';

function parseArgumentsIntoOptions(rawArgs) {
	const args = arg(config.INIT_ARGS, {
		argv: rawArgs.slice(2),
	});
	return {
		skipPrompts: args['--yes'] || false,
		template: args._[0],
		projectName: args._[1],
		runInstall: args['--install'] || false,
	};
}

const getQuestionsLogs = (options) => {
	const questions = [];

	Object.keys(options).forEach((option) => {
		if (!options[option]) {
			questions.push(config.PROJECT_QUESTIONS[option]);
		}
	});

	return questions;
};

async function promptForMissingOptions(options) {
	if (options.skipPrompts) {
		return {
			...options,
			template: options.template || config.DEFAULT.TEMPLATE,
			projectName: options.projectName || config.DEFAULT.NAME,
		};
	}

	const questions = getQuestionsLogs(options);

	const answers = await inquirer.prompt(questions);
	return {
		...options,
		template: options.template || answers.template,
		projectName: options.projectName || answers.projectName,
		runInstall: options.runInstall || answers.runInstall,
	};
}

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	options = await promptForMissingOptions(options);
	createProject(options);
}
