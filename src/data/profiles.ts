import type { Profile } from '../types';

// Prompt simplifié pour éviter les erreurs d'URL trop longue
const LEA_BASE = "Young French woman, messy ginger hair, green eyes, freckles, cute face, realistic";
const LEA_PROFILE_URL = "https://image.pollinations.ai/prompt/Young%20French%20woman%20messy%20ginger%20hair%20green%20eyes%20freckles%20cute%20face%20realistic?width=400&height=400&nologo=true&seed=42";

export const PROFILES: Profile[] = [
  {
    id: 'neighbor',
    name: 'Léa',
    age: 24,
    description: 'Ta nouvelle voisine du 3ème. Un peu maladroite mais très sympa.',
    image: LEA_PROFILE_URL,
    scenarioId: 'neighbor_intro',
    hints: ['L\'absurde est sa zone de confort', 'Le prix des choses est relatif', 'Déteste la banalité'],
    masterSeed: 789
  },
  {
    id: 'teacher',
    name: 'Mme Durand',
    age: 32,
    description: 'Ta prof de maths particulière. Elle est très stricte sur les équations.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    scenarioId: 'teacher_intro',
    hints: ['La discipline cache un chaos', 'N\'aime pas les excuses classiques', 'Cherche l\'inattendu']
  },
  {
    id: 'colleague',
    name: 'Sarah',
    age: 27,
    description: 'Collègue de bureau. Elle passe plus de temps à la machine à café qu\'à bosser.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    scenarioId: 'colleague_intro',
    hints: ['L\'ironie est sa seule langue', 'Le travail est une fiction', 'Cherche l\'étincelle dans le conflit']
  }
];
