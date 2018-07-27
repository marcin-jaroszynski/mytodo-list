#!/usr/bin/env node
process.env.NODE_CONFIG_DIR = '../config';
process.env.NODE_ENV='prod';

const program = require('commander');
const User = require('../server/db/models/user');
const setup = require('../server/setup');

program
  .option('-u --username <username>', 'Login')
  .option('-p --password <password>', 'Password')
  .action()
  .parse(process.argv);

let createUser = async (login, password) => {
  try {
    const newUser = new User({login: login, password: password});
    await newUser.save();
    process.exit();
  } catch(error) {
      console.log('CLI.CREATE-USER.ERROR: ', error);
  }
}

if (program.username && program.password) {
  setup();
  createUser(program.username, program.password);

}
