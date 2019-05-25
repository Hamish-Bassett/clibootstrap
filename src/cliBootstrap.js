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

  /**
   * @function constructHelp
   * @description creates a list of events that have listeners bound to them.
   */
  constructHelp() {
    const eventNames = this.eventNames();
    let message = `help menu for ${process.title}\n`;

    eventNames.forEach((name) => {
      message += `${name}`;
    });

    message += 'help - prints this message\n';
    message += 'exit - terminates this program\n';

    this.helpMessage = message;
  }
}

module.exports = cliBootstrap;
