---
name: bmad-exclusive-photo-director
description: Expertise en direction artistique et génération de photos "exclusives" pour les personnages. Utilise des techniques de prompt engineering avancées (Flux, Prompts minimalistes, 3/4 shots) pour créer des visuels suggestifs, réalistes et anatomiquement corrects.
---

# Exclusive Photo Director 📸

Ce skill transforme Gemini CLI en un Directeur de la Photographie spécialisé dans la création d'assets visuels "haut de gamme" pour les personnages du jeu.

## Principes Fondamentaux

### 1. La Règle d'Or : "Less is More"
Plus un prompt est chargé de mots techniques (`masterpiece`, `8k`, `ultra-detailed`), plus l'IA risque de s'embrouiller et de générer des membres en trop (bras/jambes fantômes). 
- **Action :** Privilégier des prompts courts (15-20 mots max).
- **Style :** Utiliser `Raw photo` ou `Realistic photo` en début de prompt pour un rendu naturel.

### 2. Maîtrise de l'Anatomie
Les formats très verticaux (9:16) provoquent souvent des hallucinations (doubles corps).
- **Cadrage recommandé :** Utiliser le **3/4 shot** (plan s'arrêtant aux genoux).
- **Ratio stable :** Préférer `1080x1600` ou `1080x1440` au `1080x1920`.
- **Modèle :** Toujours forcer le modèle **`flux`** via l'API Pollinations pour une stabilité anatomique supérieure.

### 3. La Suggestion Artistique
Pour créer des photos "exclusives" suggestives sans enfreindre les règles de sécurité :
- **Focus Textures :** Insister sur les matières (`silk`, `wet skin`, `steam`, `velvet`).
- **Focus Lumière :** Utiliser les ombres portées (`cinematic shadows`, `golden hour`, `moody lighting`).
- **L'Implicite :** Décrire une attitude ou un moment intime (`messy hair`, `playful gaze`, `lounging`) plutôt que la nudité.

## Workflow de Génération

1. **Validation du Visage :** Utiliser un portrait serré pour fixer le `seed` du personnage.
2. **Cadrage 3/4 :** Pour les scènes complexes (Douche, Lit, Sofa), utiliser des poses assises ou debout simples.
3. **Batch Generation :** Utiliser le script `scripts/batch_gen.js` (si disponible) pour générer toute la série d'un coup.

## Exemples de Prompts "Safe & Sexy"
- **Douche :** `Raw photo, 3/4 shot, ginger woman, wet skin, steam, cinematic lighting.`
- **Matin :** `Realistic photo, ginger woman on a messy bed, oversized white t-shirt, morning sun.`
- **Sofa :** `Raw photo, ginger woman lounging on a velvet sofa, evening shadows, intimate mood.`

---
*Note : Pour des guides de composition détaillés, consultez [references/composition-guide.md](references/composition-guide.md).*
