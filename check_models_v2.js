const apiKey = 'AIzaSyBZz_W-01QJCx1NlnrW5jo5SvZHqt9gPu4';

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    if (data.models) {
      console.log("MODÈLES DISPONIBLES :");
      data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error(e);
  }
}

listModels();
