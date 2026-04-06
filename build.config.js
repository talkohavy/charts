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

const ROOT_PROJECT = process.cwd();
const outDirName = 'dist';
const COLORS = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  stop: '\x1b[39m',
};

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  buildWithVite();

  copyStaticFiles();

  manipulatePackageJsonFile();

  console.log('DONE !!!');
}

function cleanDistDirectory() {
  console.log(`${COLORS.green}- Step 1: clear the ${outDirName} directory`);
  execSync(`rm -rf ${outDirName}`);
}

function buildWithVite() {
  console.log(`${COLORS.green}- Step 2: build with vite`);
  execSync('tsc -p ./tsconfig.package.json && vite build --config vite.config.package.ts');
}

function copyStaticFiles() {
  console.log(`${COLORS.green}- Step 3: copy static files`);

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
  console.log(`${COLORS.green}- Step 5: copy & manipulate the package.json file`);

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDirName, 'package.json');

  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  // Step 2: Remove all scripts
  delete packageJson.scripts;
  console.log(`  • ${COLORS.blue}deleted${COLORS.stop} \`scripts\` key`);

  // Step 3: Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';
  console.log(`  • ${COLORS.blue}changed${COLORS.stop} from private to public`);
  console.log(`  • ${COLORS.blue}changed${COLORS.stop} publishConfig access to public`);

  // Step 4: remove 'outDirName/' from "main" & "types"
  packageJson.main = packageJson.main.replace(`${outDirName}/`, '');
  packageJson.types = packageJson.types.replace(`${outDirName}/`, '');

  // Step 5: create new package.json file in the output folder
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
  console.log(`  • ${COLORS.blue}package.json${COLORS.stop} file written successfully!`);
}
