const variantName = new URLSearchParams(window.location.search).get('variant');
const isTasteVariant = variantName === 'taste' || variantName === 'taste-gradient';
const isTasteGradientVariant = variantName === 'taste-gradient';
document.documentElement.classList.toggle('taste-variant', isTasteVariant);
document.documentElement.classList.toggle('taste-gradient-variant', isTasteGradientVariant);

if (isTasteVariant) {
  document.querySelector('#a-propos')?.setAttribute('aria-labelledby', 'intro-title-taste');
  document.querySelector('#contact')?.setAttribute('aria-labelledby', 'callback-title');
  document.querySelectorAll('a[href="#politique-confidentialite"]').forEach((link) => { link.href = 'politique-confidentialite.html'; });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName)) {
      node.nodeValue = node.nodeValue.replace(/[—–]/g, ' - ');
    }
  }
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrpgjreg';

const text = (id, label, name = label, required = false, placeholder = '') => ({ id, label, name, type: 'text', required, placeholder });
const tel = (id, label, required = false) => ({ id, label, name: label, type: 'tel', required });
const email = (id, label = 'Adresse e-mail', required = false) => ({ id, label, name: label, type: 'email', required });
const date = (id, label, required = false) => ({ id, label, name: label, type: 'date', required });
const number = (id, label, required = false) => ({ id, label, name: label, type: 'number', required });
const textarea = (id, label, name = label, required = false) => ({ id, label, name, type: 'textarea', required });
const select = (id, label, options, required = false) => ({ id, label, name: label, type: 'select', options, required });

const dailyServices = [
  { id: 'q-auto', title: 'Auto', icon: '🚗', summary: 'Roulez l’esprit tranquille' },
  { id: 'q-moto', title: 'Moto', icon: '🏍️', summary: 'Votre passion en toute sécurité' },
  { id: 'q-habitation', title: 'Habitation', icon: '⌂', summary: 'Protégez ce qui compte' },
  { id: 'q-sante', title: 'Santé', icon: '♡', summary: 'Une meilleure couverture au quotidien' },
  { id: 'q-pret', title: 'Prêt', icon: '▣', summary: 'Assurez vos projets' },
  { id: 'q-vie', title: 'Vie', icon: '✦', summary: 'Pour ceux qui comptent vraiment' },
];

const specialServices = [
  { id: 'q-vtc', title: 'VTC / Taxi', icon: '🚕', summary: 'Une assurance adaptée à votre activité' },
  { id: 'q-camping', title: 'Camping-car', icon: '🚐', summary: 'Voyagez avec sérénité' },
  { id: 'q-resilie', title: 'Résilié impayés', icon: '⚠', summary: 'Une solution pour repartir' },
  { id: 'q-jeune', title: 'Jeune permis', icon: '🎓', summary: 'Démarrez dans de bonnes conditions' },
  { id: 'q-nonpaiement', title: 'Non-paiement', icon: '⚠', summary: 'Étudions votre situation' },
  { id: 'q-temporaire', title: 'Temporaire', icon: '◷', summary: 'Une couverture pour la bonne durée' },
  { id: 'q-flotte', title: 'Flotte auto', icon: '▤', summary: 'Des solutions pour votre entreprise' },
  { id: 'q-collection', title: 'Collection', icon: '◇', summary: 'Protégez un véhicule unique' },
  { id: 'q-alcool', title: 'Alcoolémie', icon: '⌁', summary: 'Un accompagnement adapté' },
  { id: 'q-stupefiants', title: 'Stupéfiants', icon: '⌁', summary: 'Une étude attentive de votre dossier' },
  { id: 'q-sans-antecedent', title: 'Sans antécédent', icon: '✓', summary: 'Votre première assurance' },
  { id: 'q-defaut', title: 'Défaut d’assurance', icon: '×', summary: 'Reprenons votre situation' },
];

