#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
const handlebars = require('handlebars');
const symbols = require('log-symbols');
const download = require('download-git-repo');

const packageJson = require('./package.json');
const version = packageJson.version;

program.version(version, '-v, --version');

program.command('init <name>').action((name) => {
  if (!fs.existsSync(name)) {
    inquirer
      .prompt([
        {
          name: 'description',
          message: '请输入项目描述',
        },
        {
          name: 'author',
          message: '请输入作者名称',
        },
      ])
      .then((answers) => {
        const spinner = ora('正在下载模板...');
        spinner.start();

        download(
          'github:noiron/simple-template#master',
          name,
          { clone: false },
          (err) => {
            if (err) {
              spinner.fail();
              console.log(symbols.error, chalk.red(err));
            } else {
              spinner.succeed();

              const meta = {
                name: path.basename(name),
                description: answers.description,
                author: answers.author,
              };

              const filename = `${name}/package.json`;

              // 修改 package.json 中的内容
              if (fs.existsSync(filename)) {
                const content = fs.readFileSync(filename).toString();
                const result = handlebars.compile(content)(meta);
                fs.writeFileSync(filename, result);
              }

              console.log(symbols.success, chalk.green('项目初始化完成'));
            }
          }
        );
      });
  } else {
    console.log(symbols.error, chalk.red('项目已存在'));
  }
});

program.parse(process.argv);
