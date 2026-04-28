import type { Step } from '../../../types';

export const finaleSteps: Record<string, Step> = {
  '15': {
    id: '15',
    isPhysical: true,
    girlMessages: [
      "j'ai du vin dans l'arrière-salle",
      "avantage d'être son propre patron",
      "tu bois un coup ou tu fuis"
    ],
    choices: [
      {
        text: "j'ai pas l'impression d'être le genre à fuir",
        nextStepId: '16',
        interestDelta: 2,
        reactionMessages: ["non", "c'est vrai", "(elle tourne les talons)", "suis-moi"]
      },
      {
        text: "ça dépend. rouge ou blanc ?",
        nextStepId: '16',
        interestDelta: 1,
        reactionMessages: ["rouge", "comme si t'avais le choix"]
      },
      {
        text: "(se lever de la table et la suivre sans un mot)",
        nextStepId: '16',
        interestDelta: 2,
        reactionMessages: ["(elle sourit sans se retourner)"]
      }
    ]
  },
  '16': {
    id: '16',
    isPhysical: true,
    girlMessages: [
      "(l'arrière-salle. petite. un canapé. de la lumière basse.)",
      "(elle te tend un verre. ses doigts s'attardent sur les tiens.)",
      "...",
      "t'es le pire patient que j'ai jamais eu"
    ],
    choices: [
      {
        text: "c'est un compliment ?",
        nextStepId: '17',
        interestDelta: 1,
        reactionMessages: ["à ton avis"]
      },
      {
        text: "et toi t'es la pire kiné",
        nextStepId: '17',
        interestDelta: 2,
        reactionMessages: ["(elle rit. pour la première fois vraiment.)", "c'est pas faux"]
      },
      {
        text: "(boire une gorgée en la regardant par-dessus le verre)",
        nextStepId: '17',
        interestDelta: 2,
        reactionMessages: ["arrête de me regarder comme ça", "...", "ou continue j'ai pas encore décidé"]
      }
    ]
  },
  '17': {
    id: '17',
    isPhysical: true,
    girlMessages: [
      "(elle s'assoit à côté de toi sur le canapé. proche.)",
      "(son épaule contre la tienne.)",
      "tu sais quoi",
      "d'habitude c'est moi qui lis les gens",
      "toi je t'ai pas encore compris",
      "...",
      "et ça m'énerve un peu"
    ],
    choices: [
      {
        text: "peut-être que t'as besoin d'une deuxième séance pour ça",
        nextStepId: '18',
        interestDelta: 2,
        reactionMessages: ["...", "(elle tourne la tête vers toi)", "c'est la meilleure chose que t'as dite ce soir"]
      },
      {
        text: "(poser son verre) j'ai une idée. ferme les yeux",
        nextStepId: '18',
        interestDelta: 3,
        reactionMessages: ["(elle te regarde. 3 secondes.)", "(elle ferme les yeux.)"]
      },
      {
        text: "tu veux que je te fasse une séance ? pour une fois c'est toi qui t'allonges",
        nextStepId: '18',
        interestDelta: 2,
        reactionMessages: ["...", "(elle mord sa lèvre)", "t'as pas le diplôme"]
      }
    ]
  },
  '18': {
    id: '18',
    isPhysical: true,
    girlMessages: [
      "...",
      "(elle est proche. très proche.)",
      "(sa main se pose sur ta cuisse.)",
      "...",
      "bon",
      "je crois qu'on a dépassé le cadre de la consultation"
    ],
    choices: [
      {
        text: "(se rapprocher) depuis longtemps",
        nextStepId: '19',
        interestDelta: 2,
        reactionMessages: ["..."]
      },
      {
        text: "c'est toi la pro. c'est toi qui décides",
        nextStepId: '19',
        interestDelta: 2,
        reactionMessages: ["(elle passe sa main derrière ta nuque)", "...pour une fois tu dis un truc intelligent"]
      }
    ]
  },
  '19': {
    id: '19',
    isPhysical: true,
    girlMessages: [
      "...",
      "...",
      "(plus tard.)",
      "(le vin est tiède. le canapé est petit. la lumière est basse.)",
      "...",
      "ton dos va mieux ?"
    ],
    choices: [
      {
        text: "quel dos",
        nextStepId: 'victory_reward',
        interestDelta: 3,
        reactionMessages: ["(elle rit dans ton cou)"]
      },
      {
        text: "je crois que j'ai besoin d'un suivi régulier",
        nextStepId: 'victory_reward',
        interestDelta: 2,
        reactionMessages: ["ça tombe bien", "j'ai un créneau qui vient de se libérer"]
      }
    ]
  },
  'victory_reward': {
    id: 'victory_reward',
    isPhysical: true,
    girlMessages: [
      "...",
      "reprends rendez-vous",
      "même créneau",
      "et cette fois ramène le vin toi-même"
    ],
    choices: [
      {
        text: "à vendredi",
        nextStepId: 'END',
        interestDelta: 5
      }
    ]
  },
};
