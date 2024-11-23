import { execSync } from 'child_process';
import fs, { cpSync } from 'fs';
import path from 'path';

/**
 * @typedef {{
 *   main: string,
 *   types: string,
 *   private?: string | boolean,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 * }} PackageJson
 */

const outDirName = 'dist';
const ROOT_PROJECT = process.cwd();

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  buildWithVite();

  copyStaticFiles();

  manipulatePackageJsonFile();

  console.log('DONE !!!');
}

function cleanDistDirectory() {
  console.log('- Step 1: clear the dist directory');
  execSync('rm -rf dist');
}

function buildWithVite() {
  console.log('- Step 2: build with vite');
  execSync('tsc -p ./tsconfig.package.json && vite build --config vite.config.package.ts');
}

function copyStaticFiles() {
  console.log('[32m- Step 3:[39m copy static files');

  const filesToCopyArr = [
    { filename: 'package.json', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmrc', sourceDirPath: [], destinationDirPath: [], isAllowedToFail: true },
    { filename: 'README.md', sourceDirPath: [], destinationDirPath: [] },
  ];

  filesToCopyArr.forEach(({ filename, sourceDirPath, destinationDirPath, isAllowedToFail }) => {
    try {
      const sourceFileFullPath = path.resolve(ROOT_PROJECT, ...sourceDirPath, filename);
      const destinationFileFullPath = path.resolve(ROOT_PROJECT, outDirName, ...destinationDirPath, filename);

      cpSync(sourceFileFullPath, destinationFileFullPath);
      console.log(`    • ${filename}`);
    } catch (error) {
      console.error(error);
      if (isAllowedToFail) return;

      throw new Error('File MUST exists in order to PASS build process! cp operation failed...');
    }
  });
}

function manipulatePackageJsonFile() {
  console.log('[32m- Step 5:[39m copy & manipulate the package.json file');

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDirName, 'package.json');

  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  // Step 2: Remove all scripts
  delete packageJson.scripts;
  console.log('  • [34mdeleted[39m `scripts` key');

  // Step 3: Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';
  console.log('  • [34mchanged[39m from private to public');
  console.log('  • [34mchanged[39m publishConfig access to public');

  // Step 4: remove 'outDirName/' from "main" & "types"
  packageJson.main = packageJson.main.replace(`${outDirName}/`, '');
  packageJson.types = packageJson.types.replace(`${outDirName}/`, '');

  // Step 5: create new package.json file in the output folder
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
  console.log('  • [34mpackage.json[39m file written successfully!');
}
