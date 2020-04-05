import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);
const getProjectDir = options => options.targetDirectory + '/' + options.projectName;

async function copyTemplateFiles(options) {
	const projectDir = getProjectDir(options);
	console.log('Creating a new directory => ', chalk.green.bold(projectDir));
	return copy(options.templateDirectory, projectDir, {
		clobber: false
	});
}

export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd()
	};

	const currentFileUrl = import.meta.url;
	const templateDir = path.resolve(
		new URL(currentFileUrl).pathname,
		'../../templates',
		options.template.toLowerCase()
	);
	options.templateDirectory = templateDir;

	try {
		await access(templateDir, fs.constants.R_OK);
	} catch (err) {
		console.error('%s Invalid template name', chalk.red.bold('ERROR'));
		process.exit(1);
	}

	const tasks = new Listr([
		{
			title: 'Copy project files',
			task: () => copyTemplateFiles(options)
		},
		{
			title: 'Install dependencies',
			task: () =>
				projectInstall({
					cwd: getProjectDir(options)
				}),
			skip: () => (!options.runInstall ? 'Pass --install to automatically install dependencies' : undefined)
		}
	]);

	await tasks.run();

	console.log('Copy project files');
	await copyTemplateFiles(options);

	console.log('%s Project ready', chalk.green.bold('DONE'));
	return true;
}
