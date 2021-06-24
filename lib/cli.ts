#!/usr/bin/env node
import { parseArgs } from './util';
import { dotenvTsGenerate } from './dotenv-ts-generate';
import { resolve } from 'path';

export async function main() {
  const startAt = Date.now();
  const options = parseArgs();
  const content = await dotenvTsGenerate(options);
  if (options.output) {
    console.log(`generate ${resolve(process.cwd(), options.output)} completed in ${Date.now() - startAt}ms`);
  } else {
    console.log(content);
  }
}

main();