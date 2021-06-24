# dotenv-ts-generator

A generator that create `typescript` code from `dotenv` config file.

## Installation

```shell
$ npm i dotenv-ts-generator # or yarn add dotenv-ts-generator

# use as command line
$ npm i -g dotenv-ts-generator # or yarn global add dotenv-ts-generator
$ dots
```

## Usage in line

```bash
dots [options]

Options:
  --input              env file path, default is .env or .env.example
  --output             output ts file path
  --nameCase           ts variable name style, if ignored, env name will be use. avaliable options: lowerCamelCase、 UpperCamelCase、 SNAKE_CASE
  --tplPath            custom handlebar tpl path
```

## Example

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

## Usage in module

```typescript
import { dotenvResolve } from 'dotenv-ts-generator';
import { readFile } from 'fs/promises';

const envFileContent = await readFile(resolve(__dirname, '../.env'), 'utf8');
const envs = dotenvResolve(envFileContent, 'SNAKE_CASE'); // Env[]
```

```typescript
import { dotenvTsGenerate } from 'dotenv-ts-generator';

dotenvTsGenerate({
  /* options, same as line options */
}); // ts file content
```

## API

1. `dotenvResolve(envFileContent: string, nameCase?: 'lowerCamelCase' | 'UpperCamelCase' | 'SNAKE_CASE'): Env[]`: resolve env file content to Env[]

   ```typescript
   export class Env {
     envName: string;
     /** env name after case transform */
     name: string;
     value: string;
     type: 'string' | 'number' | 'boolean';
     comment?: string;
   }
   ```

2. `dotenvTsGenerate(options: DotenvTsGenerateOptions): Promise<string>`: transform .env file to ts code, options same as line options
