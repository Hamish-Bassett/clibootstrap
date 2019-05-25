const chai = require('chai');
const CLIProcess = require('../src/cliBootstrap');

const cliProcess = new CLIProcess();

const defaultHelp = cliProcess.helpMessage;

const { expect } = chai;

describe('constructHelp', () => {
  afterEach(() => {
    cliProcess.helpMessage = defaultHelp;
    cliProcess.removeAllListeners();
  });
  it('the method should have a method called cliProcess', () => {
    expect(cliProcess.constructHelp).to.be.a('function');
  });
  it('the method should change the helpMessage property', () => {
    expect(cliProcess.helpMessage).to.eql(defaultHelp);
    cliProcess.constructHelp();
    expect(cliProcess.helpMessage).to.not.eql(defaultHelp);
  });
  it('the new message should include the default commands', () => {
    cliProcess.constructHelp();
    expect(cliProcess.helpMessage).to.include(process.title);
    expect(cliProcess.helpMessage).to.match(/help/);
    expect(cliProcess.helpMessage).to.match(/exit/);
  });
  it('the new message should include the name of all events emitted from the class', () => {
    cliProcess.on('foo', () => { console.log('foo'); });
    cliProcess.on('bar', () => { console.log('bar'); });
    cliProcess.on('baz', () => { console.log('baz'); });
    cliProcess.constructHelp();
    expect(cliProcess.helpMessage).to.include('foo');
    expect(cliProcess.helpMessage).to.include('bar');
    expect(cliProcess.helpMessage).to.include('baz');
  });
});
