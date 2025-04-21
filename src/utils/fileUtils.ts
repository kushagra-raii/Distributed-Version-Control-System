import { promises as fs } from 'fs';

export const readFileContent = async (filePath: string): Promise<string> => {
  try {
    const stats = await fs.lstat(filePath);
    if (stats.isDirectory()) {
      throw new Error(`The path "${filePath}" is a directory, not a file.`);
    }
    return await fs.readFile(filePath, 'utf-8');
  } catch (err: any) {
    console.error(`Error reading file at ${filePath}:`, err.message);
    throw err;
  }
};

export const initializeFiles = async (
  objectsPath: string, 
  headPath: string, 
  indexPath: string
): Promise<void> => {
  try {
    await fs.mkdir(objectsPath, { recursive: true });

    await fs.writeFile(headPath, '', { flag: 'wx' });
    await fs.writeFile(indexPath, JSON.stringify([]), { flag: 'wx' });

    console.log("Repository initialized successfully.");
  } catch (err: any) {
    if (err.code === 'EEXIST') {
      console.log("Repository already initialized.");
    } else {
      console.error("Error during initialization:", err.message);
    }
  }
};
