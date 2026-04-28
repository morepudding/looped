import type { Step } from '../../../types';

export const defisAppsSteps: Record<string, Step> = {
  // ── DÉFI 3 : Rébus photos → Paris ──────────────────────────────────────
  'lea_rebus_setup': {
    id: 'lea_rebus_setup',
    girlMessages: [
      "défi n°3 et celui-là il est perso",
      "je viens de te partager un album photo. y'a un rébus dedans",
      "si tu devines ma ville de naissance je t'offre l'apéro demain 🥂",
      "(quitte le chat et va voir dans ton app Photos)"
    ],
    inputType: 'text',
    expectedAnswer: 'paris',
    wrongAnswerMessages: [
      "nope ! regarde bien les deux photos dans l'album...",
      "un indice ? le rébus est phonétique 👣 + 🍚",
      "c'est la capitale de la France quand même ! 😂"
    ],
    choices: [
      {
        text: "C'est Paris !",
        nextStepId: 'filler_paris',
        interestDelta: 2,
        reactionMessages: ["bien joué ! t'es plus malin que t'en as l'air"]
      }
    ]
  },
  'filler_paris': {
    id: 'filler_paris',
    girlMessages: [
      "paris... j'y suis née mais on a déménagé quand j'avais 6 ans",
      "j'ai gardé deux trucs : l'odeur de la Seine et le bruit du métro la nuit",
      "c'est con mais ça me manque des fois",
      "tu connais ?"
    ],
    choices: [
      {
        text: "j'y suis allé une fois. j'ai surtout retenu le prix des cafés 💀",
        nextStepId: 'filler_paris_2',
        interestDelta: 1,
        reactionMessages: ["vérité universelle ça"]
      },
      {
        text: "un peu oui. surtout le Marais le soir quand tout s'allume",
        nextStepId: 'filler_paris_2',
        interestDelta: 1,
        reactionMessages: ["le Marais de nuit... t'as bon goût"]
      },
      {
        text: "non mais j'aimerais bien qu'on m'y emmène",
        nextStepId: 'filler_paris_2',
        interestDelta: 2,
        reactionMessages: ["intéressant... on verra si tu mérites le guide"]
      }
    ]
  },
  'filler_paris_2': {
    id: 'filler_paris_2',
    girlMessages: [
      "parfois je me demande ce que ma vie serait devenue si on était restés là-bas",
      "je serais peut-être une de ces filles pressées qui boivent des lattes à 8 balles en tirant la gueule dans la ligne 13 😂",
      "tu te vois vivre ailleurs toi ? genre au bord de la mer ou dans un chalet paumé ?"
    ],
    choices: [
      {
        text: "le chalet direct. je ferais mon propre fromage et je parlerais plus à personne",
        nextStepId: 'gps_challenge',
        interestDelta: 1,
        reactionMessages: ["je viendrai te piquer du fromage alors"]
      },
      {
        text: "la mer sans hésiter. j'ai besoin d'horizon sinon j'étouffe",
        nextStepId: 'gps_challenge',
        interestDelta: 1,
        reactionMessages: ["on est deux... l'air marin ça soigne tout"]
      },
      {
        text: "pur produit de la ville. j'ai besoin du bruit et de la pollution pour me sentir vivant 💀",
        nextStepId: 'gps_challenge',
        interestDelta: 1,
        reactionMessages: ["au moins t'es honnête ! un vrai rat des villes"]
      }
    ]
  },

  // ── DÉFI 4 : GPS → Maps app ────────────────────────────────────────────
  'gps_challenge': {
    id: 'gps_challenge',
    girlMessages: [
      "défi n°4",
      "et c'est le plus romantique 🌙",
      "48°51'29\" N, 2°17'40\" E",
      "c'est là où j'aimerais qu'on se retrouve un soir",
      "(ouvre ton app Plans pour trouver l'endroit)"
    ],
    inputType: 'text',
    expectedAnswer: 'tour eiffel',
    wrongAnswerMessages: [
      "c'est pas ça... t'as ouvert Maps ? 🗺️",
      "toujours pas... ça brille la nuit et ça fait des selfies moches ✨",
      "le monument le plus connu de Paris... allez 😂"
    ],
    choices: [
      {
        text: "La Tour Eiffel !",
        nextStepId: 'filler_gps',
        interestDelta: 2,
        reactionMessages: ["voilà ! je savais que t'étais romanesque 🌙"]
      }
    ]
  },
  'filler_gps': {
    id: 'filler_gps',
    girlMessages: [
      "j'y suis allée à minuit une fois avec des potes",
      "on a raté le dernier RER au retour... on a fini à pied jusqu'à 4h du mat 💀",
      "ça reste un des meilleurs souvenirs que j'ai",
      "c'est con hein ? les meilleurs moments c'est toujours ceux qui partent en vrille",
      "attends... j'ajoute un truc dans l'album. va voir 😏"
    ],
    choices: [
      {
        text: "(aller voir l'album)",
        nextStepId: 'mirror_challenge',
        interestDelta: 1
      }
    ]
  },

  // ── DÉFI 5 : Post-it miroir → album Photos ─────────────────────────────
  'mirror_challenge': {
    id: 'mirror_challenge',
    girlMessages: [
      "alors ? t'as vu le post-it ?",
      "si tu arrives à lire ce que j'ai écrit...",
      "j'arrive dans 5 minutes 🚪"
    ],
    inputType: 'text',
    expectedAnswer: 'entre',
    wrongAnswerMessages: [
      "t'es sûr ? regarde bien le post-it dans l'album...",
      "indice : retourne-le dans ta tête 🪞",
      "5 lettres, un impératif... c'est ce que tu veux que je fasse non ? 😂"
    ],
    choices: [
      {
        text: "J'ai lu : ENTRE",
        nextStepId: 'mirror_transition',
        interestDelta: 3,
        reactionMessages: ["..."]
      }
    ]
  },

  // ── Transition émotionnelle avant la rencontre ─────────────────────────
  'mirror_transition': {
    id: 'mirror_transition',
    girlMessages: [
      "ok j'ai un peu le cœur qui bat là",
      "c'est bizarre hein ? on se connaît depuis genre 20 minutes",
      "tu me trouves bizarre si je dis que j'ai envie de venir quand même ?"
    ],
    choices: [
      {
        text: "bizarre ? non. impatiente ? clairement",
        nextStepId: '3',
        interestDelta: 2,
        reactionMessages: ["ok j'arrive... j'arrive j'arrive 😂"]
      },
      {
        text: "je trouve ça plutôt courageux en vrai",
        nextStepId: '3',
        interestDelta: 2,
        reactionMessages: ["... merci. bon j'enfile mes chaussures"]
      },
      {
        text: "Léa. ramène la bouteille et arrête de réfléchir",
        nextStepId: '3',
        interestDelta: 1,
        reactionMessages: ["oui chef ! 🫡"]
      }
    ]
  },
};
