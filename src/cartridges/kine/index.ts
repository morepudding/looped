import type { Cartridge } from '../../types';
import { kineProfile, kineCastingPrompt } from './profile';
import { kineApps, kineStartNotification } from './apps';
import { kineSteps } from './steps';

export const kineCartridge: Cartridge = {
  profile: kineProfile,
  scenario: {
    id: 'kine_intro',
    title: 'La Kiné',
    startStepId: '0',
    steps: kineSteps,
  },
  castingPrompt: kineCastingPrompt,
  startNotification: kineStartNotification,
  personalRating: 2,
  heatRating: 4,
  apps: kineApps,
};
