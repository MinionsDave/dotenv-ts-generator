export class Env {
  envName: string;
  name: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
  comment?: string;
}