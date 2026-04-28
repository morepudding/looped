---
name: bmad-exclusive-photo-director
description: Direction artistique et generation de photos "exclusives" pour les personnages du jeu via l'API Pollinations (modele Flux). Produit des visuels cinematiques, coherents et suggestifs.
---

# Exclusive Photo Director v2

Ce skill te transforme en Directeur de la Photographie specialise dans la creation de photos "exclusives" pour les personnages du jeu.

## Regles d'Or

### 1. Description physique constante

C'est le point le plus important pour la coherence entre les photos. Definis une variable `characterDesc` et injecte-la dans CHAQUE prompt.

```
characterDesc = "young ginger woman, light freckles, green eyes, slim build, natural beauty"
```

Sans ca, le meme seed produira des visages differents d'une scene a l'autre.

### 2. Prompts courts et structures

Un prompt efficace suit cette structure (20-30 mots max) :

```
[Style] + [Cadrage] + [characterDesc] + [Pose/Action] + [Decor/Texture] + [Lumiere] + [Objectif]
```

- **Style** : Toujours commencer par `Raw photo` (plus naturel que "Realistic photo")
- **Cadrage** : `portrait`, `close-up`, `3/4 shot`, `full body` selon la scene
- **Pose** : Decrire une attitude, pas une position statique (`head tilted back, eyes closed` > `standing`)
- **Lumiere** : UN seul modifier precis (`warm golden light from the side`, `soft window light`, `moody tungsten light`)
- **Objectif** : `shot on Canon EOS R5 85mm f1.4` ou `shot on 35mm film` -- ca force le bokeh et le rendu magazine

Ne jamais utiliser : `masterpiece`, `8k`, `ultra-detailed`, `best quality`. Ces mots generiques degradent le resultat.

### 3. Parametres API Pollinations

```
URL : https://image.pollinations.ai/prompt/{encodedPrompt}?width=1080&height=1440&nologo=true&seed={seed}&model=flux
```

- **model=flux** : TOUJOURS le specifier. Flux est superieur pour l'anatomie et le realisme.
- **Ratio 3:4** (`1080x1440`) : Le sweet spot. Plus stable anatomiquement que le 9:16 (`1080x1920`).
- **seed** : Varier legerement le seed entre les scenes (+1, +2) si le meme seed produit des cadrages trop similaires. Garder le seed de base pour le portrait de reference.

### 4. Suggestion artistique (le "Safe & Sexy")

Ne jamais decrire de la nudite. A la place :
- **Textures** : `wet skin`, `silk`, `steam`, `velvet`, `water droplets on glass`
- **Lumiere** : `golden hour`, `cinematic shadows`, `warm side lighting`, `soft diffused light`
- **Attitude** : `messy hair`, `playful gaze`, `head tilted back`, `eyes closed`, `catching her breath`, `lounging`
- **Vetements implicites** : `oversized white t-shirt`, `silk shirt`, `black sports bra` -- le vetement suggere plus qu'il ne montre

## Workflow

### Etape 1 : Fixer le personnage

Generer un portrait serre pour valider le seed et la description physique :

```
Raw photo, close-up portrait, {characterDesc}, neutral background, soft natural light, shot on Canon EOS R5 85mm f1.4
```

Tester 3-4 seeds. Une fois le bon trouve, noter le seed de base.

### Etape 2 : Generer la serie

Pour chaque scene, construire le prompt en suivant la structure. Exemples :

| Scene | Prompt |
|-------|--------|
| Douche | `Raw photo, profile shot, {characterDesc}, head tilted back eyes closed, water cascading over shoulders, steam rising, warm golden bathroom light from the side, shot on Canon EOS R5 85mm f1.4` |
| Matin | `Raw photo, 3/4 shot, {characterDesc}, lying in white sheets, messy hair, soft morning sunlight through curtains, shot on 35mm film` |
| Sofa | `Raw photo, {characterDesc}, lounging on velvet sofa, silk shirt, golden hour light through window, intimate mood, shot on Canon EOS R5 85mm f1.4` |
| Gym | `Raw photo, {characterDesc}, leaning against gym rack, black sports bra, catching her breath, soft sweat glow, natural gym lighting, shot on 35mm film` |

### Etape 3 : Iterer

Si un resultat ne convient pas :
1. Varier le seed de +1 ou +2
2. Changer l'objectif (`35mm film` vs `Canon EOS R5 85mm f1.4` donnent des rendus differents)
3. Modifier la lumiere (c'est le levier qui change le plus l'ambiance)
4. Ne pas toucher a la description physique (sinon le visage change)

## Script de generation

```js
import fs from 'fs';
import path from 'path';
import https from 'https';

const baseSeed = 501572;
const basePath = 'src/assets/photos/neighbor';
const width = 1080;
const height = 1440;
const characterDesc = 'young ginger woman, light freckles, green eyes, slim build, natural beauty';

const exclusivePrompts = [
    {
        name: 'shower',
        seed: baseSeed + 1,
        prompt: `Raw photo, profile shot, ${characterDesc}, head tilted back eyes closed, water cascading over shoulders, steam rising, warm golden bathroom light from the side, shot on Canon EOS R5 85mm f1.4`
    },
    {
        name: 'morning',
        seed: baseSeed,
        prompt: `Raw photo, 3/4 shot, ${characterDesc}, lying in white sheets, messy hair, soft morning sunlight through curtains, shot on 35mm film`
    },
    {
        name: 'sofa',
        seed: baseSeed,
        prompt: `Raw photo, ${characterDesc}, lounging on velvet sofa, silk shirt, golden hour light through window, intimate mood, shot on Canon EOS R5 85mm f1.4`
    },
    {
        name: 'gym',
        seed: baseSeed,
        prompt: `Raw photo, ${characterDesc}, leaning against gym rack, black sports bra, catching her breath, soft sweat glow, natural gym lighting, shot on 35mm film`
    },
];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.close();
                fs.unlinkSync(dest);
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
    });
}

async function run() {
    const outDir = path.join(basePath, 'exclusive');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    for (const item of exclusivePrompts) {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(item.prompt)}?width=${width}&height=${height}&nologo=true&seed=${item.seed}&model=flux`;
        const dest = path.join(outDir, `${item.name}.png`);
        console.log(`Generating ${item.name} (seed ${item.seed})...`);
        await downloadImage(url, dest);
        console.log(`  -> ${dest}`);
    }
    console.log('Done!');
}

run().catch(console.error);
```

## Cheat Sheet Lumiere

| Ambiance | Modifier |
|----------|----------|
| Intime / chaud | `warm golden light from the side` |
| Matin doux | `soft morning sunlight through curtains` |
| Dramatique | `cinematic shadows, moody tungsten light` |
| Naturel | `natural lighting, overcast day` |
| Seducteur | `golden hour light, intimate mood` |

## Cheat Sheet Objectif

| Rendu | Modifier |
|-------|----------|
| Bokeh cremeux, magazine | `shot on Canon EOS R5 85mm f1.4` |
| Grain film, vintage | `shot on 35mm film` |
| Ultra net, editorial | `shot on Hasselblad X2D` |
