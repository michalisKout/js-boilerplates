const ENZYME_CONFIG_FILE_PATH = './config/enzyme.config.js';

module.exports = {
  verbose: false,
  setupFilesAfterEnv: [ENZYME_CONFIG_FILE_PATH],
};
