# Timesheet ⏱️📊

[![English](https://img.shields.io/badge/Language-English-blue)](#english-version) [![Français](https://img.shields.io/badge/Langue-Français-red)](#version-française)
![GitHub release](https://img.shields.io/badge/version-1.1.0-blue)
![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)

---

## English Version 🇬🇧

**Timesheet** is a free, professional, and bilingual (EN/FR) Google Workspace Add-on designed for freelancers and small teams. Why pay for external time-tracking tools when you can use what’s already there? Simply log your hours by adding `#tags` to your Google Calendar™ events. The add-on extracts your data, applies your filters, and automatically generates clean, structured timesheets directly into Google Sheets™.

### ✨ Features

- **Google Calendar™ Integration**: Track time natively by creating events. No external dashboard needed.
- **Tag-based Tracking**: Add a `#tag` to your event title (e.g., `#project1 Design Phase`) to automatically categorize it.
- **Built-in Timer**: A beautiful Material Design 3 sidebar with a start/stop timer to record events in real-time.
- **Keyboard Shortcuts**: Start and stop the timer simply by pressing the `Space` bar.
- **Bilingual Support**: The interface automatically switches between English and French based on your Google account settings.
- **Smart Export**: Generate an aggregated, easy-to-read report in a new Google Sheets™ tab in one click.
- **Shared Calendars**: Track and export time from shared calendars with your team members.
- **Dark Mode**: Fully supports automatic dark mode based on your OS preference.

### 🚀 How it works

#### 1. Track your time
Our recommendation is to create a new calendar for your time recordings. You could technically use your personal calendar, but to share your time recordings with somebody else, it's easier to use a dedicated one.

Within that calendar, create new entries representing your work. Every entry must have a tag that identifies the group or project. Behind that tag, you can leave a comment to document the work you have done.
For example:
> `#project1 Learning about time recording with TimeSheet`

#### 2. Generate a Report
1. Open a Google Sheets document.
2. Go to **Extensions > Timesheet > Create report**.
3. Select your calendar, the desired period (This week, last month, custom dates, etc.).
4. Click **Create Report**! A new tab will be created with your aggregated timesheet.

---

## Version Française 🇫🇷

**Timesheet** est un module complémentaire bilingue (FR/EN) et gratuit pour Google Workspace, conçu pour les freelances et les petites équipes. Pourquoi payer pour un outil externe de suivi du temps alors que tout est déjà là ? Enregistrez vos heures simplement en ajoutant des `#tags` à vos événements Google Agenda™. L'extension extrait vos données, applique vos filtres et génère automatiquement des rapports de temps structurés et précis directement dans Google Sheets™.

### ✨ Fonctionnalités

- **Intégration Google Agenda™** : Suivez votre temps de manière native. Aucun tableau de bord externe n'est requis.
- **Suivi par Tags** : Ajoutez un `#tag` au titre de votre événement (ex : `#projet1 Phase de design`) pour le catégoriser.
- **Chronomètre Intégré** : Une magnifique barre latérale Material Design 3 avec un bouton Démarrer/Arrêter en temps réel.
- **Raccourcis Clavier** : Lancez et arrêtez le chronomètre en appuyant simplement sur la barre `Espace`.
- **Support Bilingue** : L'interface bascule automatiquement en Français ou en Anglais en fonction des paramètres de votre compte Google.
- **Export Intelligent** : Générez un rapport agrégé et lisible dans un nouvel onglet Google Sheets™ en un clic.
- **Calendriers Partagés** : Suivez et exportez le temps depuis les calendriers partagés avec vos collaborateurs.
- **Mode Sombre** : Supporte entièrement le mode sombre automatique selon les préférences de votre système d'exploitation.

### 🚀 Comment ça marche

#### 1. Enregistrez votre temps
Nous vous recommandons de créer un nouvel agenda spécialement dédié à votre pointage. Vous pourriez techniquement utiliser votre agenda personnel, mais si vous souhaitez partager vos heures avec quelqu'un, il sera bien plus facile d'en avoir un dédié.

Dans cet agenda, créez de nouveaux événements qui représentent votre temps de travail. Chaque événement doit avoir un `#tag` qui identifie le projet ou le groupe. Après ce tag, vous pouvez laisser un commentaire pour documenter le travail effectué.
Par exemple :
> `#projet1 Apprentissage de l'enregistrement du temps avec TimeSheet`

#### 2. Générez un rapport
1. Ouvrez un document Google Sheets.
2. Allez dans **Extensions > Timesheet > Créer un rapport**.
3. Sélectionnez votre agenda, la période souhaitée (Cette semaine, mois dernier, dates personnalisées, etc.).
4. Cliquez sur **Créer le rapport** ! Un nouvel onglet sera généré avec vos temps consolidés.

---

## 🛠️ Installation for Developers / Pour les Développeurs

If you want to install this script in your own Google Workspace environment:
*(Si vous souhaitez installer ce script dans votre propre environnement Google Workspace :)*

1. Clone this repository:
   ```bash
   git clone https://github.com/FabriceFx/gworkspace-timesheet.git
   ```
2. Make sure you have [clasp](https://github.com/google/clasp) installed:
   ```bash
   npm install -g @google/clasp
   ```
3. Login to your Google account:
   ```bash
   clasp login
   ```
4. Create a new Google Apps Script project bound to a Google Sheet, or push directly:
   ```bash
   clasp create --type sheets --title "Timesheet"
   clasp push
   ```

## 📝 License

This project is open-source and available under the MIT License.

---
*Développé par [L'atelier informatique](https://atelier-informatique.com)*
