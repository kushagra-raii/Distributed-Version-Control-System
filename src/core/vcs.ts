import { Repository } from './repository';
import { Commit } from './commit';
import { Stage } from './stage';
import { hashFileContent } from '../utils/cryptoUtils';
import { readFileContent } from '../utils/fileUtils';

export class VCS {
  private repo: Repository;
  private commitManager: Commit;
  private stageManager: Stage;

  constructor(repoPath: string = '.') {
    this.repo = new Repository(repoPath);
    const { objectsPath, headPath, indexPath } = this.repo.getPaths();
    this.commitManager = new Commit(objectsPath, headPath, indexPath);
    this.stageManager = new Stage(indexPath);
  }

  async init(): Promise<void> {
    await this.repo.init();
  }

  async add(filePath: string): Promise<void> {
    const fileContent = await readFileContent(filePath);
    const fileHash = hashFileContent(fileContent);
    await this.stageManager.addToStage(filePath, fileHash);
  }

  async commit(message: string): Promise<void> {
    await this.commitManager.createCommit(message);
  }
}

