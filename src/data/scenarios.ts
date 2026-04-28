import type { Scenario } from '../types';

const LEA_BASE = "Young French woman, messy ginger hair, green eyes, freckles, cute face, realistic photography, cinematic lighting";

export const SCENARIOS: Record<string, Scenario> = {
  neighbor_intro: {
    id: 'neighbor_intro',
    title: 'La Voisine',
    startStepId: '0',
    steps: {
      '0': {
        id: '0',
        girlMessages: [
          "attends... t'es pas le mec du 3e ?",
          "celui qui a toujours un casque sur les oreilles et qui lâche jamais son téléphone ?",
          "incroyable de se trouver ici alors qu'on habite à 10 mètres l'un de l'autre 💀"
        ],
        visualPrompt: `${LEA_BASE}, looking surprised at her phone, natural home lighting`,
        choices: [
          {
            text: "si c'est moi. et toi t'es la fille qui court tout le temps pour pas rater son bus 😏",
            nextStepId: '1',
            interestDelta: 1,
            reactionMessages: ["démasquée... j'avoue que la ponctualité c'est pas mon fort"]
          },
          {
            text: "coupable. mais j'ai une bonne excuse : j'écoute des trucs beaucoup plus intéressants que les bruits de l'immeuble",
            nextStepId: '1',
            interestDelta: 1,
            reactionMessages: ["ah ouais ? genre quoi ? j'espère que c'est pas du développement personnel mdr"]
          },
          {
            text: "enchanté Léa, tu veux qu'on se voie dans l'escalier demain ?",
            nextStepId: '1',
            interestDelta: -1,
            reactionMessages: ["oula... l'escalier c'est pas hyper romantique comme premier date non ?"]
          },
          {
            text: "j'avoue, j'utilise l'appli pour filtrer les voisins chelous... t'as passé le test 😏",
            nextStepId: '1',
            interestDelta: 1,
            reactionMessages: ["quel honneur ! j'espère que le test était pas trop dur"]
          }
        ]
      },
      '1': {
        id: '1',
        girlMessages: [
          "n'empêche c'est trop bizarre de se parler comme ça",
          "j'ai l'impression d'être dans une série nulle sur netflix",
          "t'en penses quoi toi de l'ambiance dans l'immeuble ? à part l'odeur de friture du 2e et le mec qui se croit en club le mardi soir ?"
        ],
        visualPrompt: `${LEA_BASE}, smiling, sitting on her bed, relaxed atmosphere`,
        choices: [
          {
            text: "je crois que le pire c'est les réunions de copro. j'y suis allé une fois, j'ai failli demander l'asile politique",
            nextStepId: '2',
            interestDelta: 1,
            reactionMessages: ["merde j'aurais dû y aller juste pour voir ta tête alors 😂"]
          },
          {
            text: "tant qu'on se parle toi et moi, l'ambiance me va très bien 😏",
            nextStepId: '2',
            interestDelta: 1,
            reactionMessages: ["t'es une vraie machine à compliments toi. tu dis ça à toutes les voisines ?"]
          },
          {
            text: "je sors jamais de chez moi, je connais personne",
            nextStepId: '2',
            interestDelta: -1,
            reactionMessages: ["ah... une vraie vie d'ermite. c'est un concept."]
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
        girlMessages: [
          "bon... en vrai je m'ennuie à mourir là",
          "j'ai une bouteille de blanc qui est au frais depuis hier et je me vois pas la descendre toute seule devant un documentaire sur les loutres",
          "t'as quoi de prévu là ? j'ai bien envie de passer mais je teste toujours mes voisins avant 😏"
        ],
        visualPrompt: `${LEA_BASE}, holding a bottle of wine, looking playful and inviting`,
        choices: [
          {
            text: "un test ? je suis prêt. balance ton défi 😏",
            nextStepId: 'wifi_challenge',
            interestDelta: 1,
            reactionMessages: ["j'aime cette assurance !"]
          },
          {
            text: "si c'est un test de QI, je suis mal barré 💀",
            nextStepId: 'wifi_challenge',
            interestDelta: 1,
            reactionMessages: ["t'inquiète, c'est plus une question d'observation..."]
          }
        ]
      },

      // ── DÉFI 1 : WiFi ──────────────────────────────────────────────────────
      'wifi_challenge': {
        id: 'wifi_challenge',
        girlMessages: [
          "Ok, le défi est simple : on est voisins, donc tu captes forcément mon WiFi.",
          "Trouve le nom exact de mon réseau. Si tu y arrives, je débarque avec la bouteille.",
          "Petit indice : j'ai pas cherché très loin pour le nom... c'est très 'moi'. 😏",
          "(Indice : quitte l'appli et regarde tes Réglages WiFi)"
        ],
        visualPrompt: `${LEA_BASE}, pointing at her phone, mocking expression`,
        inputType: 'text',
        expectedAnswer: 'WiFi-de-Lea',
        wrongAnswerMessages: [
          "Nop, c'est pas ça du tout ! Cherche encore...",
          "Toujours pas... t'es sûr que t'es doué avec la technologie ? 😂",
          "Indice : ça commence par 'WiFi' et y'a mon prénom dedans."
        ],
        choices: [
          {
            text: "J'ai trouvé ! C'est :",
            nextStepId: 'filler_wifi',
            interestDelta: 2,
            reactionMessages: ["Incroyable ! T'es vraiment un stalker de compétition mdr 😂"]
          }
        ]
      },
      'filler_wifi': {
        id: 'filler_wifi',
        girlMessages: [
          "t'es observateur dis donc... j'aurais pas cru ça d'un mec avec un casque vissé sur les oreilles 24/7",
          "j'aime bien les gens qui remarquent les détails. c'est rare.",
          "bon. t'as chaud pour la suite ? parce que c'est loin d'être fini 😏"
        ],
        choices: [
          {
            text: "t'as encore des munitions ? je suis impressionné 😏",
            nextStepId: 'film_rebus',
            interestDelta: 1
          },
          {
            text: "j'observe ce qui en vaut la peine 😏",
            nextStepId: 'film_rebus',
            interestDelta: 1,
            reactionMessages: ["ouuuh la réplique... t'as répété ? 😂"]
          },
          {
            text: "j'avais juste pas trop le choix là",
            nextStepId: 'film_rebus',
            interestDelta: 0,
            reactionMessages: ["pfff la modestie forcée c'est vraiment nul 😂"]
          }
        ]
      },

      // ── DÉFI 2 : Rébus emoji (chat) ────────────────────────────────────────
      'film_rebus': {
        id: 'film_rebus',
        girlMessages: [
          "défi n°2. je t'envoie un rébus emoji :",
          "🦁 👑",
          "c'est mon préféré depuis que j'ai 6 ans. t'as une chance ?"
        ],
        inputType: 'text',
        expectedAnswer: 'le roi lion',
        wrongAnswerMessages: [
          "Nope... regarde bien les emojis 🤔",
          "Un lion + une couronne... c'est pas si dur 👑",
          "Indice : J'adore les classiques de chez Disney"
        ],
        choices: [
          {
            text: "Le Roi Lion !",
            nextStepId: 'filler_film',
            interestDelta: 2,
            reactionMessages: ["ENFIN quelqu'un qui a eu une enfance 🦁", "bon... t'as validé le niveau 2"]
          }
        ]
      },
      'filler_film': {
        id: 'filler_film',
        girlMessages: [
          "Le Roi Lion c'est quand même une leçon de vie si on réfléchit bien",
          "Simba qui fuit pendant des années alors qu'il doit juste assumer... c'est tellement 20-30 ans comme comportement 😂",
          "t'as un film d'enfance toi ?"
        ],
        choices: [
          {
            text: "Ratatouille. un rat cuisinier c'est mon alter-ego 💀",
            nextStepId: 'lea_rebus_setup',
            interestDelta: 2,
            reactionMessages: ["RATATOUILLE 💀 tellement soulagée que ce soit pas Fast & Furious"]
          },
          {
            text: "là tu fais de la psychologie de comptoir ou c'est volontaire ?",
            nextStepId: 'lea_rebus_setup',
            interestDelta: 1,
            reactionMessages: ["totalement volontaire et j'assume 😂"]
          },
          {
            text: "j'en avais pas vraiment...",
            nextStepId: 'lea_rebus_setup',
            interestDelta: -1,
            reactionMessages: ["...ah. on va régler ça un jour."]
          }
        ]
      },

      // ── DÉFI 3 : Rébus photos → Paris ──────────────────────────────────────
      'lea_rebus_setup': {
        id: 'lea_rebus_setup',
        girlMessages: [
          "défi n°3. je viens de te partager un album photo.",
          "y'a un rébus dedans... si tu devines ma ville de naissance, je t'offre l'apéro demain. 🥂",
          "(Indice : quitte le chat et va voir dans ton app Photos)"
        ],
        visualPrompt: `${LEA_BASE}, smiling playfully, holding her chin`,
        inputType: 'text',
        expectedAnswer: 'paris',
        wrongAnswerMessages: [
          "Nope ! Regarde bien les deux photos dans l'album...",
          "Un indice ? Le rébus est phonétique. 👣 + 🍚",
          "C'est la capitale de la France, quand même ! 😂"
        ],
        choices: [
          {
            text: "C'est Paris !",
            nextStepId: 'filler_paris',
            interestDelta: 2,
            reactionMessages: ["BIEN JOUÉ ! T'es plus malin que t'en as l'air... 😏"]
          }
        ]
      },
      'filler_paris': {
        id: 'filler_paris',
        girlMessages: [
          "Paris... j'y suis née mais on a déménagé quand j'avais 6 ans",
          "j'ai gardé deux trucs en mémoire : l'odeur de la Seine et le bruit du métro la nuit",
          "tu connais bien ?"
        ],
        choices: [
          {
            text: "j'y suis allé une fois. j'ai surtout retenu les prix des cafés 💀",
            nextStepId: 'gps_challenge',
            interestDelta: 1,
            reactionMessages: ["haha vérité universelle"]
          },
          {
            text: "un peu. surtout le Marais le soir",
            nextStepId: 'gps_challenge',
            interestDelta: 1
          },
          {
            text: "non, mais j'aimerais qu'on m'y emmène 😏",
            nextStepId: 'gps_challenge',
            interestDelta: 2,
            reactionMessages: ["intéressant... on verra si tu mérites le guide 😏"]
          }
        ]
      },

      // ── DÉFI 4 : GPS → Maps app ────────────────────────────────────────────
      'gps_challenge': {
        id: 'gps_challenge',
        girlMessages: [
          "défi n°4 et c'est le plus romantique 🌙",
          "48°51'29\" N, 2°17'40\" E",
          "c'est là où j'aimerais qu'on se retrouve un soir.",
          "(ouvre ton app Plans pour trouver l'endroit)"
        ],
        inputType: 'text',
        expectedAnswer: 'tour eiffel',
        wrongAnswerMessages: [
          "C'est pas ça... t'as ouvert Maps ? 🗺️",
          "Toujours pas... ça brille la nuit et ça fait des selfies moches ✨",
          "Le monument le plus connu de Paris... allez 😂"
        ],
        choices: [
          {
            text: "La Tour Eiffel !",
            nextStepId: 'filler_gps',
            interestDelta: 2,
            reactionMessages: ["Voilà ! Je savais que t'étais romanesque 🌙"]
          }
        ]
      },
      'filler_gps': {
        id: 'filler_gps',
        girlMessages: [
          "j'y suis allée à minuit une fois avec des amis",
          "on a raté le dernier RER au retour... on a fini à pied jusqu'à 4h du mat 💀",
          "ça reste un des meilleurs souvenirs que j'ai. c'est con non ?",
          "attends... j'ajoute un truc dans l'album. vas voir 😏"
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
          "si tu arrives à lire ce que j'ai écrit... j'arrive dans 5 minutes 🚪"
        ],
        inputType: 'text',
        expectedAnswer: 'entre',
        wrongAnswerMessages: [
          "T'es sûr ? Regarde bien le post-it dans l'album...",
          "Indice : retourne-le dans ta tête 🪞",
          "5 lettres, un impératif... c'est ce que tu veux que je fasse non ? 😂"
        ],
        choices: [
          {
            text: "J'ai lu : ENTRE",
            nextStepId: '3',
            interestDelta: 3,
            reactionMessages: ["Hahaha enfin !! J'arrive j'arrive... 😂"]
          }
        ]
      },

      // ── SUITE DE L'HISTOIRE ────────────────────────────────────────────────
      '3': {
        id: '3',
        girlMessages: [
          "écoute... mon appart est un peu en chantier, je suis en plein milieu d'un tri de fringues",
          "ça te chauffe pas plutôt de me faire visiter le tien ? je suis curieuse de voir si c'est aussi rangé que ce que ton profil laisse penser ✨",
          "je peux être là dans 30 secondes chrono"
        ],
        visualPrompt: `${LEA_BASE}, standing up, looking at her messy room, laughing`,
        choices: [
          {
            text: "vendu. mais je te préviens, si tu juges ma collec de mugs ou mon désordre, je te confisque ton verre",
            nextStepId: '4',
            interestDelta: 1,
            reactionMessages: ["promis, je serai d'une indulgence totale (ou pas)"]
          },
          {
            text: "30 secondes ? t'es déjà devant ma porte ou quoi ? t'es flippante Léa 💀",
            nextStepId: '4',
            interestDelta: 1,
            reactionMessages: ["25 secondes maintenant... dépêche-toi d'ouvrir !"]
          },
          {
            text: "ma porte est ouverte. fais comme chez toi, le vin est déjà servi 😏",
            nextStepId: '4',
            interestDelta: 2,
            reactionMessages: ["quelle efficacité... j'arrive"]
          },
          {
            text: "euh... c'est un peu rapide non ?",
            nextStepId: 'END',
            interestDelta: -5,
            reactionMessages: ["ah... ok. désolée d'avoir été spontanée. je retourne à mes loutres 🙄"]
          }
        ]
      },
      '4': {
        id: '4',
        girlMessages: [
          "bon j'y suis... je suis devant ta porte",
          "j'ai le trac mdr c'est débile",
          "tu m'ouvres ou je repars en courant comme une gamine de 15 ans ? 🫠"
        ],
        visualPrompt: `${LEA_BASE}, standing in the hallway, looking at a door, nervous smile`,
        choices: [
          {
            text: "(ouvrir la porte avec ton plus beau sourire) salut la ninja. entre, te sauve pas",
            nextStepId: '5',
            interestDelta: 1,
            reactionMessages: ["pfiou... j'ai failli faire demi-tour. t'es encore mieux en vrai 😏"]
          },
          {
            text: "le mot de passe c'est : 'le voisin du 3e est un génie'",
            nextStepId: '5',
            interestDelta: 1,
            reactionMessages: ["dans tes rêves ! mais je vais le dire juste parce que j'ai soif"]
          },
          {
            text: "attend j'ai pas fini de cacher mes cadavres sous le lit ! 💀",
            nextStepId: '5',
            interestDelta: 1,
            reactionMessages: ["si ils sentent pas trop fort, ça me va"]
          },
          {
            text: "laisse la bouteille devant la porte et on continue par sms 😏",
            nextStepId: '5',
            interestDelta: 2,
            reactionMessages: ["t'as pas honte ? allez ouvre !"]
          }
        ]
      },
      '5': {
        id: '5',
        isPhysical: true,
        girlMessages: [
          "bon... ton appart a survécu à mon inspection",
          "c'est pas mal ici en fait. on s'y sent bien",
          "et ton vin est... attend c'est moi qui l'ai ramené, donc il est forcément incroyable mdr",
          "dis... tu penses quoi de moi maintenant que je suis plus juste une photo sur ton écran ? 😏"
        ],
        visualPrompt: `${LEA_BASE}, sitting on your couch, holding a glass, looking at you intensely`,
        choices: [
          {
            text: "je pense que la photo rendait pas hommage à tes yeux... et à ton audace 😏",
            nextStepId: '6',
            interestDelta: 2,
            reactionMessages: ["oula... ça commence fort. tu veux me faire rougir ?"]
          },
          {
            text: "je pense que tu parles beaucoup trop mais que c'est plutôt mignon",
            nextStepId: '6',
            interestDelta: 1,
            reactionMessages: ["hé ! c'est le vin qui me rend bavarde, normalement je suis hyper mystérieuse ✨"]
          },
          {
            text: "je préférais la photo, elle répondait pas quand je la vannais 💀",
            nextStepId: '6',
            interestDelta: 1,
            reactionMessages: ["pfff... t'es insupportable mdr"]
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
        girlMessages: [
          "en vrai j'ai bien fait de swiper ce soir",
          "ça change des mecs qui te parlent de leur collection de NFT ou de leur séance de crossfit",
          "tu fais quoi si je décide de pas repartir tout de suite ? t'as un plan pour m'occuper ou je dois improviser ? 😏"
        ],
        visualPrompt: `${LEA_BASE}, leaning back on the couch, looking relaxed and radiant`,
        choices: [
          {
            text: "j'ai quelques idées, mais je préfère voir tes talents d'improvisation... j'aime les surprises 😏",
            nextStepId: '7',
            interestDelta: 2,
            reactionMessages: ["ah ouais ? tu joues à ça ? ok... on va voir si t'assumes"]
          },
          {
            text: "on pourrait regarder un film, mais je sens qu'on va pas beaucoup regarder l'écran",
            nextStepId: '7',
            interestDelta: 2,
            reactionMessages: ["je crois que t'as tout compris voisin... ✨"]
          },
          {
            text: "je peux t'apprendre à jouer au tarot, c'est passionnant",
            nextStepId: '7',
            interestDelta: -1,
            reactionMessages: ["le tarot ? sérieusement ? t'es un petit vieux en fait mdr"]
          },
          {
            text: "si tu restes, c'est toi qui fais la vaisselle demain matin 👀",
            nextStepId: '7',
            interestDelta: 2,
            reactionMessages: ["demain matin ? monsieur se projette... j'aime bien l'idée 😏"]
          }
        ]
      },
      '7': {
        id: '7',
        isPhysical: true,
        girlMessages: [
          "bon... on va peut-être poser les téléphones alors",
          "merci pour l'accueil, voisin 😏"
        ],
        visualPrompt: `${LEA_BASE}, very close, looking into the eyes, romantic lighting`,
        choices: [
          {
            text: "(se rapprocher d'elle) de rien, Léa...",
            nextStepId: 'victory_reward',
            interestDelta: 2,
            reactionMessages: ["... 😏"]
          }
        ]
      },
      'victory_reward': {
        id: 'victory_reward',
        girlMessages: [
          "Attends, avant que j'oublie...",
          "Puisque tu as été un voisin exemplaire (et plutôt doué pour le WiFi), je t'envoie ça.",
          "C'est pour ton 'fond d'écran', tu diras. 😏",
          "On se voit demain ?"
        ],
        visualPrompt: `${LEA_BASE}, wearing a white silk tank top, sitting on her bed, messy hair, flirty smile, looking at camera, intimate atmosphere, 8k resolution, highly detailed skin texture, sharp focus, masterpiece`,
        choices: [
          {
            text: "Je crois que je vais avoir du mal à dormir... À demain Léa ✨",
            nextStepId: 'END',
            interestDelta: 5
          }
        ]
      }
    }
  },
  teacher_intro: {
    id: 'teacher_intro',
    title: 'La Prof',
    startStepId: '0',
    steps: {
      '0': {
        id: '0',
        girlMessages: ["Scénario de la prof en cours d'écriture..."],
        choices: [{ text: "À suivre...", nextStepId: 'END', interestDelta: 1 }]
      }
    }
  },
  colleague_intro: {
    id: 'colleague_intro',
    title: 'La Collègue',
    startStepId: '0',
    steps: {
      '0': {
        id: '0',
        girlMessages: ["Scénario de la collègue en cours d'écriture..."],
        choices: [{ text: "À suivre...", nextStepId: 'END', interestDelta: 1 }]
      }
    }
  }
};
