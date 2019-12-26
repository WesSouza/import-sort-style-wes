import { resolve } from 'path';

import importSort, { applyChanges } from 'import-sort';
import sortStyle from '../src/index';
import { readdirSync, readFileSync } from 'fs';

const InputFile = /\.input\.js$/i;

const samplesPath = resolve(__dirname, './samples');
const samplesFileNames = readdirSync(samplesPath);

for (const inputFileName of samplesFileNames) {
  if (!InputFile.test(inputFileName)) {
    continue;
  }

  const testName = inputFileName.replace(InputFile, '');
  const outputFileName = `${testName}.output.js`;

  const inputFilePath = resolve(samplesPath, inputFileName);
  const outputFilePath = resolve(samplesPath, outputFileName);

  const inputFileContents = readFileSync(inputFilePath, 'utf-8');
  const outputFileContents = readFileSync(outputFilePath, 'utf-8');

  it(`sorts ${testName} correctly`, () => {
    const { changes } = importSort(
      inputFileContents,
      'import-sort-parser-babylon',
      sortStyle
    );

    const outputCode = applyChanges(inputFileContents, changes);
    expect(outputCode).toEqual(outputFileContents);
  });
}
