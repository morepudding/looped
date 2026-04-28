import fs from 'fs';
import path from 'path';
import https from 'https';

/**
 * Script de génération groupée pour les photos exclusives.
 * Usage: node batch_gen.js <personnage> <seed> <dossier_cible>
 */

const [,, character, seed, targetFolder] = process.argv;

if (!character || !seed || !targetFolder) {
    console.log("Usage: node batch_gen.js <character_type> <seed> <target_folder>");
    console.log("Ex: node batch_gen.js ginger 501572 src/assets/photos/neighbor/exclusive");
    process.exit(1);
}

const prompts = [
    { name: 'morning', prompt: `Realistic photo, ${character} woman, lying on a bed, morning sun` },
    { name: 'shower', prompt: `Raw photo, 3/4 shot, ${character} woman, wet skin, steam, cinematic lighting` },
    { name: 'gym', prompt: `Realistic photo, ${character} woman, working out in a gym, sweat` },
    { name: 'sofa', prompt: `Realistic photo, ${character} woman sitting on a sofa, holding a coffee mug, evening light` }
];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Status: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
    });
}

async function run() {
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
    }

    console.log(`Début de la génération groupée (${character}, Seed: ${seed})...`);
    for (const item of prompts) {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(item.prompt)}?width=1080&height=1600&model=flux&seed=${seed}&nologo=true`;
        const dest = path.join(targetFolder, `${item.name}.png`);
        console.log(`Génération: ${item.name}...`);
        try {
            await downloadImage(url, dest);
        } catch (e) {
            console.error(`Erreur pour ${item.name}: ${e.message}`);
        }
    }
    console.log('Terminé !');
}

run();
