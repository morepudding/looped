import type { Step } from '../../../types';

export const introSteps: Record<string, Step> = {
  '0': {
    id: '0',
    image: '/src/assets/photos/neighbor/scenario/step_1.png',
    girlMessages: [
      "attends... t'es pas le mec du 3e ?",
      "celui qui a toujours un casque sur les oreilles ?",
      "genre on habite à 10m et il faut une appli pour se parler 💀"
    ],
    choices: [
      {
        text: "si c'est moi. et toi t'es la fille qui court tout le temps pour pas rater son bus",
        nextStepId: '1',
        interestDelta: 1,
        reactionMessages: ["démasquée... j'avoue la ponctualité c'est pas mon fort 😂"]
      },
      {
        text: "coupable 🙋‍♂️ au moins dans mon casque y'a pas l'odeur de friture du 2e",
        nextStepId: '1',
        interestDelta: 1,
        reactionMessages: ["MERCI j'ai cru que y'avait que moi que ça rendait dingue"]
      },
      {
        text: "honnêtement je t'ai croisée genre 50 fois dans l'escalier et j'ai jamais osé te parler",
        nextStepId: '1',
        interestDelta: -1,
        reactionMessages: ["oh... c'est mignon mais un peu flippant non ? 😅"]
      },
      {
        text: "j'utilise l'appli pour filtrer les voisins chelous. félicitations t'as passé le premier tri",
        nextStepId: '1',
        interestDelta: 1,
        reactionMessages: ["quel honneur ! j'espère que le test était pas trop dur"]
      }
    ]
  },
  '1': {
    id: '1',
    image: '/src/assets/photos/neighbor/scenario/step_2.png',
    girlMessages: [
      "n'empêche c'est trop bizarre de se parler comme ça",
      "on dirait le début d'un épisode de Quotidien où ça part en malaise",
      "t'en penses quoi toi de l'ambiance dans l'immeuble ? à part l'odeur de friture du 2e et le mec qui se croit en club le mardi soir"
    ],
    choices: [
      {
        text: "le pire c'est les réunions de copro. j'y suis allé une fois, j'ai failli demander l'asile politique",
        nextStepId: '2',
        interestDelta: 1,
        reactionMessages: ["merde j'aurais dû y aller juste pour voir ta tête 😂"]
      },
      {
        text: "tant qu'on se parle toi et moi l'ambiance me va",
        nextStepId: '2',
        interestDelta: 1,
        reactionMessages: ["une vraie machine à compliments toi. tu dis ça à toutes les voisines ?"]
      },
      {
        text: "honnêtement j'ai même pas le nom du voisin d'en face... c'est grave docteur ?",
        nextStepId: '2',
        interestDelta: -1,
        reactionMessages: ["un peu oui 😂 mais au moins t'es sur l'appli c'est un début"]
      },
      {
        text: "le mec de la techno est insupportable. un jour je vais aller mixer avec lui juste pour lui montrer c'est quoi du bon son 💀",
        nextStepId: '2',
        interestDelta: 1,
        reactionMessages: ["j'achète mon billet pour le show direct !"]
      }
    ]
  },
  '2': {
    id: '2',
    image: '/src/assets/photos/neighbor/scenario/step_3.png',
    girlMessages: [
      "bon... en vrai je m'ennuie à mourir là",
      "j'ai une bouteille de blanc au frais depuis hier et je me vois pas la descendre toute seule devant un documentaire sur les loutres",
      "t'as quoi de prévu ? j'ai bien envie de passer mais je teste toujours mes voisins avant",
      "enfin... j'ai jamais testé personne c'est la première fois que je fais ça mdr 🫠"
    ],
    choices: [
      {
        text: "un test ? je suis prêt. balance ton défi",
        nextStepId: 'wifi_challenge',
        interestDelta: 1,
        reactionMessages: ["j'aime cette assurance !"]
      },
      {
        text: "si c'est un test de QI je suis mal barré 💀",
        nextStepId: 'wifi_challenge',
        interestDelta: 1,
        reactionMessages: ["t'inquiète c'est plus une question d'observation..."]
      }
    ]
  },
};
