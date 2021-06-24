import { DotenvTsGenerateOptions } from './dotenv-ts-generate-options';
import { Env } from './env';
import { caseConvert, resolveDotenvComment, getStringType } from './util';

/**
 * resolve env file content to Env[]
 *
 * @param nameCase ts variable name style
 */
export function dotenvResolve(envFileContent: string, nameCase?: DotenvTsGenerateOptions['nameCase']): Env[] {
  // split to lines
  const lines = envFileContent.split(/\r?\n/).filter(Boolean);
  const envs: Env[] = [];

  lines.forEach((line, i) => {
    // ignore comment
    if (line.startsWith('#')) {
      return;
    }
    if (!line.includes('=')) {
      return;
    }
    const [name, value] = line.split('=').map(value => value.trim());
    envs.push({
      envName: name,
      value,
      name: caseConvert(name, nameCase),
      type: getStringType(value),
      comment: resolveDotenvComment(lines[i - 1]),
    });
  });

  return envs;
}