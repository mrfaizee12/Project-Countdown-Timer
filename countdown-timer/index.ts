#!/usr/bin/env node

import inquirer from 'inquirer';
import { differenceInSeconds } from 'date-fns';
import chalk from 'chalk';

   console.log(chalk.bold.italic.bgMagentaBright`\n \t\t Welcome to CountDown Timer\n`);


interface Response {
  userInput: number;
}

const response: Response = await inquirer.prompt([
  {
    name: 'userInput',
    type: 'number',
    message: 'Please enter the amount of seconds',
    validate: (input: any) => {
      if (isNaN(input)) {
        return 'Please enter a valid number';
      } else if (input > 60) {
        return 'Seconds must be within 60';
      } else {
        return true;
      } 
    },
  },
]);

let input: number = response.userInput;

function startTime(value: number) {
  const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
  const intervalTime = new Date(initialTime);
  
  const timer = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = differenceInSeconds(intervalTime, currentTime);

    if (timeDifference <= 0) {
      console.log(chalk.red('Timer has expired'));
      clearInterval(timer);
      process.exit();
    }
    
    const min = Math.floor((timeDifference % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDifference % 60);
    console.log(chalk.blue(`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`));
  }, 1000);
}

startTime(input);

