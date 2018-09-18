# lz-cli
scaffold for the masses

## Usage
local and global install will work, local will be useful if you want to combine it with NPM scripts, global to be used everywhere
To install globally
```sh
$ npm i -g lz-cli
```
this will make the `lz` command available
to install locally:
```
$ npm i lz-cli -D
```
and modify your package.json to use it
```json
"scripts": {
 "new:foo": "lz generate foo"
}
```
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
        default: 'user'
      },
    ],
    inserts: [
      {
        path: 'routes/index.js',
        pattern: 'register:new:routes',
        echo: 'router.use(\'/\', <%= name %>Routes)'
      },
      {
        path: 'routes/index.js',
        pattern: 'import:new:routes',
        echo: 'const <%= name %>Routes = require(\'./<%= name %>\')'
      },
    ]
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

* Simple webpack app https://github.com/alecsgone/scaffold-web (it will probably grow to include babel/sass/html)
* ExpressJS https://github.com/alecsgone/lz-express using this as
    ```sh
    lz gh alecsgone/lz-express
    ```
    Will not only give you the bare-bones for an express app but it also contains template creator to scaffold controllers, routes and models once the app is created
