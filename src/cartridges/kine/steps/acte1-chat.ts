import type { Step } from '../../../types';

export const acte1ChatSteps: Record<string, Step> = {
  '0': {
    id: '0',
    girlMessages: [
      "je viens de voir ta fiche",
      "mal de dos depuis 3 semaines et t'as attendu tout ce temps",
      "les mecs je vous jure"
    ],
    choices: [
      {
        text: "j'espérais que ça passe tout seul...",
        nextStepId: '1',
        interestDelta: 0,
        reactionMessages: ["ça passe jamais tout seul", "c'est pour ça que j'existe"]
      },
      {
        text: "j'attendais de tomber sur la bonne kiné",
        nextStepId: '1',
        interestDelta: 1,
        reactionMessages: ["..."]
      },
      {
        text: "c'est si grave que ça docteur ?",
        nextStepId: '1',
        interestDelta: 1,
        reactionMessages: ["déjà je suis pas docteur", "ensuite oui c'est probablement grave", "je rigole. on verra demain"]
      }
    ]
  },
  '1': {
    id: '1',
    girlMessages: [
      "bon",
      "demain 19h. dernier créneau de la journée",
      "t'enlèves ton t-shirt et on regarde ça",
      "des questions ?"
    ],
    choices: [
      {
        text: "aucune. à vos ordres",
        nextStepId: '2',
        interestDelta: 1,
        reactionMessages: ["bien"]
      },
      {
        text: "vous parlez comme ça à tous vos patients ?",
        nextStepId: '2',
        interestDelta: 2,
        reactionMessages: ["seulement ceux qui attendent 3 semaines pour consulter"]
      },
      {
        text: "je dois m'inquiéter ?",
        nextStepId: '2',
        interestDelta: 0,
        reactionMessages: ["non", "enfin pas pour le dos"]
      }
    ]
  },
  '2': {
    id: '2',
    girlMessages: [
      "au fait",
      "évite le café demain. ça te crispe et je le sens direct sous les doigts",
      "et dors sur le dos",
      "à demain"
    ],
    choices: [
      {
        text: "c'est toujours aussi directif chez vous ?",
        nextStepId: '3',
        interestDelta: 1,
        reactionMessages: ["t'as pas idée"]
      },
      {
        text: "noté chef. pas de café, dos, 19h",
        nextStepId: '3',
        interestDelta: 1,
        reactionMessages: ["il apprend vite celui-là"]
      },
      {
        text: "vous envoyez ça à 23h à tous vos patients ?",
        nextStepId: '3',
        interestDelta: 2,
        reactionMessages: ["...", "dors"]
      }
    ]
  },
};
