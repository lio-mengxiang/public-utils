import { program } from 'commander';
import { bin, version } from '../package.json.mjs';
import { downloadConfig } from './handleConfig/index.mjs';

const commandName = Object.keys(bin)?.[0];
program.name(commandName).version(version, "-v, --version");
downloadConfig(program);
program.parse(process.argv);
if (!program.args[0]) {
  program.help();
}