const formDefinitions = {
  'q-auto': {
    title: 'Assurance Auto', intro: 'Complétez les informations concernant votre assurance automobile.',
    groups: [
      ['Vos coordonnées', [text('auto-nom', 'Nom', 'Nom', true), text('auto-prenom', 'Prénom', 'Prénom', true), date('auto-naissance', 'Date de naissance', true), text('auto-adresse', 'Adresse complète', 'Adresse complète', true), tel('auto-telephone', 'Téléphone', true), email('auto-email', 'Adresse e-mail', true)]],
      ['Conducteur', [date('auto-permis-date', 'Date d’obtention du permis'), select('auto-permis-valide', 'Votre permis est-il valide ?', ['Sélectionnez', 'Oui', 'Non', 'Suspension ou annulation en cours']), select('auto-conduite', 'Conduite accompagnée', ['Sélectionnez', 'Oui', 'Non']), textarea('auto-autres-conducteurs', 'Autres conducteurs à assurer')]],
      ['Véhicule', [text('auto-marque', 'Marque et modèle'), text('auto-immat', 'Immatriculation'), date('auto-date-circulation', 'Date de première mise en circulation'), select('auto-usage', 'Usage principal', ['Sélectionnez', 'Privé', 'Privé et trajet travail', 'Professionnel', 'VTC ou taxi']), text('auto-kilometrage', 'Kilométrage annuel'), text('auto-stationnement', 'Lieu de stationnement')]],
      ['Antécédents', [text('auto-assureur', 'Assureur actuel ou précédent'), select('auto-releve', 'Possédez-vous un relevé d’information ?', ['Sélectionnez', 'Oui', 'Non', 'En cours de demande']), select('auto-resiliation', 'Votre contrat a-t-il été résilié ?', ['Sélectionnez', 'Non', 'Oui pour non-paiement', 'Oui pour sinistres', 'Oui pour autre motif']), textarea('auto-sinistres', 'Sinistres, infractions ou précisions')]],
    ],
  },
  'q-moto': {
    title: 'Assurance Moto', intro: 'Complétez les informations concernant votre assurance moto.',
    groups: [
      ['Vos coordonnées', [text('moto-nom', 'Nom et prénom', 'Nom et prénom', true), date('moto-naissance', 'Date de naissance'), tel('moto-tel', 'Téléphone', true), email('moto-email', 'Adresse e-mail', true), text('moto-adresse', 'Adresse')]],
      ['Conducteur et moto', [date('moto-permis', 'Date d’obtention du permis'), text('moto-experience', 'Expérience moto'), text('moto-marque', 'Marque et modèle'), text('moto-cylindree', 'Cylindrée'), text('moto-immat', 'Immatriculation'), select('moto-usage', 'Usage', ['Sélectionnez', 'Loisirs', 'Privé', 'Privé et trajet travail', 'Professionnel'])]],
      ['Historique', [text('moto-assureur', 'Assureur actuel ou précédent'), textarea('moto-sinistres', 'Sinistres ou infractions')]],
    ],
  },
  'q-habitation': {
    title: 'Assurance Habitation', intro: 'Complétez les informations concernant votre logement.',
    groups: [
      ['Vos coordonnées', [text('hab-nom', 'Nom et prénom', 'Nom et prénom', true), tel('hab-tel', 'Téléphone', true), email('hab-email', 'Adresse e-mail', true)]],
      ['Logement', [select('hab-statut', 'Vous êtes', ['Sélectionnez', 'Locataire', 'Propriétaire occupant', 'Propriétaire non occupant', 'Occupant à titre gratuit']), text('hab-adresse', 'Adresse du logement'), select('hab-type', 'Type de logement', ['Sélectionnez', 'Appartement', 'Maison', 'Studio', 'Immeuble', 'Autre']), number('hab-pieces', 'Nombre de pièces principales'), text('hab-surface', 'Surface approximative'), textarea('hab-dependances', 'Dépendances, garage ou cave'), text('hab-capital', 'Valeur approximative du mobilier')]],
      ['Garanties et historique', [textarea('hab-garanties', 'Garanties souhaitées'), textarea('hab-sinistres', 'Sinistres précédents')]],
    ],
  },
  'q-sante': {
    title: 'Mutuelle Santé', intro: 'Complétez les informations concernant votre besoin santé.',
    groups: [
      ['Vos coordonnées', [text('sante-nom', 'Nom et prénom', 'Nom et prénom', true), date('sante-naissance', 'Date de naissance'), tel('sante-tel', 'Téléphone', true), email('sante-email', 'Adresse e-mail', true)]],
      ['Besoins', [text('sante-regime', 'Régime social'), number('sante-beneficiaires', 'Nombre de bénéficiaires'), textarea('sante-besoins', 'Besoins prioritaires'), text('sante-budget', 'Budget mensuel souhaité')]],
    ],
  },
  'q-pret': {
    title: 'Assurance Prêt', intro: 'Complétez les informations concernant votre assurance emprunteur.',
    groups: [
      ['Vos coordonnées', [text('pret-nom', 'Nom et prénom', 'Nom et prénom', true), tel('pret-tel', 'Téléphone', true), email('pret-email', 'Adresse e-mail', true)]],
      ['Projet', [select('pret-type', 'Nature du projet', ['Sélectionnez', 'Résidence principale', 'Résidence secondaire', 'Investissement locatif', 'Prêt professionnel', 'Autre']), text('pret-capital', 'Capital emprunté'), text('pret-duree', 'Durée du prêt'), number('pret-emprunteurs', 'Nombre d’emprunteurs'), textarea('pret-message', 'Informations complémentaires')]],
    ],
  },
  'q-vie': {
    title: 'Assurance Vie', intro: 'Complétez les informations concernant votre projet d’assurance vie.',
    groups: [
      ['Vos coordonnées', [text('vie-nom', 'Nom et prénom', 'Nom et prénom', true), date('vie-naissance', 'Date de naissance'), tel('vie-tel', 'Téléphone', true), email('vie-email', 'Adresse e-mail', true)]],
      ['Projet', [select('vie-objectif', 'Objectif principal', ['Sélectionnez', 'Épargne', 'Transmission', 'Préparation de la retraite', 'Protection de la famille', 'Autre']), text('vie-montant', 'Montant envisagé'), select('vie-versements', 'Type de versements', ['Sélectionnez', 'Versement unique', 'Versements réguliers', 'Versement unique et réguliers']), textarea('vie-message', 'Votre projet')]],
    ],
  },
  'q-vtc': {
    title: 'Assurance VTC / Taxi', intro: 'Complétez les informations concernant votre activité VTC ou taxi.',
    groups: [
      ['Coordonnées et entreprise', [text('vtc-nom', 'Nom et prénom', 'Nom et prénom', true), tel('vtc-tel', 'Téléphone', true), email('vtc-email', 'Adresse e-mail', true), text('vtc-societe', 'Nom de la société'), text('vtc-siret', 'SIRET ou SIREN')]],
      ['Activité et véhicule', [select('vtc-activite', 'Type d’activité', ['Sélectionnez', 'VTC', 'Taxi', 'VTC et Taxi']), date('vtc-date', 'Date de début d’activité'), text('vtc-vehicule', 'Marque et modèle du véhicule'), text('vtc-immat', 'Immatriculation'), text('vtc-plateformes', 'Plateformes utilisées')]],
      ['Historique', [text('vtc-assureur', 'Assureur actuel ou précédent'), textarea('vtc-sinistres', 'Sinistres ou résiliation')]],
    ],
  },
  'q-camping': {
    title: 'Assurance Camping-car', intro: 'Complétez les informations concernant votre camping-car.',
    groups: [
      ['Coordonnées', [text('camp-nom', 'Nom et prénom', 'Nom et prénom', true), tel('camp-tel', 'Téléphone', true), email('camp-email', 'Adresse e-mail', true)]],
      ['Camping-car', [text('camp-marque', 'Marque'), text('camp-modele', 'Modèle'), text('camp-immat', 'Immatriculation'), number('camp-annee', 'Année de mise en circulation'), text('camp-valeur', 'Valeur approximative'), select('camp-usage', 'Usage', ['Sélectionnez', 'Loisirs', 'Voyages fréquents', 'Résidence mobile', 'Autre']), text('camp-stationnement', 'Lieu de stationnement')]],
      ['Historique', [text('camp-assureur', 'Assureur actuel ou précédent'), textarea('camp-sinistres', 'Sinistres récents')]],
    ],
  },
  'q-resilie': {
    title: 'Résilié pour impayés', intro: 'Complétez les informations concernant votre résiliation pour impayés.',
    groups: [
      ['Coordonnées', [text('resilie-nom', 'Nom et prénom', 'Nom et prénom', true), tel('resilie-tel', 'Téléphone', true), email('resilie-email', 'Adresse e-mail', true)]],
      ['Résiliation', [text('resilie-assureur', 'Ancien assureur'), date('resilie-date', 'Date de résiliation'), select('resilie-regle', 'L’impayé est-il régularisé ?', ['Sélectionnez', 'Oui', 'Non', 'En cours']), textarea('resilie-details', 'Détails de la situation')]],
      ['Véhicule concerné', [text('resilie-vehicule', 'Marque et modèle'), text('resilie-immat', 'Immatriculation'), select('resilie-usage', 'Usage', ['Sélectionnez', 'Privé', 'Professionnel', 'VTC / Taxi'])]],
    ],
  },
  'q-jeune': {
    title: 'Jeune permis', intro: 'Complétez les informations concernant le jeune conducteur.',
    groups: [
      ['Conducteur', [text('jeune-nom', 'Nom et prénom', 'Nom et prénom', true), date('jeune-naissance', 'Date de naissance'), tel('jeune-tel', 'Téléphone', true), email('jeune-email', 'Adresse e-mail', true), date('jeune-permis', 'Date d’obtention du permis'), select('jeune-conduite', 'Conduite accompagnée', ['Sélectionnez', 'Oui', 'Non'])]],
      ['Véhicule', [text('jeune-vehicule', 'Marque et modèle'), text('jeune-immat', 'Immatriculation'), select('jeune-usage', 'Usage', ['Sélectionnez', 'Privé', 'Privé et trajet travail', 'Professionnel'])]],
    ],
  },
  'q-nonpaiement': {
    title: 'Non-paiement', intro: 'Complétez les informations concernant votre situation de non-paiement.',
    groups: [
      ['Coordonnées', [text('nonpaiement-nom', 'Nom et prénom', 'Nom et prénom', true), tel('nonpaiement-tel', 'Téléphone', true), email('nonpaiement-email', 'Adresse e-mail', true)]],
      ['Situation d’assurance', [text('nonpaiement-assureur', 'Assureur précédent'), date('nonpaiement-date', 'Date de l’impayé ou résiliation'), select('nonpaiement-regle', 'Situation de la dette', ['Sélectionnez', 'Régularisée', 'Non régularisée', 'En cours de règlement', 'Je ne sais pas']), textarea('nonpaiement-details', 'Explications')]],
      ['Véhicule', [text('nonpaiement-vehicule', 'Marque, modèle et immatriculation'), select('nonpaiement-usage', 'Usage', ['Sélectionnez', 'Privé', 'Professionnel', 'VTC / Taxi'])]],
    ],
  },
  'q-temporaire': {
    title: 'Assurance Temporaire', intro: 'Complétez les informations concernant votre assurance temporaire.',
    groups: [
      ['Coordonnées', [text('temp-nom', 'Nom et prénom', 'Nom et prénom', true), tel('temp-tel', 'Téléphone', true), email('temp-email', 'Adresse e-mail', true)]],
      ['Durée', [date('temp-debut', 'Date de début', true), date('temp-fin', 'Date de fin', true), textarea('temp-motif', 'Motif de la demande')]],
      ['Véhicule', [text('temp-vehicule', 'Marque et modèle'), text('temp-immat', 'Immatriculation'), select('temp-usage', 'Usage', ['Sélectionnez', 'Privé', 'Professionnel', 'Transit ou déplacement', 'Importation ou exportation', 'Autre'])]],
    ],
  },
  'q-flotte': {
    title: 'Flotte Auto Professionnelle', intro: 'Complétez les informations concernant votre flotte professionnelle.',
    groups: [
      ['Entreprise', [text('flotte-entreprise', 'Nom de l’entreprise', 'Nom de l’entreprise', true), text('flotte-siret', 'SIRET ou SIREN'), text('flotte-activite', 'Activité principale', 'Activité principale', true), textarea('flotte-contact', 'Coordonnées du responsable', 'Coordonnées du responsable', true)]],
      ['Flotte', [number('flotte-nombre', 'Nombre de véhicules'), select('flotte-usage', 'Type d’utilisation', ['Sélectionnez', 'Transport de personnes', 'Transport de marchandises', 'Livraison', 'Bâtiment et travaux', 'VTC / Taxi', 'Autre']), textarea('flotte-liste', 'Liste des véhicules'), select('flotte-zone', 'Zone de circulation', ['Sélectionnez', 'Départementale', 'Régionale', 'Nationale', 'Internationale'])]],
      ['Historique', [text('flotte-assureur', 'Assureur actuel ou précédent'), textarea('flotte-sinistres', 'Sinistres récents')]],
    ],
  },
  'q-collection': {
    title: 'Véhicule de Collection', intro: 'Complétez les informations concernant votre véhicule de collection.',
    groups: [
      ['Demandeur', [text('collection-nom', 'Nom et prénom', 'Nom et prénom', true), tel('collection-tel', 'Téléphone', true), email('collection-email', 'Adresse e-mail', true)]],
      ['Véhicule de collection', [text('collection-marque', 'Marque'), text('collection-modele', 'Modèle'), number('collection-annee', 'Année'), text('collection-immat', 'Immatriculation'), text('collection-valeur', 'Valeur estimée'), select('collection-usage', 'Utilisation', ['Sélectionnez', 'Promenade', 'Rassemblements', 'Concours ou exposition', 'Domicile-travail', 'Professionnelle']), text('collection-garage', 'Lieu de stationnement')]],
      ['Historique', [text('collection-assureur', 'Assureur actuel ou précédent'), textarea('collection-sinistres', 'Sinistres récents')]],
    ],
  },
  'q-alcool': {
    title: 'Alcoolémie', intro: 'Complétez les informations concernant votre situation administrative.',
    groups: [
      ['Coordonnées', [text('alcool-nom', 'Nom et prénom', 'Nom et prénom', true), tel('alcool-tel', 'Téléphone', true), email('alcool-email', 'Adresse e-mail', true)]],
      ['Situation du permis', [date('alcool-date', 'Date des faits'), select('alcool-permis', 'Situation actuelle du permis', ['Sélectionnez', 'Permis valide', 'Suspension', 'Annulation', 'Invalidation', 'Récupération en cours']), text('alcool-duree', 'Durée de la mesure'), textarea('alcool-details', 'Détails de la situation')]],
      ['Véhicule', [text('alcool-vehicule', 'Marque, modèle et immatriculation'), select('alcool-usage', 'Usage', ['Sélectionnez', 'Privé', 'Professionnel', 'VTC / Taxi'])]],
    ],
  },
  'q-stupefiants': {
    title: 'Stupéfiants', intro: 'Complétez les informations concernant votre situation administrative.',
    groups: [
      ['Coordonnées', [text('stup-nom', 'Nom et prénom', 'Nom et prénom', true), tel('stup-tel', 'Téléphone', true), email('stup-email', 'Adresse e-mail', true)]],
      ['Situation du permis', [date('stup-date', 'Date des faits'), select('stup-permis', 'Situation actuelle du permis', ['Sélectionnez', 'Permis valide', 'Suspension', 'Annulation', 'Invalidation', 'Récupération en cours']), text('stup-duree', 'Durée de la mesure'), textarea('stup-details', 'Détails de la situation')]],
      ['Véhicule', [text('stup-vehicule', 'Marque, modèle et immatriculation'), select('stup-usage', 'Usage', ['Sélectionnez', 'Privé', 'Professionnel', 'VTC / Taxi'])]],
    ],
  },
  'q-sans-antecedent': {
    title: 'Sans antécédent', intro: 'Complétez les informations concernant votre première assurance.',
    groups: [
      ['Demandeur', [text('sans-nom', 'Nom et prénom', 'Nom et prénom', true), date('sans-naissance', 'Date de naissance'), tel('sans-tel', 'Téléphone', true), email('sans-email', 'Adresse e-mail', true), text('sans-adresse', 'Adresse')]],
      ['Permis et véhicule', [date('sans-permis', 'Date d’obtention du permis'), text('sans-vehicule', 'Marque et modèle'), text('sans-immat', 'Immatriculation'), select('sans-usage', 'Usage', ['Sélectionnez', 'Privé', 'Privé et professionnel', 'Professionnel'])]],
      ['Historique', [textarea('sans-releve', 'Pourquoi n’avez-vous pas de relevé d’information ?'), textarea('sans-details', 'Informations complémentaires')]],
    ],
  },
  'q-defaut': {
    title: 'Défaut d’assurance', intro: 'Complétez les informations concernant votre défaut d’assurance.',
    groups: [
      ['Coordonnées', [text('defaut-nom', 'Nom et prénom', 'Nom et prénom', true), tel('defaut-tel', 'Téléphone', true), email('defaut-email', 'Adresse e-mail', true)]],
      ['Situation', [date('defaut-date', 'Date du défaut d’assurance'), select('defaut-circonstances', 'Circonstances', ['Sélectionnez', 'Contrat résilié', 'Oubli de renouvellement', 'Difficulté financière', 'Véhicule nouvellement acquis', 'Véhicule non utilisé', 'Autre']), select('defaut-controle', 'Avez-vous fait l’objet d’un contrôle ?', ['Sélectionnez', 'Oui', 'Non']), textarea('defaut-explications', 'Explications')]],
      ['Véhicule et permis', [text('defaut-vehicule', 'Marque, modèle et immatriculation'), date('defaut-permis', 'Date du permis'), select('defaut-usage', 'Usage', ['Sélectionnez', 'Privé', 'Professionnel', 'VTC / Taxi'])]],
    ],
  },
};

