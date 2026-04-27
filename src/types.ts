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
  visualPrompt?: string;
  behavior?: StepBehavior;
  isPhysical?: boolean; // Indique si on est en face à face
  inputType?: 'choice' | 'text'; // Type d'entrée attendu
  expectedAnswer?: string; // Réponse attendue si inputType est 'text'
  wrongAnswerMessages?: string[]; // Messages si la réponse est fausse
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
