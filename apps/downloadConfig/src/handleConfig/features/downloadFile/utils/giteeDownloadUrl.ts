export type repoProps = {
  owner: string;
  repoName: string;
  branch: string;
};

export type singeFileProps = repoProps & {
  filename: string;
};

export function getGiteeSingleFileUrl(singeFile: singeFileProps) {
  return 'https://gitee.com/' + singeFile.owner + '/' + singeFile.repoName + '/raw/' + singeFile.branch + '/' + singeFile.filename;
}