const serviceIndex = [...dailyServices, ...specialServices].reduce((map, service) => { map[service.id] = service; return map; }, {});
const questionnaireShell = document.querySelector('#questionnaires');
const formContent = document.querySelector('#form-content');
const questionnaireTitle = document.querySelector('#questionnaires-title');
const questionnaireIntro = document.querySelector('#questionnaire-intro');

function renderServiceCards(targetId, services) {
  const target = document.querySelector(targetId);
  services.forEach((service) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'service-card';
    card.dataset.openForm = service.id;
    card.setAttribute('aria-controls', 'questionnaires');
    card.setAttribute('aria-expanded', 'false');
    card.innerHTML = `<span class="service-icon" aria-hidden="true">${service.icon}</span><strong>${service.title}</strong><small>${service.summary}</small><span class="service-arrow" aria-hidden="true">↗</span>`;
    target.append(card);
  });
}

function renderField(field) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = field.id;
  const isRequired = field.type === 'email';
  label.innerHTML = `${field.label}${isRequired ? ' <span aria-hidden="true">*</span>' : ''}`;
  wrapper.append(label);

  let control;
  if (field.type === 'textarea') {
    control = document.createElement('textarea');
    control.rows = 4;
  } else if (field.type === 'select') {
    control = document.createElement('select');
    field.options.forEach((option, index) => {
      const item = document.createElement('option');
      item.value = index === 0 ? '' : option;
      item.textContent = option;
      control.append(item);
    });
  } else {
    control = document.createElement('input');
    control.type = field.type;
    if (field.type === 'number') control.min = '0';
    if (field.placeholder) control.placeholder = field.placeholder;
  }
  control.id = field.id;
  control.name = field.name;
  control.required = isRequired;
  control.autocomplete = field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'off';
  wrapper.append(control);
  const error = document.createElement('span');
  error.className = 'field-error';
  error.id = `${field.id}-error`;
  wrapper.append(error);
  control.setAttribute('aria-describedby', error.id);
  return wrapper;
}

