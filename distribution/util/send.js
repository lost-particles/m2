#!/usr/bin/env node
const serialization = require('./serialization');

/*
* @author : Subham Kumar Das
* */

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --node [node] --service [service] --method [method] --args [args]')
  .option('node', {
    describe: 'Node address (should be like https://127.0.0.1:8080)',
    type: 'string',
    demandOption: true,
  })
  .option('service', {
    describe: 'Name of the service to be called',
    type: 'string',
    demandOption: true,
  })
  .option('method', {
    describe: 'Method of the service to be called',
    type: 'string',
    demandOption: true,
  })
  .option('args', {
    describe: 'Arguments to pass to the method, in JSON format to the method (Json should be like {"message": "param1"}  OR  {"message": ["param1", "param2", "param3"]})',
    type: 'string',
  })
  .help('h')
  .alias('h', 'help')
  .argv;

// Function to send HTTP request
const sendRequest = async () => {
  try {
    const url = `${argv.node}/${argv.service}/${argv.method}`;
    const args = argv.args ? JSON.parse(argv.args) : {'message':[]};
    if (!(args.message instanceof Array)) {
      args.message = [args.message];
    }
    const response = await axios({
      method: 'PUT',
      url: url,
      data: serialization.serialize(args.message),
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

const promptUser = async () => {
  const inquirer = await import('inquirer');
  const { prompt } = inquirer.default;

  const questions = [
    {
      type: 'confirm',
      name: 'confirmSend',
      message: `Are you sure you want to send this request to '${argv.method}' method of '${argv.service}' service at ${argv.node} ?`,
      default: false,
    }
  ];

  const answers = await prompt(questions);  // Using the extracted prompt function
  if (answers.confirmSend) {
    await sendRequest();
  } else {
    console.log('Request canceled.');
  }
};

if (require.main === module) {
  promptUser();
}
