const fs = require("fs");

// Lire les fichiers JSON
const dbWithColors = JSON.parse(
  fs.readFileSync("db_with_colors.json", "utf-8")
);
const keywordsDB = JSON.parse(fs.readFileSync("keywords.json", "utf-8"));

// Créer un mapping des mots-clés par photo_id
const keywordsMap = {};

keywordsDB.forEach((keyword) => {
  if (!keywordsMap[keyword.photo_id]) {
    keywordsMap[keyword.photo_id] = [];
  }
  keywordsMap[keyword.photo_id].push(keyword.keyword);
});

// Ajouter les mots-clés à chaque document de db_with_colors.json
const finalDB = dbWithColors.map((photo) => {
  const photoId = photo.photo_id;
  photo.keywords = keywordsMap[photoId] || []; // Ajoute les mots-clés ou un tableau vide si aucun mot-clé n'existe
  console.log(photoId);
  return photo;
});

// Sauvegarder la nouvelle collection dans un fichier finaldb.json
fs.writeFileSync("finaldb.json", JSON.stringify(finalDB, null, 2), "utf-8");

console.log("La collection finaldb.json a été générée avec succès.");
