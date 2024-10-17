import { print } from '@/utils';
import compressing from 'compressing';
import ora from 'ora';
import { download } from '../download';
import { downloadStart, downloadSuccess } from './constants';
import { getGiteeSingleFileUrl } from './utils/giteeDownloadUrl';
import { getGithubRepoUrl, getGithubSingleFileUrl } from './utils/githubDownloadUrl';
// types
import type { repoProps, singeFileProps } from './utils/githubDownloadUrl';

type downloadSingleFileFromGithubProps = singeFileProps & {
  targetDir?: string;
};

type downloadRepoFromGithubProps = repoProps & {
  targetDir?: string;
  isUncompressZip?: boolean;
};

/**
 * download repo from github
 */
export function downloadRepoFromGithub({
  owner,
  repoName,
  branch,
  targetDir = './',
  isUncompressZip,
}: downloadRepoFromGithubProps): Promise<any> {
  const url = getGithubRepoUrl({ owner, repoName, branch });
  const spinner = ora(print.info(downloadStart, true)).start();

  return download(url, targetDir)
    .then((fileName) => {
      spinner.succeed(print.success(downloadSuccess, true));
      if (isUncompressZip) return compressing.zip.uncompress(fileName, targetDir);
    })
    .catch((err: Error) => {
      spinner.fail(print.error(err.message, true));
      spinner.fail(print.error(err.stack, true));
    });
}

/**
 * download single file from github
 */
export function downloadSingleFileFromGithub({
  owner,
  repoName,
  branch,
  filename,
  targetDir = './',
}: downloadSingleFileFromGithubProps): Promise<any> {
  const url = getGithubSingleFileUrl({ owner, repoName, branch, filename });
  const spinner = ora(print.info(downloadStart, true)).start();

  return download(url, targetDir)
    .then(() => {
      spinner.succeed(print.success(downloadSuccess, true));
    })
    .catch((err: Error) => {
      spinner.fail(print.error(err.message, true));
      spinner.fail(print.error(err.stack, true));
    });
}

/**
 * download single file from gitee
 */
export function downloadSingleFileFromGitee({
  owner,
  repoName,
  branch,
  filename,
  targetDir = './',
}: downloadSingleFileFromGithubProps): Promise<any> {
  const url = getGiteeSingleFileUrl({ owner, repoName, branch, filename });
  const spinner = ora(print.info(downloadStart, true)).start();

  return download(url, targetDir)
    .then(() => {
      spinner.succeed(print.success(downloadSuccess, true));
    })
    .catch((err: Error) => {
      spinner.fail(print.error(err.message, true));
      spinner.fail(print.error(err.stack, true));
    });
}
