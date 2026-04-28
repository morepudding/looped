import type { Step } from '../../../types';

export const defisChatSteps: Record<string, Step> = {
  // ── DÉFI 1 : WiFi ──────────────────────────────────────────────────────
  'wifi_challenge': {
    id: 'wifi_challenge',
    girlMessages: [
      "bon vu qu'on est voisins tu captes forcément mon wifi",
      "trouve le nom exact de mon réseau. si tu y arrives je débarque avec la bouteille 🍷",
      "indice : j'ai pas cherché très loin pour le nom... c'est très 'moi'",
      "(quitte l'appli et va voir dans tes Réglages WiFi)"
    ],
    inputType: 'text',
    expectedAnswer: 'WiFi-de-Lea',
    wrongAnswerMessages: [
      "nop c'est pas ça du tout ! cherche encore...",
      "toujours pas... t'es sûr que t'es doué avec la technologie ? 😂",
      "indice : ça commence par 'WiFi' et y'a mon prénom dedans"
    ],
    choices: [
      {
        text: "J'ai trouvé ! C'est :",
        nextStepId: 'filler_wifi',
        interestDelta: 2,
        reactionMessages: ["incroyable ! t'es vraiment un stalker de compétition 😂"]
      }
    ]
  },
  'filler_wifi': {
    id: 'filler_wifi',
    girlMessages: [
      "t'es observateur dis donc... j'aurais pas cru ça d'un mec avec un casque vissé sur les oreilles 24/7",
      "bon t'as chaud pour la suite ? parce que c'est loin d'être fini"
    ],
    choices: [
      {
        text: "t'as encore des munitions ? impressionné",
        nextStepId: 'filler_wifi_2',
        interestDelta: 1
      },
      {
        text: "j'observe ce qui en vaut la peine",
        nextStepId: 'filler_wifi_2',
        interestDelta: 1,
        reactionMessages: ["ouuuh la réplique... t'as répété devant ton miroir ? 😂"]
      },
      {
        text: "j'avoue j'ai galéré plus que prévu",
        nextStepId: 'filler_wifi_2',
        interestDelta: 0,
        reactionMessages: ["au moins t'es honnête c'est rare 😂"]
      }
    ]
  },
  'filler_wifi_2': {
    id: 'filler_wifi_2',
    girlMessages: [
      "n'empêche je suis curieuse... tu écoutes quoi en boucle dans ton casque pour être autant dans ta bulle ?",
      "promis je juge pas",
      "enfin si un peu mais c'est le jeu 😂"
    ],
    choices: [
      {
        text: "beaucoup d'électro. ça m'aide à coder et à couvrir le crossfit du voisin du dessus",
        nextStepId: 'film_rebus',
        interestDelta: 1,
        reactionMessages: ["le crossfit à 23h c'est un fléau national"]
      },
      {
        text: "des podcasts de true crime. comme ça je saurai exactement quoi faire si tu deviens trop pénible",
        nextStepId: 'film_rebus',
        interestDelta: 2,
        reactionMessages: ["mais ?? t'es flippant !", "j'adore 😂"]
      },
      {
        text: "chanson française des années 60. je suis un vieux dans un corps de jeune",
        nextStepId: 'film_rebus',
        interestDelta: 1,
        reactionMessages: ["non... t'es sérieux ? faut qu'on te refasse une culture musicale d'urgence"]
      }
    ]
  },

  // ── DÉFI 2 : Rébus emoji (chat) ────────────────────────────────────────
  'film_rebus': {
    id: 'film_rebus',
    girlMessages: [
      "défi n°2",
      "🦁 👑",
      "c'est mon film préféré depuis que j'ai genre 6 ans. tu devines ?"
    ],
    inputType: 'text',
    expectedAnswer: 'le roi lion',
    wrongAnswerMessages: [
      "nope... regarde bien les emojis 🤔",
      "un lion + une couronne... c'est pas si dur 👑",
      "indice : classique Disney, ça parle d'un lionceau qui galère"
    ],
    choices: [
      {
        text: "Le Roi Lion !",
        nextStepId: 'filler_film',
        interestDelta: 2,
        reactionMessages: ["ENFIN quelqu'un qui a eu une enfance 🦁"]
      }
    ]
  },
  'filler_film': {
    id: 'filler_film',
    girlMessages: [
      "le roi lion c'est genre... la base de ma personnalité en vrai",
      "simba qui fuit au lieu d'assumer... c'est nous en fait 😂",
      "t'as un film d'enfance toi ? et me dis pas Fast & Furious je t'en supplie"
    ],
    choices: [
      {
        text: "Ratatouille. un rat cuisinier c'est mon alter-ego 💀",
        nextStepId: 'filler_film_2',
        interestDelta: 2,
        reactionMessages: ["RATATOUILLE 💀 ok t'as marqué des points là"]
      },
      {
        text: "attends t'es en train de me psychanalyser via Disney ?",
        nextStepId: 'filler_film_2',
        interestDelta: 1,
        reactionMessages: ["totalement et j'assume 😂"]
      },
      {
        text: "j'en avais pas vraiment... on regardait pas trop la télé chez moi",
        nextStepId: 'filler_film_2',
        interestDelta: -1,
        reactionMessages: ["...bon. on va rattraper ça un jour promis"]
      }
    ]
  },
  'filler_film_2': {
    id: 'filler_film_2',
    girlMessages: [
      "t'étais quel genre de gamin toi ?",
      "le genre sage au premier rang ou le genre qui démonte ses jouets pour voir comment ça marche ?",
      "j'ai ma petite idée mais je te laisse une chance de me surprendre"
    ],
    choices: [
      {
        text: "celui qui démonte tout. j'ai jamais réussi à remonter ma première Game Boy par contre 💀",
        nextStepId: 'lea_rebus_setup',
        interestDelta: 1,
        reactionMessages: ["je savais ! t'as gardé ce côté 'je cherche comment ça marche'"]
      },
      {
        text: "plutôt dans la lune. je fixais les mouches au plafond pendant que la maîtresse parlait de Pythagore",
        nextStepId: 'lea_rebus_setup',
        interestDelta: 1,
        reactionMessages: ["un grand rêveur... c'est mignon en vrai ✨"]
      },
      {
        text: "le cerveau du groupe. c'est moi qui organisais les plans pour piquer des bonbons à la boulangerie",
        nextStepId: 'lea_rebus_setup',
        interestDelta: 2,
        reactionMessages: ["un petit criminel en herbe ! j'aurais dû me méfier de toi 😂"]
      }
    ]
  },
};
