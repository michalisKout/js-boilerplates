const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

const adapterSetup = { adapter: new EnzymeAdapter() };

Enzyme.configure(adapterSetup);
