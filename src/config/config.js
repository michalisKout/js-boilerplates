export default {
	PROJECT_TEMPLATES: ['react-lite', 'vanilla-js'],
	INIT_ARGS: {
		'--yes': Boolean,
		'--install': Boolean,
		'-y': '--yes',
		'-i': '--install',
	},
	DEFAULT: {
		TEMPLATE: 'react-lite',
		NAME: 'my-react-lite-project',
	},
	PROJECT_QUESTIONS: {
		skipPrompts: {
			type: 'confirm',
			name: 'skipPrompts',
			message: 'Do you want to skip config ?',
			default: false,
		},
		template: {
			type: 'list',
			name: 'template',
			message: 'Please choose which project template to use',
			choices: ['react-lite', 'vanilla-js'],
			default: 'react-lite',
		},
		projectName: {
			type: 'input',
			name: 'projectName',
			message: 'Please give a name to your project',
			default: 'my-custom-boilerplate-project',
		},
		runInstall: {
			type: 'confirm',
			name: 'runInstall',
			message: 'Do you want to automatically install npm deps ?',
			default: false,
		},
	},
};
