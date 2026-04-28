# Guide de Composition et Stabilité Anatomique

Ce document explique comment éviter les erreurs classiques de l'IA (membres en trop, visages flous) lors de la génération de plans larges.

## Pourquoi l'IA hallucine-t-elle ?

Les modèles d'image (comme SDXL ou Flux) sont souvent entraînés sur des images carrées ou 4:5. Lorsque l'on demande un format 9:16 (très vertical) :
- L'IA ne sait pas comment remplir le "vide" en bas de l'image.
- Elle a tendance à redessiner un deuxième bassin, une deuxième paire de jambes ou à allonger le torse de manière irréelle.

## Solutions Techniques

### 1. Le "Power Cadrage" : 3/4 Shot
Le plan "Américain" ou "3/4" (coupé à mi-cuisse ou au genou) est le plus stable. 
- **Bénéfice :** Il occupe suffisamment d'espace vertical pour satisfaire l'IA sans laisser de vide suspect.
- **Détails :** Le visage reste assez grand pour être net et détaillé.

### 2. Éviter les Poses "Contorsionnistes"
Certaines descriptions provoquent des bugs de structure :
- **À Éviter :** "Regarde par-dessus son épaule en étant allongée", "S'étire les bras vers le haut en étant de dos". Ces poses créent des bras qui sortent du ventre ou du dos.
- **À Privilégier :** Poses "ancrées" (assise sur un rebord, debout face à la lumière, appuyée contre un mur).

### 3. Gestion de la Distance
- **Portrait :** Détails peau/yeux maximum. Zéro erreur anatomique.
- **3/4 Shot :** Bon équilibre. Silhouette visible, visage net.
- **Full Body :** Dangereux. Risque de "4 bras" élevé et visage souvent flou ou générique. 
  *Conseil : N'utilisez le Full Body que pour des poses très simples (debout, bras le long du corps).*

## Paramètres de Rendu
Toujours spécifier ces dimensions pour une stabilité optimale :
- `width=1080`
- `height=1440` (Ratio 3:4) ou `height=1600` (Ratio 2:3).
- Éviter `height=1920` sauf pour des portraits très simples.
