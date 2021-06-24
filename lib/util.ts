import * as jsConvertCase from 'js-convert-case';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { DotenvTsGenerateOptions } from './dotenv-ts-generate-options';
import { Env } from './env';

export function getEnvFilePath(input?: string): string {
  const path = [input, '.env.example', '.env']
    .filter(Boolean)
    .map(filename => resolve(process.cwd(), filename))
    .find(o => existsSync(o));
  if (!path) {
    throw new Error(`no env file find`);
  }
  return path;
}

/** get options from process.argv */
export function parseArgs(): DotenvTsGenerateOptions {
  const args = process.argv.slice(2);
  const options: DotenvTsGenerateOptions = {};

  const inputIndex = args.indexOf('--input') + 1;
  if (inputIndex) {
    options.input = args[inputIndex];
  }

  const outputIndex = args.indexOf('--output') + 1;
  if (outputIndex) {
    options.output = args[outputIndex];
  }

  const nameCaseIndex = args.indexOf('--nameCase') + 1;
  if (nameCaseIndex) {
    options.nameCase = args[nameCaseIndex] as DotenvTsGenerateOptions['nameCase'];
  }

  return options;
}

export function getStringType(value: string): Env['type'] {
  if (value === 'true' || value === 'false') {
    return 'boolean';
  }
  const num = parseFloat(value);
  return !isNaN(num) && typeof num === 'number'
    ? 'number'
    : 'string';
}

export function resolveDotenvComment(line?: string): string {
  if (!line || !line.startsWith('#')) {
    return '';
  }
  return line.slice(1).trim();
}

export function caseConvert(str: string, _case?: DotenvTsGenerateOptions['nameCase']) {
  if (!_case) {
    return str;
  }
  switch (_case) {
    case 'SNAKE_CASE':
      return jsConvertCase.toSnakeCase(str).toUpperCase();
    case 'UpperCamelCase':
      return jsConvertCase.toPascalCase(str);
    case 'lowerCamelCase':
      return jsConvertCase.toCamelCase(str);
    default:
      return str;
  }
}