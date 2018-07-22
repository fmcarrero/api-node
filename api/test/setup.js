const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
chai.config.includeStack = true;
chai.use(dirtyChai);
chai.use(chaiChange);