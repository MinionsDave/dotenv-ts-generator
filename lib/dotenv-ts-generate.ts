import { resolve } from 'path';
import { getEnvFilePath } from './util';
import { compile, registerHelper } from 'handlebars';
import { dotenvResolve } from './dotenv-resolve';
import { readFile, writeFile } from 'fs/promises';
import { DotenvTsGenerateOptions } from './dotenv-ts-generate-options';
import { Env } from './env';

registerHelper('switch', function(value, options) {
  this.switch_value = value;
  return options.fn(this);
});

registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
});

/** create ts code from .env file */
export async function dotenvTsGenerate(options: DotenvTsGenerateOptions): Promise<string> {
  const inputFilePath = getEnvFilePath(options.input);
  const envFileContent = await readFile(inputFilePath, {
    encoding: 'utf8'
  });
  const envs = dotenvResolve(envFileContent, options.nameCase);
  const tplPath = options.tplPath
    ? resolve(process.cwd(), '../templates/env.handlebars')
    : resolve(__dirname, '../templates/env.handlebars');
  const content = await compileTs(tplPath, envs);
  if (options.output) {
    await writeFile(options.output, content, 'utf8');
  }
  return content;
}

async function compileTs(tplPath: string, envs: Env[]): Promise<string> {
  const tplContent = await readFile(tplPath, 'utf8');
  const tpl = compile(tplContent);
  return tpl({ envs });
}