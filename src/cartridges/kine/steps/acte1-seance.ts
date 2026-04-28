import type { Step } from '../../../types';

export const acte1SeanceSteps: Record<string, Step> = {
  '3': {
    id: '3',
    isPhysical: true,
    girlMessages: [
      "t'es à l'heure",
      "entre. pose tes affaires là",
      "le t-shirt. enlève"
    ],
    choices: [
      {
        text: "(enlever son t-shirt sans rien dire)",
        nextStepId: '4',
        interestDelta: 1,
        reactionMessages: ["(elle te regarde 2 secondes de trop)", "ok. allonge-toi sur le ventre"]
      },
      {
        text: "même pas un bonjour ?",
        nextStepId: '4',
        interestDelta: 1,
        reactionMessages: ["bonjour", "maintenant le t-shirt"]
      },
      {
        text: "on se tutoie ou... ?",
        nextStepId: '4',
        interestDelta: 0,
        reactionMessages: ["je tutoie tout le monde", "allonge-toi"]
      }
    ]
  },
  '4': {
    id: '4',
    isPhysical: true,
    girlMessages: [
      "(ses mains se posent sur tes épaules. c'est froid.)",
      "...",
      "t'es crispé des trapèzes jusqu'en bas du dos",
      "tu fais quoi dans la vie pour être tendu comme ça"
    ],
    choices: [
      {
        text: "(ne rien dire. la laisser faire)",
        nextStepId: '5',
        interestDelta: 1,
        reactionMessages: ["(elle appuie plus fort)", "tu parles pas beaucoup toi"]
      },
      {
        text: "je bosse devant un écran 10h par jour",
        nextStepId: '5',
        interestDelta: 0,
        reactionMessages: ["évidemment", "(son pouce trouve un nœud sous ton omoplate)", "là. ça c'est 10 ans de mauvaise posture"]
      },
      {
        text: "là tout de suite c'est surtout vos mains froides qui me tendent",
        nextStepId: '5',
        interestDelta: 2,
        reactionMessages: ["...", "(elle approche sa bouche de ton oreille)", "elles vont se réchauffer"]
      }
    ]
  },
  '5': {
    id: '5',
    isPhysical: true,
    girlMessages: [
      "(ses doigts descendent le long de ta colonne. lentement.)",
      "respire",
      "...",
      "plus lentement",
      "voilà",
      "tu sais que la respiration change quand on est nerveux ?",
      "la tienne a changé y'a environ 30 secondes"
    ],
    choices: [
      {
        text: "(déglutir) c'est le dos qui fait mal c'est tout",
        nextStepId: '6',
        interestDelta: 1,
        reactionMessages: ["si tu le dis"]
      },
      {
        text: "c'est normal ça ? dans une séance de kiné ?",
        nextStepId: '6',
        interestDelta: 2,
        reactionMessages: ["(elle s'arrête une seconde)", "de quoi tu parles exactement ?", "(elle reprend comme si de rien n'était)"]
      },
      {
        text: "(fermer les yeux et ne pas bouger)",
        nextStepId: '6',
        interestDelta: 1,
        reactionMessages: ["(ses mains remontent dans ta nuque)", "...", "bien. tu te détends enfin"]
      }
    ]
  },
  '6': {
    id: '6',
    isPhysical: true,
    girlMessages: [
      "tourne-toi",
      "(tu es sur le dos maintenant. elle est au-dessus de toi.)",
      "...",
      "t'as des mains froides",
      "ça veut dire que le sang est pas là où il devrait être",
      "tu stresses ou c'est moi qui te fais cet effet ?"
    ],
    choices: [
      {
        text: "...les deux peut-être",
        nextStepId: '7',
        interestDelta: 2,
        reactionMessages: ["(un demi-sourire)", "honnête. c'est bien"]
      },
      {
        text: "c'est professionnel comme question ça ?",
        nextStepId: '7',
        interestDelta: 1,
        reactionMessages: ["tout à fait", "le stress impacte les tensions musculaires", "c'est de la science"]
      },
      {
        text: "(la regarder dans les yeux sans répondre)",
        nextStepId: '7',
        interestDelta: 2,
        reactionMessages: ["...", "(elle soutient ton regard)", "...", "(elle détourne les yeux la première)", "bon"]
      }
    ]
  },
  '7': {
    id: '7',
    isPhysical: true,
    girlMessages: [
      "c'est tout pour aujourd'hui",
      "(elle te tend ton t-shirt. ses doigts touchent les tiens.)",
      "tu reviens la semaine prochaine",
      "c'est pas une question"
    ],
    choices: [
      {
        text: "(reprendre le t-shirt lentement) même créneau ?",
        nextStepId: '8',
        interestDelta: 1,
        reactionMessages: ["19h", "le dernier", "comme ça je prends mon temps"]
      },
      {
        text: "et si j'ai plus mal au dos d'ici là ?",
        nextStepId: '8',
        interestDelta: 1,
        reactionMessages: ["t'auras encore mal", "crois-moi"]
      },
      {
        text: "(enfiler le t-shirt en la regardant) à vos ordres",
        nextStepId: '8',
        interestDelta: 2,
        reactionMessages: ["...", "file"]
      }
    ]
  },
};
