const downloadGiteeQuestion = [
  {
    type: "input",
    // interaction type
    name: "owner",
    // the key value you entered
    message: 'please enter creator of repo(example: "mengxiang1")',
    // tips
    default: "mengxiang1"
  },
  {
    type: "input",
    name: "repoName",
    message: 'please enter repository name(example: "mx-design")',
    default: "mx-design"
  },
  {
    type: "input",
    name: "branch",
    message: 'please enter branch name(example: "main")',
    default: "main"
  },
  {
    type: "input",
    name: "targetDir",
    message: 'please enter output directory name(example: "./")',
    default: "./"
  }
];

export { downloadGiteeQuestion };
