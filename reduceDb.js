const fs = require("fs");

const inputFile = "./finaldb.json";
const outputFile = "./imageDb15K.json";
const limit = 15000;

// Lire le fichier finaldb.json
fs.readFile(inputFile, "utf-8", (err, data) => {
  if (err) {
    console.error(`Erreur lors de la lecture du fichier ${inputFile}:`, err);
    return;
  }

  try {
    // Parser le JSON
    const db = JSON.parse(data);

    // Vérifier que le fichier contient bien un tableau
    if (!Array.isArray(db)) {
      throw new Error("Le contenu de finaldb.json n'est pas un tableau.");
    }

    // Sélectionner les 15 000 premiers documents
    const first15K = db.slice(0, limit);

    // Écrire dans le fichier imageDb15K.json
    fs.writeFile(
      outputFile,
      JSON.stringify(first15K, null, 2),
      "utf-8",
      (writeErr) => {
        if (writeErr) {
          console.error(
            `Erreur lors de l'écriture du fichier ${outputFile}:`,
            writeErr
          );
          return;
        }
        console.log(
          `Les ${limit} premiers documents ont été enregistrés dans ${outputFile}.`
        );
      }
    );
  } catch (parseErr) {
    console.error("Erreur lors du parsing du JSON:", parseErr);
  }
});
