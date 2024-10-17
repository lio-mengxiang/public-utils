import json from '@rollup/plugin-json';
import { dirname, resolve as nodeResolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import alias from 'rollup-plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';

const __dirname = dirname(fileURLToPath(import.meta.url));

const esmConfig = defineConfig({
  input: './src/index.ts',
  treeshake: true,
  plugins: [
    externals({
      peerDeps: false,
    }),
    alias({
      entries: [{ find: '@', replacement: nodeResolve(__dirname, './src') }],
      resolve: ['.ts', '/index.ts'],
    }),
    esbuild({
      include: /\.[jt]sx?$/,
      target: 'esnext',
      minify: false,
      // jsx: 'transform',
      // jsxFactory: 'React.createElement',
      // jsxFragment: 'React.Fragment',
      tsconfig: nodeResolve(__dirname, './tsconfig.build.json'),
    }),
    json(),
  ],
  output: {
    dir: 'esm/',
    format: 'esm',
    entryFileNames: '[name].mjs',
    preserveModules: true,
  },
});

export default esmConfig;
