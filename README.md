# TempoSheet ⏱️📊

[![English](https://img.shields.io/badge/Language-English-blue)](#english-version) [![Français](https://img.shields.io/badge/Langue-Français-red)](#version-française)
![GitHub release](https://img.shields.io/badge/version-1.2.0-blue)
![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)

---

## English Version 🇬🇧

**TempoSheet** is a free, professional, and bilingual (EN/FR) Google Workspace Add-on designed for freelancers and small teams. Why pay for external time-tracking tools when you can use what’s already there? Simply log your hours by adding `#tags` to your Google Calendar™ events, or use the built-in real-time timer in Google Sheets™. The add-on extracts your data, applies your filters, and automatically generates clean, structured timesheets directly into Google Sheets™.

### ✨ Features

- **Google Calendar™ Integration**: Track time natively by creating events. No external dashboard needed.
- **Tag-based Tracking**: Add a `#tag` to your event title (e.g., `#project1 Design Phase`) to automatically categorize it.
- **Built-in Timer**: A beautiful Material Design 3 sidebar with a start/stop timer to record events in real-time.
- **Keyboard Shortcuts**: Start and stop the timer simply by pressing the `Space` bar.
- **Instant Email Reports**: Send professional HTML timesheet tables to your inbox in one click.
- **Bilingual Support**: The interface automatically switches between English and French based on your Google account settings.
- **Smart Export**: Generate an aggregated, easy-to-read report in a new Google Sheets™ tab in one click.
- **Shared Calendars**: Track and export time from shared calendars with your team members.
- **Time-zone Aware**: Periods are computed in your calendar's time zone, so "this month" always means your month.

---

### 📦 How to Install the Extension into Google Sheets

You can install **TempoSheet** into your Google Sheets in two simple ways:

#### Option A: Quick Manual Setup in Any Google Sheet (No coding required)
1. Open any existing Google Sheet, or create a new one at [sheets.new](https://sheets.new).
2. In the top menu, go to **Extensions** → **Apps Script**.
3. In the Apps Script editor:
   * Click **Project Settings** (⚙️ on the left panel) and check **"Show 'appsscript.json' manifest file in editor"**.
   * Copy and paste the project files (`.gs` and `.html` files from this repository) into the editor.
4. Click **Save** (💾) and refresh your Google Sheets tab.
5. The **TempoSheet** menu will appear in the top menu under **Extensions** → **TempoSheet**!

#### Option B: For Developers (via Google clasp CLI)
```bash
git clone https://github.com/FabriceFx/TempoSheet.git
cd TempoSheet
npm install -g @google/clasp
clasp login
clasp create --type sheets --title "TempoSheet"
clasp push
```

---

### 📖 Step-by-Step Beginner's Guide

#### 1. First-Time Setup & Authorization
When you open **TempoSheet** for the first time in Google Sheets:
1. Click **Extensions** → **TempoSheet** → **Create report** (or **Start timer**).
2. Google will ask for permission (*"Authorization Required"*). Click **Continue**, select your Google account, and click **Allow**. *(This is a standard Google security step required only once).*

#### 2. How to Track Your Time (2 Easy Methods)

##### Method A: Directly in Google Calendar
Create an event in Google Calendar and include a **`#tag`** in the title:
* **Example 1:** `#Marketing Writing blog post`
* **Example 2:** `Weekly team meeting #Internal`
* **Example 3 (no details):** `#Admin` *(the task will be automatically named "Miscellaneous tasks")*

> 💡 **Tip:** We recommend creating a dedicated calendar (e.g., *"My Time Tracking"*) in Google Calendar to keep your work hours distinct from personal appointments.

##### Method B: Using the Built-in Timer in Google Sheets
If you are working live at your computer:
1. In Google Sheets, go to **Extensions** → **TempoSheet** → **Start timer**.
2. In the right-hand sidebar:
   * Select your **target calendar**.
   * Enter the **project name** (e.g., `Website`).
   * *(Optional)* Enter a **task description**.
3. Click **Start** (or press the `Space` bar).
4. When finished, click **Stop**: the event is automatically created in your Google Calendar with the exact duration.

> 🛟 **Forgot to stop it?** Beyond **12 hours**, the add-on never records silently: it warns you and lets you save anyway, resume the timer, or discard the session.

#### 3. Generate Your Timesheet Report
1. In Google Sheets, go to **Extensions** → **TempoSheet** → **Create report**.
2. Select your **source calendar** and choose the **period** (*This week*, *This month*, *Last month*, *Custom period*, etc.).
3. Click **Create Report**.
4. ✨ **Instant result:** A new tab is created in your spreadsheet with total hours per project, formatted task details, and clean layout ready to print or share.

#### 4. Send the Report by Email
1. Navigate to the generated report tab.
2. Click **Extensions** → **TempoSheet** → **Send report by email**.
3. You will immediately receive a formatted HTML summary table in your email inbox.

---

## Version Française 🇫🇷

**TempoSheet** est un module complémentaire bilingue (FR/EN) et gratuit pour Google Workspace, conçu pour les freelances et les petites équipes. Pourquoi payer pour un outil externe de suivi du temps alors que tout est déjà là ? Enregistrez vos heures simplement en ajoutant des `#tags` à vos événements Google Agenda™, ou utilisez le chronomètre en direct intégré à Google Sheets™. L'extension extrait vos données, applique vos filtres et génère automatiquement des rapports de temps structurés et précis directement dans Google Sheets™.

### ✨ Fonctionnalités

- **Intégration Google Agenda™** : Suivez votre temps de manière native. Aucun tableau de bord externe n'est requis.
- **Suivi par Tags** : Ajoutez un `#tag` au titre de votre événement (ex : `#projet1 Phase de design`) pour le catégoriser.
- **Chronomètre Intégré** : Une magnifique barre latérale Material Design 3 avec un bouton Démarrer/Arrêter en temps réel.
- **Raccourcis Clavier** : Lancez et arrêtez le chronomètre en appuyant simplement sur la barre `Espace`.
- **Envoi par E-mail** : Transmettez un tableau récapitulatif HTML professionnel par e-mail en un clic.
- **Support Bilingue** : L'interface bascule automatiquement en Français ou en Anglais en fonction des paramètres de votre compte Google.
- **Export Intelligent** : Générez un rapport agrégé et lisible dans un nouvel onglet Google Sheets™ en un clic.
- **Calendriers Partagés** : Suivez et exportez le temps depuis les calendriers partagés avec vos collaborateurs.
- **Fuseaux Horaires** : Les périodes sont calculées dans le fuseau de votre agenda : « ce mois » désigne toujours votre mois.

---

### 📦 Comment ajouter l'extension dans Google Sheets

Vous pouvez installer **TempoSheet** dans votre Google Sheets très facilement :

#### Option A : Installation manuelle dans n'importe quel classeur (Sans compétences techniques)
1. Ouvrez un classeur Google Sheets existant ou créez-en un nouveau via [sheets.new](https://sheets.new).
2. Dans la barre de menus, cliquez sur **Extensions** → **Apps Script**.
3. Dans l'éditeur Apps Script :
   * Cliquez sur les **Paramètres du projet** (icône ⚙️ à gauche) et cochez **« Afficher le fichier manifeste "appsscript.json" dans l'éditeur »**.
   * Copiez et collez les fichiers du projet (fichiers `.gs` et `.html` de ce dépôt) dans l'éditeur.
4. Cliquez sur **Enregistrer** (icône 💾) puis actualisez votre page Google Sheets (F5 ou Cmd+R).
5. Le menu **TempoSheet** apparaît directement dans votre feuille sous **Extensions** → **TempoSheet** !

#### Option B : Pour les Développeurs (via Google clasp CLI)
```bash
git clone https://github.com/FabriceFx/TempoSheet.git
cd TempoSheet
npm install -g @google/clasp
clasp login
clasp create --type sheets --title "TempoSheet"
clasp push
```

---

### 📖 Guide Pas-à-Pas pour Débutant(e)s

#### 1. Première utilisation & Autorisation
À la toute première ouverture dans Google Sheets :
1. Cliquez sur le menu **Extensions** → **TempoSheet** → **Créer un rapport** (ou **Lancer le chronomètre**).
2. Google affichera une fenêtre d'autorisation (*« Autorisation requise »*).
3. Cliquez sur **Continuer**, sélectionnez votre compte Google, puis cliquez sur **Autoriser**. *(Cette étape de sécurité standard Google n'est demandée qu'une seule fois).*

#### 2. Comment enregistrer son temps (2 méthodes simples)

##### Méthode A : Directement dans Google Agenda
Créez un événement dans votre Google Agenda en insérant un **`#tag`** dans le titre :
* **Exemple 1 :** `#Marketing Rédaction de l'article de blog`
* **Exemple 2 :** `Réunion d'équipe #Interne`
* **Exemple 3 (sans description) :** `#Comptabilité` *(la tâche sera automatiquement nommée « Tâches diverses »)*

> 💡 **Astuce débutant** : Il est recommandé de créer un agenda dédié (ex : *« Mon Suivi de Temps »*) dans Google Agenda pour séparer clairement vos heures de travail de vos rendez-vous personnels.

##### Méthode B : Avec le Chronomètre intégré dans Google Sheets
Si vous travaillez en direct sur votre ordinateur :
1. Dans Google Sheets, allez dans le menu **Extensions** → **TempoSheet** → **Lancer le chronomètre**.
2. Dans le panneau latéral à droite :
   * Choisissez votre **agenda cible**.
   * Saisissez le **nom du projet** (ex : `SiteWeb`).
   * *(Optionnel)* Saisissez une **description de la tâche**.
3. Cliquez sur **Démarrer** (ou appuyez sur la touche `Espace`).
4. Quand vous avez terminé, cliquez sur **Arrêter** : l'événement est créé automatiquement et précisément dans votre Google Agenda !

> 🛟 **Chronomètre oublié ?** Au-delà de **12 heures**, l'extension n'enregistre jamais en silence : elle vous alerte et vous laisse enregistrer quand même, reprendre le chronomètre, ou abandonner la session.

#### 3. Générer votre rapport d'heures
1. Dans Google Sheets, allez dans **Extensions** → **TempoSheet** → **Créer un rapport**.
2. Sélectionnez votre **agenda source** et la **période** (*Cette semaine*, *Ce mois*, *Le mois dernier*, *Période personnalisée*...).
3. Cliquez sur **Créer le rapport**.
4. ✨ **Résultat immédiat** : Un nouvel onglet est généré dans votre classeur avec le total d'heures par projet, le détail formaté des tâches et une présentation soignée prête à être imprimée ou partagée.

#### 4. Envoyer le rapport par e-mail
1. Placez-vous sur l'onglet du rapport généré.
2. Cliquez sur **Extensions** → **TempoSheet** → **Envoyer le rapport par email**.
3. Vous recevez directement un e-mail au format tableau HTML professionnel reprenant l'intégralité du rapport.

---

## 📝 License

This project is open-source and available under the MIT License.

---
*Développé par [L'atelier informatique](https://atelier-informatique.com)*

---
<p align="center"><a href="https://faucheux.bzh" target="_blank" style="color: inherit; text-decoration: none;">&lt;&gt; par Fabrice Faucheux</a></p>