function enhanceTasteForm(form) {
  if (!isTasteVariant || form.dataset.tasteWizard === 'true') return;

  const fieldsets = [...form.querySelectorAll(':scope > .form-fieldset')];
  if (!fieldsets.length) return;

  const groups = [[], [], []];
  fieldsets.forEach((fieldset) => {
    const legend = fieldset.querySelector('legend')?.textContent.toLowerCase() || '';
    const isCoordinates = /coord|demandeur|entreprise/.test(legend)
      || Boolean(fieldset.querySelector('input[type="email"], input[type="tel"]'));
    const isProperty = /bien|logement|véhicule|moto|auto|camping|flotte|activité|projet|permis/.test(legend);
    if (isCoordinates) groups[2].push(fieldset);
    else if (isProperty && groups[0].length === 0) groups[0].push(fieldset);
    else groups[1].push(fieldset);
  });

  if (!groups[0].length && groups[1].length) groups[0].push(groups[1].shift());
  if (!groups[1].length && groups[0].length > 1) groups[1].push(groups[0].pop());
  if (!groups[2].length) groups[2].push(groups[1].pop() || groups[0].pop());

  const wizard = document.createElement('div');
  wizard.className = 'taste-form-wizard';
  form.insertBefore(wizard, fieldsets[0]);
  const progress = document.createElement('ol');
  progress.className = 'taste-form-progress';
  progress.setAttribute('aria-label', 'Progression du questionnaire');
  const steps = ['Le bien', 'Vos besoins', 'Coordonnées'];
  const panels = steps.map((label, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'taste-progress-step';
    button.dataset.step = String(index);
    button.innerHTML = `<span>${index + 1}</span>${label}`;
    item.append(button);
    progress.append(item);

    const panel = document.createElement('section');
    panel.className = 'taste-form-step';
    panel.dataset.step = String(index);
    panel.setAttribute('aria-label', `Étape ${index + 1} : ${label}`);
    (groups[index] || []).forEach((fieldset) => panel.append(fieldset));
    if (!panel.children.length) {
      const note = document.createElement('p');
      note.className = 'taste-step-note';
      note.textContent = 'Poursuivez à l’étape suivante.';
      panel.append(note);
    }
    wizard.append(panel);
    return panel;
  });
  wizard.prepend(progress);

  const navigation = document.createElement('div');
  navigation.className = 'taste-form-navigation';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'button button-quiet taste-form-previous';
  previous.textContent = 'Étape précédente';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'button button-primary taste-form-next';
  next.textContent = 'Continuer';
  navigation.append(previous, next);
  wizard.append(navigation);

  form.dataset.tasteWizard = 'true';

  let currentStep = 0;
  const updateStep = (step) => {
    currentStep = Math.max(0, Math.min(2, step));
    panels.forEach((panel, index) => {
      panel.hidden = index !== currentStep;
      panel.setAttribute('aria-hidden', String(index !== currentStep));
    });
    progress.querySelectorAll('.taste-progress-step').forEach((stepButton, index) => {
      stepButton.classList.toggle('is-active', index === currentStep);
      stepButton.classList.toggle('is-complete', index < currentStep);
      stepButton.setAttribute('aria-current', index === currentStep ? 'step' : 'false');
      stepButton.disabled = index > currentStep;
    });
    previous.hidden = currentStep === 0;
    next.hidden = currentStep === 2;
    const privacy = form.querySelector('.form-privacy');
    if (privacy) privacy.hidden = currentStep !== 2;
    const status = form.querySelector('.form-status');
    if (status) status.hidden = currentStep !== 2;
    const submit = form.querySelector('.button-submit');
    if (submit) submit.hidden = currentStep !== 2;
  };
  const validateStep = () => {
    const invalid = [...panels[currentStep].querySelectorAll('input, select, textarea')]
      .find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    return false;
  };

  previous.addEventListener('click', () => updateStep(currentStep - 1));
  next.addEventListener('click', () => {
    if (validateStep()) updateStep(currentStep + 1);
  });
  progress.querySelectorAll('.taste-progress-step').forEach((stepButton) => {
    stepButton.addEventListener('click', () => {
      const requestedStep = Number(stepButton.dataset.step);
      if (requestedStep < currentStep || (requestedStep === currentStep + 1 && validateStep())) updateStep(requestedStep);
    });
  });
  form.addEventListener('reset', () => requestAnimationFrame(() => updateStep(0)));
  updateStep(0);
}

