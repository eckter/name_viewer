Un petit outil maison pour aider les futurs parents à choisir un prénom, avec des stats sur la France.

Les données sont statiques, elles viennent majoritairement de l'insee [ici](https://www.insee.fr/fr/statistiques/8595130?sommaire=8595113).
Avec du pré-traitement en python, notamment un filtre qui exclue les prénoms trop rares.
La prononciation vient d'un LLM, des erreurs sont possibles.

Disclaimer : c'est principalement pour une utilisation personnelle, et c'est vibe-codé à environ 80%

### Comment lancer

```bash
npm install
npm run start
```

C'est pas (encore?) hébergé et accessible immédiatement.

---

### Utilisation

Une page de prénom ressemble à ça :

<img width="739" height="825" alt="image" src="https://github.com/user-attachments/assets/748b028b-9496-49ff-a6fc-3a3cb0ae23a6" />


#

En cliquant sur "accepter" ou "refuser" (accessible au clavier avec A et R), le choix est enregistré et on passe à un nouveau prénom aléatoire pas encore enregistré.

La page "/liste" (accessible en haut d'une page de prénom) donne la liste des prénoms acceptés ou refusés, et permet de configurer les sélections (notamment sur le genre).
