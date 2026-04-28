import type { Step } from '../../../types';
import { acte1ChatSteps } from './acte1-chat';
import { acte1SeanceSteps } from './acte1-seance';
import { entreDeuxSteps } from './entre-deux';
import { acte2SeanceSteps } from './acte2-seance';
import { finaleSteps } from './finale';

export const kineSteps: Record<string, Step> = {
  ...acte1ChatSteps,
  ...acte1SeanceSteps,
  ...entreDeuxSteps,
  ...acte2SeanceSteps,
  ...finaleSteps,
};
