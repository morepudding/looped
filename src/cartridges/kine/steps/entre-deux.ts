import type { Step } from '../../../types';

export const entreDeuxSteps: Record<string, Step> = {
  '8': {
    id: '8',
    girlMessages: [
      "t'as fait les étirements que je t'ai envoyés ?",
      "mens pas je le sentirai la prochaine fois"
    ],
    choices: [
      {
        text: "tous les jours matin et soir",
        nextStepId: '9',
        interestDelta: 0,
        reactionMessages: ["menteur"]
      },
      {
        text: "j'ai essayé le premier et j'ai failli me bloquer le cou",
        nextStepId: '9',
        interestDelta: 1,
        reactionMessages: ["c'est parce que tu fais n'importe quoi sans moi"]
      },
      {
        text: "honnêtement j'ai surtout regardé les photos en boucle",
        nextStepId: '9',
        interestDelta: 2,
        reactionMessages: ["...", "les photos d'étirements", "évidemment"]
      }
    ]
  },
  '9': {
    id: '9',
    girlMessages: [
      "question",
      "t'as mal où exactement quand tu te réveilles le matin",
      "et me dis pas 'partout' sinon je raccroche"
    ],
    choices: [
      {
        text: "bas du dos côté droit. surtout quand je me lève",
        nextStepId: '9b',
        interestDelta: 0,
        reactionMessages: ["ok ça c'est du psoas", "je m'en occupe vendredi"]
      },
      {
        text: "franchement le dos ça va mieux. c'est la tête qui tourne depuis la séance",
        nextStepId: '9b',
        interestDelta: 2,
        reactionMessages: ["...", "c'est pas dans mes compétences ça"]
      },
      {
        text: "partout",
        nextStepId: '9b',
        interestDelta: 1,
        reactionMessages: ["...", "t'es insupportable", "à vendredi"]
      }
    ]
  },
  '9b': {
    id: '9b',
    girlMessages: [
      "bon",
      "vendredi 19h",
      "cette fois je vais aller plus en profondeur",
      "...",
      "sur le dos. évidemment"
    ],
    choices: [
      {
        text: "évidemment",
        nextStepId: '10',
        interestDelta: 1,
        reactionMessages: ["bonne nuit"]
      },
      {
        text: "je note que c'est vous qui relancez à chaque fois",
        nextStepId: '10',
        interestDelta: 2,
        reactionMessages: ["c'est du suivi patient", "bonne nuit"]
      }
    ]
  },
};
