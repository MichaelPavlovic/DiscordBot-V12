const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MathCommand extends BaseCommand {
  constructor() {
    super('math', 'misc', ['calc', 'calculator'], 'math [number] [+ | - | * | /] [number]');
  }

  run(client, message, args) {
    if(!args[0]) return message.reply('Enter a first number'); //if there is no first arg
    if(!args[1]) return message.reply('Enter an operator'); //if there is no second arg
    if(!args[2]) return message.reply('Enter a second number'); //if there is no third arg

    //send the result of calculator to the channel
    message.channel.send(calculator(args[0], args[1], args[2]));
  }
}

function calculator(num1, operator, num2){
  if(isNaN(num1)) return 'Number 1 is not a number'; //if the first number is not a number return an error message
  if(isNaN(num2)) return 'Number 2 is not a number'; //if the second number is not a number return an error message

  //switch through the allowed operators and perform the specified operations
  switch(operator){
    case "+":
      return parseInt(num1) + parseInt(num2);
      break;
    case "-":
      return num1 - num2;
      break;
    case "*":
      return num1 * num2;
      break;
    case "/":
      return (num1 / num2).toFixed(2);
      break;
    default:
      return "Enter a valid operator (+|-|*|/)";
      break;
  }
}