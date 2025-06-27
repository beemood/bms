const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { projectRootDir } = require('@nx/workspace');
const { workspaceRoot } = require('nx/src/devkit-exports');
const { join } = require('path');

module.exports = {
  output: {
    path: join(workspaceRoot, 'dist', 'apis/auth'),
  },

  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
