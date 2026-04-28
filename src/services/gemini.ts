import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// On initialise l'instance Gemini si la clé API est disponible dans le .env.local
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateCharacterResponse = async (
  characterName: string, 
  context: string, 
  playerMessage: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = []
) => {
  if (!genAI) {
    console.error("Clé API Gemini (VITE_GEMINI_API_KEY) non trouvée.");
    return "Je ne peux pas répondre pour le moment... (API Key manquante)";
  }

  try {
    // Utilisation de gemini-2.0-flash (dernière version rapide et gratuite)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: `Tu es le moteur narratif et visuel du jeu LoveLoop.
Personnage actuel: ${characterName}
Contexte: ${context}

TES MISSIONS:
1. Réponses Chat: Courtes, naturelles, style SMS, émojis autorisés.
2. Descriptions Visuelles: Si on te demande de générer une image, décris-la de manière ultra-détaillée et réaliste (style photographie, éclairage, vêtements, expression).`
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(playerMessage);
    return result.response.text();
  } catch (error) {
    console.error("Erreur avec l'API Gemini:", error);
    return "J'ai un petit souci de réseau... 😅";
  }
};

/**
 * Génère une image via Imagen 3 (Google AI)
 * Retourne une string base64 pour l'affichage direct
 */
export const generateImage = async (prompt: string) => {
  if (!apiKey) {
    console.error("Clé API Google non trouvée.");
    return null;
  }

  try {
    // Utilisation de Imagen 4 Fast pour réduire les coûts
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "9:16", // Format smartphone idéal pour LoveLoop
        }
      })
    });

    const data = await response.json();
    
    // Imagen renvoie souvent l'image en base64 dans prediction.bytes ou prediction.imageBytes
    if (data.predictions && data.predictions[0]) {
      const bytes = data.predictions[0].bytes || data.predictions[0].imageBytes;
      return `data:image/jpeg;base64,${bytes}`;
    }
    
    // Fallback si le format est différent (selon les versions d'API)
    return null;
  } catch (error) {
    console.error("Erreur génération image Google:", error);
    return null;
  }
};
