export class DotenvTsGenerateOptions {
  /**
   * env file path
   *
   * default is .env or .env.example
   */
  input?: string;

  /** output ts file path */
  output?: string;

  /**
   * ts variable name style
   *
   * if ignored, env name will be use
   *
   * @example
   *
   * // .env
   * HTTP_PORT=80
   *
   * export const HTTP_PORT = 80; // if ignored
   * export const httpPort = 80; // lowerCamelCase
   * export const HttpPort = 80; // UpperCamelCase
   * export const HTTP_PORT = 80; // SNAKE_CASE
   */
  nameCase?: 'lowerCamelCase' | 'UpperCamelCase' | 'SNAKE_CASE';

  /** custom handlebar tpl path */
  tplPath?: string;
}