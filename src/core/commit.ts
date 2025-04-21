import { promises as fs } from 'fs';
import { hashFileContent } from '../utils/cryptoUtils';

export class Commit {
  constructor(private objectsPath: string, private headPath: string, private indexPath: string) {}

  async createCommit(message: string): Promise<string> {
    const indexData = await fs.readFile(this.indexPath, 'utf-8');
    const files = JSON.parse(indexData);
    const parentCommit = await this.getCurrentHead();

    const commitData = {
      timeStamp: new Date().toISOString(),
      message,
      files,
      parent: parentCommit,
    };

    const commitHash = hashFileContent(JSON.stringify(commitData));
    const commitPath = `${this.objectsPath}/${commitHash}`;

    await fs.writeFile(commitPath, JSON.stringify(commitData));
    await fs.writeFile(this.headPath, commitHash);
    await fs.writeFile(this.indexPath, JSON.stringify([]));

    console.log(`Commit successfully created: ${commitHash}`);
    return commitHash;
  }

  private async getCurrentHead(): Promise<string | null> {
    try {
      return await fs.readFile(this.headPath, 'utf-8');
    } catch {
      return null;
    }
  }
}

