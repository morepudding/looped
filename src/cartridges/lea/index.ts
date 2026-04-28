import type { Cartridge } from '../../types';
import { leaProfile, leaCastingPrompt } from './profile';
import { leaApps, leaStartNotification } from './apps';
import { leaSteps } from './steps';

export const leaCartridge: Cartridge = {
  profile: leaProfile,
  scenario: {
    id: 'neighbor_intro',
    title: 'La Voisine',
    startStepId: '0',
    steps: leaSteps,
  },
  castingPrompt: leaCastingPrompt,
  startNotification: leaStartNotification,
  personalRating: 3,
  heatRating: 1,
  apps: leaApps,
};
