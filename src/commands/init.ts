import { VCS } from '../core/vcs';

export const initCommand = async (): Promise<void> => {
  const vcs = new VCS();
  await vcs.init();
};

