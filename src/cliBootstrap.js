const events = require('events');

class cliBootstrap extends events {
  constructor() {
    super();
    this.seperator = ' ';
    this.helpMessage = 'this is the help message';
  }

  inputHandler(userInput) {
    const [command, ...args] = userInput.split(this.seperator);

    switch (command) {
      case 'help':
        console.log(this.helpMessage);
        break;
      case 'exit':
        process.exit();
        break;
      default:
        this.emit(command, args);
        break;
    }
  }
}

module.exports = cliBootstrap;
