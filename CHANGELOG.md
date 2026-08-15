# Journal des modifications / Changelog

Toutes les modifications notables apportées à ce projet sont documentées dans ce fichier.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/), et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.2.0] - 2026-08-15

### 🎯 *L'angle Terre Promise : La sérénité d'une facturation exacte en un clic*
> *Finie l'angoisse des heures oubliées sur un chronomètre resté ouvert tout le week-end, ou des réunions de minuit facturées en double sur deux mois différents. Vous ouvrez votre Google Sheets, cliquez sur un bouton, et obtenez un état des lieux limpide, précis et immédiatement exploitable.*

### ✨ Ajouté / Added
- **Garde-fou chronomètre oublié** : Alerte visuelle et confirmation obligatoire pour toute session dépassant 12 heures, évitant les enregistrements intempestifs de dizaines d'heures.
- **Bornage strict des périodes** : Calcul exact des durées tronquées aux frontières de la période demandée (évite les doublons de facturation inter-mois).
- **Internationalisation centralisée (`I18n.gs`)** : Dictionnaire unique pour l'ensemble des textes client et serveur, éliminant les chaînes en dur.
- **Icônes SVG inline** : Remplacement de la dépendance externe Material Icons CDN par des glyphes SVG sécurisés et ultra-rapides.

### 🔒 Sécurité / Security
- **Principe du moindre privilège** : Réduction du scope Google Sheets à `spreadsheets.currentonly`.
- **Scope d'envoi d'email allégé** : Passage à `MailApp` (`script.send_mail`) au lieu de `GmailApp` (`gmail.send`).
- **Protection XSS** : Échappement HTML systématique (`escapeHtml_`) de toutes les données externes injectées dans les rapports par e-mail.
- **Gestion des verrous** : Ajout de `LockService.getUserLock()` pour empêcher la création d'événements en doublon lors des clics répétés.

### ⚡ Performance & Optimisations
- **Écritures groupées (Batch)** : Génération des tableaux Sheets en mémoire avec application unique via `setValues()`, divisant le temps d'exécution.
- **Gestion fine des fuseaux horaires** : Calcul rigoureux dans le fuseau de l'agenda avec prise en compte des passages heure d'été/hiver.

---

## [1.1.0] - 2026-05-16

### ✨ Ajouté / Added
- **Envoi de rapport par email** : Exportation directe du tableau récapitulatif dans un e-mail HTML soigné.
- **Support des journées entières** : Prise en compte forfaitaire de 7 heures par journée couverte.
- **Raccourci clavier Espace** : Démarrage et arrêt instantanés du chronomètre.

---

## [1.0.0] - 2026-04-10

### 🚀 Lancement initial / Initial Release
- Suivi du temps par tags `#projet` dans Google Agenda.
- Génération automatisée de feuilles d'heures dans Google Sheets.
- Barre latérale Material Design pour le chronomètre et l'exportation.
