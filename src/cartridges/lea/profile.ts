import type { Profile } from '../../types';

const LEA_PROFILE_URL = "https://image.pollinations.ai/prompt/Young%20French%20woman%20messy%20ginger%20hair%20green%20eyes%20freckles%20cute%20face%20realistic?width=400&height=400&nologo=true&seed=42";

export const leaProfile: Profile = {
  id: 'neighbor',
  name: 'Léa',
  age: 24,
  description: 'Ta nouvelle voisine du 3ème. Un peu maladroite mais très sympa.',
  image: LEA_PROFILE_URL,
  scenarioId: 'neighbor_intro',
  hints: ['L\'absurde est sa zone de confort', 'Le prix des choses est relatif', 'Déteste la banalité'],
  masterSeed: 789
};

export const leaCastingPrompt = "Young French woman, messy ginger hair, green eyes, freckles, cute face, realistic photography, close-up portrait, natural light";
