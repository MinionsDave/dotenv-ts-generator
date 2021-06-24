export class Env {
  envName: string;

  /** env name after case transform */
  name: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
  comment?: string;
}