import type { Step } from '../../../types';
import { introSteps } from './intro';
import { defisChatSteps } from './defis-chat';
import { defisAppsSteps } from './defis-apps';
import { finaleSteps } from './finale';

export const leaSteps: Record<string, Step> = {
  ...introSteps,
  ...defisChatSteps,
  ...defisAppsSteps,
  ...finaleSteps,
};
