export enum typeEnum {
  Gitee = 0,
  GitHub = 1,
}

export const choiceTypeQuestion: any[] = [
  {
    type: 'list', // interaction type
    name: 'type', // the key value you entered
    message: 'please choice download type', // tips
    default: typeEnum.Gitee,
    choices: [
      {
        value: typeEnum.Gitee,
        name: 'download files from gitee',
      },
      {
        value: typeEnum.GitHub,
        name: 'download files from github',
      },
    ],
  },
];
