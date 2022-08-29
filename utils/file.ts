import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

function saveToFile(filePath: string, data: any, isJson: boolean) {
  const filePathParts = filePath.split('/');
  filePathParts.pop();
  if (filePathParts.length > 0) {
    mkdirSync(filePathParts.join('/'), {
      recursive: true,
    });
  }

  if (isJson) {
    return writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
  return writeFileSync(filePath, data);
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
