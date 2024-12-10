const fs = require("fs");
const path = require("path");

// Lire le fichier TSV
const tsvFilePath = "keywords.tsv000.tsv";
const jsonFilePath = "keywords.json";

fs.readFile(tsvFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier TSV:", err);
    return;
  }

  // Séparer les lignes
  const lines = data.trim().split("\n");

  // Extraire les en-têtes
  const headers = lines[0].split("\t");

  // Transformer les lignes en objets JSON
  const jsonData = lines.slice(1).map((line) => {
    const values = line.split("\t");
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] || null;
      console.log(index); // Ajouter une valeur null si elle est absente
    });
    return entry;
  });

  // Écrire le fichier JSON
  fs.writeFile(
    jsonFilePath,
    JSON.stringify(jsonData, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JSON:", err);
      } else {
        console.log(`Le fichier ${jsonFilePath} a été généré avec succès.`);
      }
    }
  );
});
