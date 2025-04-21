import { promises as fs } from 'fs';
import path from 'path';
import { initializeFiles } from '../utils/fileUtils';

export class Repository {
  private repoPath: string;
  private objectsPath: string;
  private headPath: string;
  private indexPath: string;

  constructor(repoPath = '.') {
    this.repoPath = path.join(repoPath, '.dvcs');
    this.objectsPath = path.join(this.repoPath, 'objects');
    this.headPath = path.join(this.repoPath, 'HEAD');
    this.indexPath = path.join(this.repoPath, 'index');
  }

  async init(): Promise<void> {
    await initializeFiles(this.objectsPath, this.headPath, this.indexPath);
    console.log("Initialized .dvcs repository.");
  }

  getPaths() {
    return { objectsPath: this.objectsPath, headPath: this.headPath, indexPath: this.indexPath };
  }
}

