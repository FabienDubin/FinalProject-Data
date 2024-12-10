const fs = require("fs");

// Lire les fichiers JSON
const originalDB = JSON.parse(fs.readFileSync("./originalDB.json", "utf-8"));
const colorsDB = JSON.parse(fs.readFileSync("./colors.json", "utf-8"));

// Créer un mapping des couleurs par photo_id
const colorsMap = {};

colorsDB.forEach((color) => {
  if (!colorsMap[color.photo_id]) {
    colorsMap[color.photo_id] = [];
  }
  colorsMap[color.photo_id].push(color.hex);
});

// Ajouter les couleurs à chaque document de originalDB.json
const updatedDB = originalDB.map((photo) => {
  const photoId = photo.photo_id;
  photo.colors = colorsMap[photoId] || []; // Ajoute les couleurs ou un tableau vide si aucune couleur n'existe
  console.log("new color added to ", photoId);
  return photo;
});

// Sauvegarder la nouvelle collection dans un fichier db_with_colors.json
fs.writeFileSync(
  "db_with_colors.json",
  JSON.stringify(updatedDB, null, 2),
  "utf-8"
);

console.log("La collection db_with_colors.json a été générée avec succès.");