function renderForm(formId) {
  const definition = formDefinitions[formId];
  questionnaireTitle.textContent = definition.title;
  questionnaireIntro.textContent = definition.intro;
  formContent.innerHTML = '';

  const panel = document.createElement('div');
  panel.className = 'form-panel';
  const form = document.createElement('form');
  form.id = `${formId}-form`;
  form.action = FORMSPREE_ENDPOINT;
  form.method = 'POST';
  form.noValidate = true;
  form.innerHTML = `<input type="hidden" name="Type de demande" value="${definition.title}" /><input type="hidden" name="_subject" value="ASSURÉCO — ${definition.title}" /><p>Les champs marqués d’un astérisque sont nécessaires à l’étude de votre demande.</p>`;

  definition.groups.forEach(([groupTitle, fields]) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'form-fieldset';
    const legend = document.createElement('legend');
    legend.textContent = groupTitle;
    fieldset.append(legend);
    const grid = document.createElement('div');
    grid.className = 'form-grid form-grid-two';
    fields.forEach((field) => grid.append(renderField(field)));
    fieldset.append(grid);
    form.append(fieldset);
  });

  const privacy = document.createElement('p');
  privacy.className = 'form-privacy';
  privacy.innerHTML = 'Les informations transmises servent uniquement au traitement de votre demande. <a href="#politique-confidentialite">Consulter la politique de confidentialité</a>.';
  form.append(privacy);
  const status = document.createElement('div');
  status.className = 'form-status';
  status.setAttribute('aria-live', 'polite');
  form.append(status);
  const submit = document.createElement('button');
  submit.className = 'button button-primary button-submit';
  submit.type = 'submit';
  submit.innerHTML = `Envoyer ma demande <span aria-hidden="true">↗</span>`;
  form.append(submit);
  panel.append(form);
  formContent.append(panel);
  enhanceTasteForm(form);
  form.addEventListener('submit', (event) => handleSubmit(event, form, status, submit));
}

