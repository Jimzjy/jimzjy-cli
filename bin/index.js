#!/usr/bin/env node

const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../package.json')
const program = require('commander')
const { chooseFeatures } = require('../src/prompt')

function checkNodeVersion (wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(packageConfig.engines.node, 'jimzjy-cli')

program
  .version(`jimzjy-cli ${packageConfig.version}`)
  .usage('<command> [options]')

program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log(chalk.red(`Unknown command ${chalk.yellow(cmd)}`))
});

program
  .command('create <app-name>')
  .description('create a new project')
  .action(async (name) => {
    const answers = await chooseFeatures()
    require('../src/create')(name, answers)
  })

program.parse(process.argv)
