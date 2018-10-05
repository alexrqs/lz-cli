# lz-cli

scaffold for the masses

[![circleci badge](https://img.shields.io/circleci/project/github/alecsgone/lz-cli/master.svg)](https://circleci.com/gh/alecsgone/workflows/lz-cli)

## Usage
- [Install](#install)
- [Create your template](#create-your-template)
- Use case: [Bootstrap a project from github](#bootstrap-a-project-from-github)
- Use case: [Scaffold a files from local source](#scaffold-a-files-from-local-source)

## Install
Local and global installs will work, local will be useful if you want to combine it with NPM scripts, global to be used everywhere to start projects from scratch

- Globally
```sh
$ npm i -g lz-cli # this will make the `lz` command available
```

- Locally:
```
$ npm i lz-cli -D
```
and modify your package.json to use it

```json
"scripts": {
 "new:foo": "lz generate foo"
}
```

## Create your template
- Inside a `template` folder, create the folder structure and files that you wish to replicate
- Use `<%= variableName %>` inside your files to replace the value later when the bootstrap is happening
- create a `lz.config.js` sibling to the `template/` folder on the root path of the project, the file should include a `prompt` key to stablish the variables same as you will with [`inquirer`](https://github.com/SBoudrias/Inquirer.js#readme)
```js
module.exports = {
  prompt: [
    {
      type: 'input',
      name: 'variableName',
      message: 'variable Name?',
      default: 'user',
    },
  ],
}
```
- example: https://github.com/alecsgone/lz-express/blob/master/lz.config.js


## Bootstrap a project from github
Probably you want the global install or simply run it with `npx lz-cli`
after you have your template ready use the `gh` command with your `user` and `repo` to copy the structure from github on an empty folder

```
lz gh user/repo
```

## Scaffold a files from local source
TBD

### Create your config file

create a file named `lz.config.js` in the project root directory

```js
module.exports: {
  foo: {
    template: 'foo/bar',
    prompt: { ... },
    inserts: [ {}, ...],
  },
}
```

### Run it

```
$ npm run new:foo
```

## CLI

```console
$ lz --help

  Usage: lz [options] [command]

  Options:

    -v, --version       output the version number
    -h, --help          output usage information

  Commands:

    github <user/repo>  Generate scaffold from github user/repo
    gh <user/repo>      (alias) like github but shorter
    folder <path>       Generate scaffold from folder path
    f <path>            (alias) like folder but shorter
    generate <key>      Generate scaffold from config file key
    g <key>             (alias) like config but shorter
```

## Configuration

```js
module.exports = {
  scaffold: {
    template: 'scaffold',
    prompt: [
      {
        type: 'input',
        name: 'name',
        message: 'Scaffold Name?',
        default: 'user',
      },
    ],
    inserts: [
      {
        path: 'routes/index.js',
        pattern: 'register:new:routes',
        echo: "router.use('/', <%= name %>Routes)",
      },
      {
        path: 'routes/index.js',
        pattern: 'import:new:routes',
        echo: "const <%= name %>Routes = require('./<%= name %>')",
      },
    ],
  },
}
```

### Scaffold

lz allows you 3 different types of scaffold

### github

`lz github user/repo` will grab the repo and replicate the structure from the template folder and will use the config from the root.

### folder

`lz folder ../foo/bar` replicates the folder structure replacing variables

# Examples

- Simple webpack app https://github.com/alecsgone/scaffold-web (it will probably grow to include babel/sass/html)
- ExpressJS https://github.com/alecsgone/lz-express using this as
  ```sh
  lz gh alecsgone/lz-express
  ```
  Will not only give you the bare-bones for an express app but it also contains template creator to scaffold controllers, routes and models once the app is created