function clearFieldErrors(form) {
  form.querySelectorAll('[aria-invalid="true"]').forEach((element) => element.removeAttribute('aria-invalid'));
  form.querySelectorAll('.field-error').forEach((element) => { element.textContent = ''; });
}

function validateForm(form) {
  clearFieldErrors(form);
  if (form.checkValidity()) return true;
  const firstInvalid = form.querySelector(':invalid');
  form.querySelectorAll(':invalid').forEach((element) => {
    element.setAttribute('aria-invalid', 'true');
    const error = document.querySelector(`#${element.id}-error`);
    if (error) error.textContent = element.type === 'email' ? 'Saisissez une adresse e-mail valide.' : 'Ce champ est requis.';
  });
  firstInvalid?.focus();
  return false;
}

async function handleSubmit(event, form, status, submit) {
  event.preventDefault();
  status.className = 'form-status';
  status.textContent = '';
  if (!validateForm(form)) return;
  submit.disabled = true;
  status.className = 'form-status';
  status.textContent = 'Transmission de votre demande…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('submission-failed');
    form.reset();
    status.className = 'form-status success';
    status.textContent = 'Votre demande a bien été transmise. Le cabinet reviendra vers vous dans les meilleurs délais.';
  } catch (error) {
    status.className = 'form-status error';
    status.textContent = 'L’envoi n’a pas pu aboutir. Vérifiez votre connexion ou contactez directement le cabinet par téléphone ou e-mail.';
  } finally {
    submit.disabled = false;
  }
}

