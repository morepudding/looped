import type { Profile } from '../../types';

const KINE_PROFILE_URL = "https://image.pollinations.ai/prompt/Tall%20athletic%20French%20woman%2029%20years%20old%20short%20dark%20hair%20strong%20jaw%20confident%20look%20minimal%20makeup%20white%20medical%20coat%20realistic%20photography%20portrait?width=400&height=400&nologo=true&seed=314";

export const kineProfile: Profile = {
  id: 'kine',
  name: 'Camille',
  age: 29,
  description: 'Kinésithérapeute. Directe, cash, et très douée avec ses mains.',
  image: KINE_PROFILE_URL,
  scenarioId: 'kine_intro',
  hints: ['Le silence est une arme', 'Le corps ne ment jamais', 'Elle mène. Toujours.'],
  masterSeed: 314
};

export const kineCastingPrompt = "Tall athletic French woman, 29 years old, short dark hair, strong jaw, confident intense look, minimal makeup, wearing white medical coat over black top, professional clinic background, realistic photography, close-up portrait, natural light";
