import inquirer from 'inquirer';
import path from 'node:path';
import { choiceTypeQuestion, typeEnum } from './constants/choiceTypeQuestion.mjs';
import { downloadGiteeQuestion } from './constants/downloadGiteeQuestion.mjs';

function downloadConfig(program) {
  program.command("config").description("download eslint, prettier, react configuration file").action(async ({ directory }) => {
    path.resolve(directory || process.cwd());
    const { type } = await inquirer.prompt(choiceTypeQuestion);
    if (type === typeEnum.Gitee) {
      const { owner, repoName, branch, targetDir } = await inquirer.prompt(downloadGiteeQuestion);
      console.log("owner, repoName, branch, targetDir : ", owner, repoName, branch, targetDir);
    }
  });
}

export { downloadConfig };
