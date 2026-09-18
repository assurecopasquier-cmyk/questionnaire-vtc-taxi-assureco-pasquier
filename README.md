# ASSURÉCO

Site vitrine et parcours de demandes de devis pour le cabinet ASSURÉCO.

## Structure

- `index.html` : structure, SEO, sections juridiques et contenus accessibles.
- `styles.css` : design responsive et états d’interaction.
- `script.js` : catalogue des services, rendu des 19 questionnaires et envoi via Netlify Forms.
- `netlify.toml` : publication Netlify et en-têtes de sécurité.
- `robots.txt` et `sitemap.xml` : ressources d’exploration.
- `assets/laurent.jpg` : photographie fournie par le site public existant.
- `backup/ancienne-version-2026-09-11/` : sauvegarde locale de la version publiée avant la refonte.

## Déploiement

Le dépôt peut être publié comme site statique avec le dossier racine comme répertoire de publication.

Avant mise en ligne définitive :

1. Vérifier dans Netlify que la détection des formulaires est activée après le déploiement, puis ajouter une notification e-mail vers `assureco49@wanadoo.fr` pour chacun des formulaires `assureco-contact`, `assureco-rappel` et `assureco-devis`. Les formulaires fournissent déjà un sujet contextualisé.
2. Effectuer des soumissions fictives sans fichier, avec un petit PDF puis avec une photo ; vérifier chaque enregistrement dans Netlify Forms et récupérer les fichiers depuis les liens de soumission ou de notification.
3. Respecter la limite Netlify de 8 Mo par requête : l’interface limite à un fichier de 7 Mo maximum, en PDF, JPG, JPEG ou PNG.
4. Faire valider la mise à jour de la politique de confidentialité, les durées de conservation, l’hébergeur et la procédure de médiation par le cabinet. Netlify recommande une protection dédiée pour les téléversements contenant des données personnelles sensibles.
5. Fournir les URLs officielles des réseaux sociaux pour remplacer le message d’attente du pied de page.
