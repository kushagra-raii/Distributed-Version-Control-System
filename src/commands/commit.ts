import { VCS } from '../core/vcs';

export const commitCommand = async (message: string): Promise<void> => {
  const vcs = new VCS();
  await vcs.commit(message);
};

