import type { Step } from '../../../types';

export const finaleSteps: Record<string, Step> = {
  '3': {
    id: '3',
    image: '/src/assets/photos/neighbor/scenario/step_4.png',
    girlMessages: [
      "bon par contre mon appart est un chantier absolu là",
      "genre j'ai des fringues partout parce que j'étais en plein tri",
      "ça te dit pas plutôt de m'ouvrir chez toi ? je suis curieuse de voir à quoi ça ressemble ✨",
      "je peux être là dans 30 secondes"
    ],
    choices: [
      {
        text: "vendu. mais je te préviens si tu juges ma collec de mugs je te confisque ton verre",
        nextStepId: '4',
        interestDelta: 1,
        reactionMessages: ["promis je serai d'une indulgence totale", "ou pas"]
      },
      {
        text: "30 secondes ? t'es déjà dans le couloir ou quoi 💀",
        nextStepId: '4',
        interestDelta: 1,
        reactionMessages: ["...25 maintenant. dépêche-toi d'ouvrir !"]
      },
      {
        text: "ma porte est ouverte. le vin est déjà servi",
        nextStepId: '4',
        interestDelta: 2,
        reactionMessages: ["quelle efficacité... j'arrive"]
      },
      {
        text: "attends c'est un peu rapide non ? on se connaît depuis une heure",
        nextStepId: 'END',
        interestDelta: -5,
        reactionMessages: ["ah", "ouais non t'as raison", "désolée d'avoir été spontanée. je retourne à mes loutres 🙃"]
      }
    ]
  },
  '4': {
    id: '4',
    image: '/src/assets/photos/neighbor/scenario/step_5.png',
    girlMessages: [
      "bon... j'y suis",
      "j'ai le trac c'est débile",
      "en vrai j'ai failli faire demi-tour dans le couloir mdr",
      "tu m'ouvres ou je repars en courant comme une gamine ? 🫠"
    ],
    choices: [
      {
        text: "(ouvrir la porte) salut voisine. entre, te sauve pas",
        nextStepId: '5',
        interestDelta: 2,
        reactionMessages: ["pfiou... t'es encore mieux en vrai"]
      },
      {
        text: "le mot de passe c'est 'le voisin du 3e est un génie'",
        nextStepId: '5',
        interestDelta: 1,
        reactionMessages: ["dans tes rêves ! mais je vais le dire juste parce que j'ai soif"]
      },
      {
        text: "attends j'ai pas fini de cacher mes cadavres sous le lit 💀",
        nextStepId: '5',
        interestDelta: 1,
        reactionMessages: ["si ils sentent pas trop fort ça me va"]
      },
      {
        text: "laisse la bouteille devant la porte et on continue par sms",
        nextStepId: '5',
        interestDelta: 1,
        reactionMessages: ["t'as pas honte ? allez ouvre !"]
      }
    ]
  },
  '5': {
    id: '5',
    isPhysical: true,
    image: '/src/assets/photos/neighbor/scenario/step_6.png',
    girlMessages: [
      "bon... ton appart a survécu à mon inspection",
      "c'est pas mal ici. on s'y sent bien",
      "et le vin est...",
      "attends c'est moi qui l'ai ramené donc il est forcément incroyable 😂",
      "dis... tu penses quoi de moi maintenant que je suis plus juste une photo sur ton écran ?"
    ],
    choices: [
      {
        text: "en vrai t'es... différente de ce que j'imaginais. en mieux",
        nextStepId: '6',
        interestDelta: 2,
        reactionMessages: ["attends t'es sérieux là ?", "... merci 🫠"]
      },
      {
        text: "tu parles beaucoup trop mais c'est plutôt mignon",
        nextStepId: '6',
        interestDelta: 1,
        reactionMessages: ["hé ! c'est le vin qui me rend bavarde, normalement je suis hyper mystérieuse ✨"]
      },
      {
        text: "je préférais la photo, elle répondait pas quand je la vannais 💀",
        nextStepId: '6',
        interestDelta: 1,
        reactionMessages: ["pfff... insupportable"]
      },
      {
        text: "je pense qu'on devrait arrêter de parler et voir si la bouteille se vide toute seule 👀",
        nextStepId: '6',
        interestDelta: 2,
        reactionMessages: ["je vois où tu veux en venir... t'es pas un voisin si tranquille que ça finalement"]
      }
    ]
  },
  '6': {
    id: '6',
    isPhysical: true,
    image: '/src/assets/photos/neighbor/scenario/step_7.png',
    girlMessages: [
      "en vrai j'ai bien fait de swiper ce soir",
      "ça change des mecs qui te parlent de leur collection de NFT",
      "ou de leur programme de muscu du lundi",
      "attends...",
      "tu fais quoi si je décide de pas repartir tout de suite ? t'as un plan pour m'occuper ?"
    ],
    choices: [
      {
        text: "j'ai quelques idées mais je préfère voir tes talents d'improvisation",
        nextStepId: '6b',
        interestDelta: 2,
        reactionMessages: ["tu joues à ça ? ok... on va voir si t'assumes"]
      },
      {
        text: "on pourrait regarder un film mais je sens qu'on va pas beaucoup regarder l'écran",
        nextStepId: '6b',
        interestDelta: 2,
        reactionMessages: ["je crois que t'as tout compris voisin ✨"]
      },
      {
        text: "je peux t'apprendre à jouer au tarot c'est passionnant",
        nextStepId: '6b',
        interestDelta: -1,
        reactionMessages: ["le tarot ? sérieusement ? t'es un petit vieux en fait"]
      },
      {
        text: "si tu restes c'est toi qui fais la vaisselle demain matin 👀",
        nextStepId: '6b',
        interestDelta: 2,
        reactionMessages: ["demain matin ? monsieur se projette..."]
      }
    ]
  },
  '6b': {
    id: '6b',
    isPhysical: true,
    image: '/src/assets/photos/neighbor/scenario/step_7.png',
    girlMessages: [
      "...",
      "t'sais quoi je vais être honnête deux secondes",
      "j'ai passé une soirée incroyable et d'habitude je suis nulle pour dire ce genre de trucs",
      "mais là j'ai pas envie de rentrer chez moi"
    ],
    choices: [
      {
        text: "alors reste",
        nextStepId: '7',
        interestDelta: 2,
        reactionMessages: ["..."]
      },
      {
        text: "moi non plus j'ai pas envie que tu partes",
        nextStepId: '7',
        interestDelta: 2,
        reactionMessages: ["...ok 🫠"]
      }
    ]
  },
  '7': {
    id: '7',
    isPhysical: true,
    image: '/src/assets/photos/neighbor/scenario/step_8.png',
    girlMessages: [
      "...",
      "bon on va peut-être poser les téléphones alors",
      "merci pour ce soir, voisin"
    ],
    choices: [
      {
        text: "(se rapprocher d'elle) de rien Léa...",
        nextStepId: 'victory_reward',
        interestDelta: 2,
        reactionMessages: ["..."]
      }
    ]
  },
  'victory_reward': {
    id: 'victory_reward',
    isPhysical: true,
    image: '/src/assets/photos/neighbor/exclusive/sofa.png',
    girlMessages: [
      "attends avant que j'oublie...",
      "t'as été plutôt pas mal ce soir",
      "tiens c'est cadeau 😏",
      "on se voit demain ?"
    ],
    choices: [
      {
        text: "je crois que je vais avoir du mal à dormir... à demain Léa ✨",
        nextStepId: 'END',
        interestDelta: 5
      }
    ]
  },
};
