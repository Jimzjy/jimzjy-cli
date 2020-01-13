const inquirer = require('inquirer')

exports.chooseFeatures = async () => {
  const { type, name, message, choices } = features
  let answers = await inquirer.prompt({ type, name, message, default: [], choices })
  for (let item of answers.features) {
    answers[item] = true
  }

  if (answers.router) {
    const { historyRouter } = await inquirer.prompt({
      type: 'confirm',
      name: 'historyRouter',
      message: 'Use history router ?'
    })
    answers.historyRouter = historyRouter
  }

  return answers
}

const features = {
  type: 'checkbox',
  name: 'features',
  message: 'Check the features needed for your project:',
  choices: [
    {
      name: 'router',
      value: 'router',
      short: 'router',
    },
    {
      name: 'vuex',
      value: 'vuex',
      short: 'vuex',
    }
  ]
}