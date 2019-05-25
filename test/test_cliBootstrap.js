/* eslint-disable no-unused-expressions */
const chai = require('chai');
const events = require('events');
const { spawn } = require('child_process');

const CLIBootstrap = require('../src/cliBootstrap');

let cliBootstrap;

const { expect } = chai;
chai.should();

describe('CLIBootstrap', () => {
  it('The module should export a function', () => {
    expect(CLIBootstrap).to.be.a('function');
  });
  it('the function should construct and object', () => {
    const constructed = new CLIBootstrap();
    expect(constructed).to.be.an('object');
  });

  before(() => {
    cliBootstrap = new CLIBootstrap();
  });
  describe('cliBootstrap', () => {
    it('the constructed object should inherit from event emitter', () => {
      (cliBootstrap instanceof events).should.be.true;
    });
    describe('inputHandler', () => {
      it('the class should have a method called inputHandler', () => {
        expect(cliBootstrap.inputHandler).to.be.a('function');
      });
      it('the function should take a string input and emit an event with the first word', (done) => {
        cliBootstrap.once('test', (args) => {
          expect(args).to.be.an('array');
          args.forEach((argument) => {
            expect(argument).to.be.a('string');
          });
          done();
        });
        cliBootstrap.inputHandler('test arguments');
      });
      it('It should not emit an event on help.', (done) => {
        /** @todo workout this test */
        cliBootstrap.on('help', () => {
          done(new Error('protected events should not produce events'));
        });
        cliBootstrap.inputHandler('help');
        done();
      });
    });
  });
});
