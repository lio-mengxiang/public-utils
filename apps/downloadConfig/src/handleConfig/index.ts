import type { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'node:path';
import { choiceTypeQuestion, downloadGiteeQuestion, typeEnum } from './constants';

export function downloadConfig(program: Command) {
  program
    .command('config')
    .description('download eslint, prettier, react configuration file')
    .action(async ({ directory }: { directory: string }) => {
      const absoluteConfigPath = path.resolve(directory || process.cwd());

      const { type } = await inquirer.prompt<{ type: `${typeEnum}` extends `${infer T extends number}` ? T : never }>(choiceTypeQuestion);
      if (type === typeEnum.Gitee) {
        const { owner, repoName, branch, filename, targetDir } = await inquirer.prompt<{
          owner: string;
          repoName: string;
          branch: string;
          filename: string;
          targetDir: string;
        }>(downloadGiteeQuestion);
      }
    });
}
