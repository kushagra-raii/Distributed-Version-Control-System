import { VCS } from '../core/vcs';

export const addCommand = async (filePath: string): Promise<void> => {
  const vcs = new VCS();
  await vcs.add(filePath);
};

