const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const render = require('consolidate').handlebars.render
const chalk = require('chalk')
const path = require('path')
const async = require('async')

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

function filter(answers) {
  return (files, metalsmith, done) => {

    for (let file in files) {
      if (files.hasOwnProperty(file)) {
        if (!answers.router && file.includes('router')) {
          delete files[file]
        }
        if (!answers.router  && file.includes('views')) {
          delete files[file]
        }
        if (!answers.vuex && file.includes('store')) {
          delete files[file]
        }
      }
    }
    done()
  }
}

function renderTemplate(answers) {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    async.each(keys, (file, next) => {
      const str = files[file].contents.toString()
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, answers, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = new Buffer(res)
        next()
      })
    }, done)
  }
}

module.exports = (name, answers) => {
  const metalsmith = Metalsmith(path.resolve(__dirname, '../template'))

  metalsmith
    .use(filter(answers))
    .use(renderTemplate(answers))
    .source('.')
    .destination(path.resolve(name))
    .build((err, files) => {
      if (err) {
        console.log(chalk.red(err))
      }
    })
}