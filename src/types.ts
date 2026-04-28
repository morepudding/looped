export interface Choice {
  text: string;
  nextStepId: string | 'END';
  interestDelta?: number;
  reactionMessages?: string[]; // La réponse immédiate de la fille à ce choix précis
}

export interface StepBehavior {
  delayBeforeTyping?: number; // ms avant de voir "en train d'écrire"
  typingSpeed?: 'slow' | 'normal' | 'fast';
  multiTextDelay?: number; // ms entre deux bulles si plusieurs messages
}

export interface Step {
  id: string;
  girlMessages: string[]; 
  choices: Choice[];
  image?: string;
  behavior?: StepBehavior;
  isPhysical?: boolean; // Indique si on est en face à face
  inputType?: 'choice' | 'text'; // Type d'entrée attendu
  expectedAnswer?: string; // Réponse attendue si inputType est 'text'
  wrongAnswerMessages?: string[]; // Messages si la réponse est fausse
  mirrorText?: string; // Texte affiché en miroir (CSS scaleX(-1)) sur un post-it
}

export interface Scenario {
  id: string;
  title: string;
  steps: Record<string, Step>;
  startStepId: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  description: string;
  image: string;
  scenarioId: string;
  hints: string[];
  masterSeed?: number;
}

// ── Cartridge system ─────────────────────────────────────────────────

export interface WifiNetwork {
  name: string;
  locked: boolean;
  signal: 1 | 2 | 3;
}

export interface PhotoItem {
  type: 'image' | 'postit';
  src?: string;
  alt?: string;
  postitText?: string;
}

export interface PhotoPhase {
  triggerStepIds: string[];
  photos: PhotoItem[];
  notification?: { title: string; message: string; icon: string };
}

export interface PhotoAlbumConfig {
  name: string;
  icon: string;
  phases: PhotoPhase[];
}

export interface MapsConfig {
  coords: string;
  sharedBy: string;
}

export interface Cartridge {
  profile: Profile;
  scenario: Scenario;
  castingPrompt?: string;
  startNotification?: { title: string; message: string; icon: string };
  personalRating: 1 | 2 | 3 | 4 | 5;
  heatRating: 1 | 2 | 3 | 4 | 5;
  apps: {
    wifi?: WifiNetwork[];
    photos?: PhotoAlbumConfig;
    maps?: MapsConfig;
  };
}
