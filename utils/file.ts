import { existsSync, readFileSync, writeFileSync } from 'fs';

function saveToFile(fileName: string, data: any, isJson: boolean) {
  if (isJson) {
    return writeFileSync(fileName, JSON.stringify(data, null, 2));
  }
  return writeFileSync(fileName, data, null, 2);
}

function loadFromFile(fileName: string, isJson: boolean) {
  if (!existsSync(fileName)) {
    return null;
  }
  if (isJson) {
    return JSON.parse(readFileSync(fileName).toString('utf-8'));
  }
  return readFileSync(fileName).toString('utf-8');
}

export { saveToFile, loadFromFile };
