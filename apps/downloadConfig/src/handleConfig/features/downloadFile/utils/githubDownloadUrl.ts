export type repoProps = {
  owner: string;
  repoName: string;
  branch: string;
};

export type singeFileProps = repoProps & {
  filename: string;
};

export function getGithubRepoUrl(repo: repoProps) {
  return 'https://github.com/' + repo.owner + '/' + repo.repoName + '/archive/refs/heads/' + repo.branch + '.zip';
}

export function getGithubSingleFileUrl(singeFile: singeFileProps) {
  return (
    'https://raw.githubusercontent.com/' +
    singeFile.owner +
    '/' +
    singeFile.repoName +
    '/refs/heads/' +
    singeFile.branch +
    '/' +
    singeFile.filename
  );
}
