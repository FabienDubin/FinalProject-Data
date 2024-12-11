const fs = require("fs");

try {
  // Lecture et parsing du fichier source
  const rawUsers = JSON.parse(fs.readFileSync("./rawUsers.json", "utf8"));

  // Vérification que rawUsers est un tableau
  if (!Array.isArray(rawUsers)) {
    throw new Error("Le fichier rawUsers.json ne contient pas un tableau.");
  }

  const fakeUsers = [];

  // Transformation des données
  for (const user of rawUsers) {
    // Vérifie que la structure attendue est correcte
    if (!user.name?.first || !user.name?.last || !user.picture?.medium) {
      console.warn("Utilisateur ignoré car structure invalide :", user);
      continue; // Passe à l'utilisateur suivant si structure invalide
    }

    fakeUsers.push({
      email: `${user.name.first.toLowerCase()}.${user.name.last.toLowerCase()}@fakeuser.com`,
      username: `${user.name.first} ${user.name.last}`,
      password: `${user.name.first}@1234`,
      image: user.picture.medium,
      isFakeUser: true,
    });
  }

  // Écriture dans un nouveau fichier
  fs.writeFileSync("./fakeUsers.json", JSON.stringify(fakeUsers, null, 2));
  console.log("Fichier fakeUsers.json généré avec succès.");
} catch (err) {
  console.error("Une erreur est survenue :", err.message);
}
