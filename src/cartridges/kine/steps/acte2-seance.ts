import type { Step } from '../../../types';

export const acte2SeanceSteps: Record<string, Step> = {
  '10': {
    id: '10',
    isPhysical: true,
    girlMessages: [
      "rebonjour",
      "...",
      "(elle te regarde de haut en bas)",
      "t'as mis du parfum pour venir chez ta kiné",
      "intéressant"
    ],
    choices: [
      {
        text: "j'en mets toujours",
        nextStepId: '11',
        interestDelta: 0,
        reactionMessages: ["non", "la dernière fois tu sentais le déo sport", "je suis kiné je fais attention à ces trucs"]
      },
      {
        text: "(sourire sans répondre)",
        nextStepId: '11',
        interestDelta: 2,
        reactionMessages: ["...", "t-shirt. tu connais la procédure"]
      },
      {
        text: "et toi t'as détaché tes cheveux depuis la dernière fois",
        nextStepId: '11',
        interestDelta: 2,
        reactionMessages: ["...", "(une seconde de silence)", "ah tiens t'as changé depuis la dernière fois", "allonge-toi"]
      }
    ]
  },
  '11': {
    id: '11',
    isPhysical: true,
    girlMessages: [
      "(ses mains se posent sur toi. elles sont chaudes cette fois.)",
      "...",
      "t'es moins tendu qu'avant",
      "c'est bien",
      "(ses pouces appuient le long de ta colonne, lentement, très lentement)",
      "par contre là...",
      "(elle appuie sur un point précis dans le bas du dos)",
      "ça c'est pas du stress"
    ],
    choices: [
      {
        text: "(serrer les dents) c'est quoi alors",
        nextStepId: '12',
        interestDelta: 1,
        reactionMessages: ["de l'anticipation"]
      },
      {
        text: "(frisson)",
        nextStepId: '12',
        interestDelta: 1,
        reactionMessages: ["...", "(elle a senti le frisson. elle dit rien. elle continue.)"]
      },
      {
        text: "tes mains sont chaudes cette fois",
        nextStepId: '12',
        interestDelta: 2,
        reactionMessages: ["(elle se penche vers ton oreille)", "c'est toi qui es chaud cette fois"]
      }
    ]
  },
  '12': {
    id: '12',
    isPhysical: true,
    girlMessages: [
      "tourne-toi",
      "(tu es sur le dos. elle est là. plus proche que la dernière fois.)",
      "(son genou touche la table. son visage est à 30 centimètres du tien.)",
      "...",
      "je vais travailler le cou",
      "(ses doigts se posent sur ta gorge. doucement.)",
      "avale pas"
    ],
    choices: [
      {
        text: "(ne pas bouger. ne pas respirer.)",
        nextStepId: '13',
        interestDelta: 1,
        reactionMessages: ["(ses doigts glissent sur le côté de ton cou)", "...", "bien"]
      },
      {
        text: "(la regarder dans les yeux) tu fais exprès",
        nextStepId: '13',
        interestDelta: 2,
        reactionMessages: ["exprès de quoi", "(elle ne recule pas)", "c'est mon métier"]
      },
      {
        text: "c'est une séance de kiné ou un interrogatoire ?",
        nextStepId: '13',
        interestDelta: 1,
        reactionMessages: ["(elle sourit pour la première fois vraiment)", "les deux"]
      }
    ]
  },
  '13': {
    id: '13',
    isPhysical: true,
    girlMessages: [
      "(elle travaille en silence pendant un long moment)",
      "(ses mains sur tes épaules. ta nuque. ta mâchoire.)",
      "...",
      "tu sais ce que j'aime dans ce métier",
      "les gens mentent avec les mots",
      "mais le corps ment jamais",
      "(elle te regarde)",
      "et le tien parle beaucoup en ce moment"
    ],
    choices: [
      {
        text: "et il dit quoi ?",
        nextStepId: '14',
        interestDelta: 2,
        reactionMessages: ["...", "tu veux vraiment que je te réponde ?"]
      },
      {
        text: "(attraper doucement son poignet) le tien aussi",
        nextStepId: '14',
        interestDelta: 3,
        reactionMessages: ["(elle ne retire pas sa main)", "...", "touché"]
      },
      {
        text: "c'est... professionnel tout ça ?",
        nextStepId: '14',
        interestDelta: 1,
        reactionMessages: ["(elle recule d'un centimètre)", "(puis revient)", "non"]
      }
    ]
  },
  '14': {
    id: '14',
    isPhysical: true,
    girlMessages: [
      "...",
      "la séance est finie",
      "...",
      "(elle ne bouge pas)",
      "enfin... officiellement"
    ],
    choices: [
      {
        text: "(ne pas bouger non plus) et officieusement ?",
        nextStepId: '15',
        interestDelta: 2,
        reactionMessages: ["(elle pose ses mains à plat sur la table, de chaque côté de ta tête)", "..."]
      },
      {
        text: "(se redresser lentement, le visage proche du sien) je suis pas pressé",
        nextStepId: '15',
        interestDelta: 3,
        reactionMessages: ["(elle ne recule pas)", "...", "moi non plus"]
      },
      {
        text: "tu me rends mon t-shirt ?",
        nextStepId: '15',
        interestDelta: 1,
        reactionMessages: ["(elle le tient dans sa main. elle le tend. elle le lâche pas.)", "viens le chercher"]
      }
    ]
  },
};
