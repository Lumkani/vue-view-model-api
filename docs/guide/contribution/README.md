# Contribution

Here you will find everything you need to setup the project locally if you are thinking about contributing this project

## Getting started

####  1. First clone the repo

```shell
git clone git@github.com:Lumkani/vue-view-model-api.git
```

#### 2. Install the dependencies

Node.js version `>=8` is required, and also the project makes use of [PNPM](https://pnpm.js.org/) for managing packages. Make sure you have these installed

> The project uses a `.nvmrc` file to maintain a consistent Node.js version but most likely this won't affect you

```shell
pnpm install # or pnpm i
```
This will install the project dependencies

#### 3. List of commands

The project makes use of a `dev.sh` shell script where you can find all the necessary commands to run the project, you will need to source the file to make use of the commands

```shell
source dev.sh # or . dev.sh
```

All commands are also available via the `package.json` *scripts* in case shell scripts do not work in your environment