function openQuestionnaire(formId, updateHash = true) {
  if (!formDefinitions[formId]) return;
  document.querySelectorAll('.service-card').forEach((card) => card.setAttribute('aria-expanded', card.dataset.openForm === formId ? 'true' : 'false'));
  renderForm(formId);
  questionnaireShell.hidden = false;
  if (updateHash) history.replaceState(null, '', `#${formId}`);
  requestAnimationFrame(() => questionnaireShell.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function closeQuestionnaire() {
  questionnaireShell.hidden = true;
  document.querySelectorAll('.service-card').forEach((card) => card.setAttribute('aria-expanded', 'false'));
  history.replaceState(null, '', '#services');
  document.querySelector('#services').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

renderServiceCards('#daily-services', dailyServices);
renderServiceCards('#special-services', specialServices);
document.querySelectorAll('[data-open-form]').forEach((card) => card.addEventListener('click', () => openQuestionnaire(card.dataset.openForm)));
document.querySelector('#close-questionnaire').addEventListener('click', closeQuestionnaire);

const hashId = window.location.hash.slice(1);
if (formDefinitions[hashId]) openQuestionnaire(hashId, false);
document.querySelector('#current-year').textContent = new Date().getFullYear();

const COOKIE_CONSENT_KEY = 'assureco-cookie-consent-v1';
const cookieBanner = document.querySelector('#cookie-banner');
const cookieSettings = document.querySelector('#cookie-settings');
const cookieManage = document.querySelector('#cookie-manage');
const cookieAccept = document.querySelector('#cookie-accept');
const cookieRefuse = document.querySelector('#cookie-refuse');
const cookieCustomize = document.querySelector('#cookie-customize');
const cookieSave = document.querySelector('#cookie-save');

function getCookieChoice() {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    return null;
  }
}

function saveCookieChoice(choice) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch (error) {
    // The banner remains usable if storage is unavailable.
  }
  cookieSettings.hidden = true;
  cookieBanner.hidden = true;
  cookieManage.hidden = false;
}

function showCookieBanner(showSettings = false) {
  cookieBanner.hidden = false;
  cookieManage.hidden = true;
  cookieSettings.hidden = !showSettings;
  (showSettings ? cookieSave : cookieAccept).focus();
}

cookieAccept.addEventListener('click', () => saveCookieChoice('accepted'));
cookieRefuse.addEventListener('click', () => saveCookieChoice('refused'));
cookieCustomize.addEventListener('click', () => showCookieBanner(true));
cookieSave.addEventListener('click', () => saveCookieChoice('refused'));
cookieManage.addEventListener('click', () => showCookieBanner(true));

if (getCookieChoice()) {
  cookieManage.hidden = false;
} else {
  showCookieBanner();
}
