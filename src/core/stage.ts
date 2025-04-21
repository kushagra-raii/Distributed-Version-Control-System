import { promises as fs } from 'fs';

export class Stage {
  constructor(private stagePath: string) {}

  async addToStage(filePath: string, fileHash: string): Promise<void> {
    const stageData = JSON.parse(await fs.readFile(this.stagePath, 'utf-8'));
    stageData.push({ path: filePath, hash: fileHash });
    await fs.writeFile(this.stagePath, JSON.stringify(stageData));
    console.log(`Added ${filePath} to stagging area.`);
  }
}

