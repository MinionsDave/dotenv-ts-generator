# dotenv-ts-generator

A generator that create `typescript` code from `dotenv` config file.

## Installation

```shell
$ npm i dotenv-ts-generator # or yarn add dotenv-ts-generator

# use as command line
$ npm i -g dotenv-ts-generator # or yarn global add dpdm
$ dots
```

## Usage in line

```bash
dots [options]

Options:
  --input              env file path, default is .env or .env.example
  --output             output ts file path
  --nameCase           ts variable name style, if ignored, env name will be use
  --tplPath            custom handlebar tpl path
```

### Example

```console
$ cat .env
IS_PRODUCTION=true

# log ouput dir
LOG_DIR=/data/logs

HTTP_PORT=80

$ dots --nameCase UpperCamelCase

const env = process.env;

export const IsProduction = env.IsProduction === 'true';

/** log ouput dir */
export const LogDir = env.LogDir;
export const HttpPort = parseFloat(env.HttpPort);
```
