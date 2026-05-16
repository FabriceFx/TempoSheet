# GWorkspace Timesheet ⏱️📊

**GWorkspace Timesheet** is a free, professional, and bilingual (EN/FR) Google Workspace Add-on designed for freelancers and small teams. Why pay for external time-tracking tools when you can use what’s already there? Simply log your hours by adding `#tags` to your Google Calendar™ events. The add-on extracts your data, applies your filters, and automatically generates clean, structured timesheets directly into Google Sheets™.

![GitHub release](https://img.shields.io/badge/version-1.0.0-blue)
![Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)

## ✨ Features

- **Google Calendar™ Integration**: Track time natively by creating events. No external dashboard needed.
- **Tag-based Tracking**: Add a `#tag` to your event title (e.g., `#project1 Design Phase`) to automatically categorize it.
- **Built-in Timer**: A beautiful Material Design 3 sidebar with a start/stop timer to record events in real-time.
- **Keyboard Shortcuts**: Start and stop the timer simply by pressing the `Space` bar.
- **Bilingual Support**: The interface automatically switches between English and French based on your Google account settings.
- **Smart Export**: Generate an aggregated, easy-to-read report in a new Google Sheets™ tab in one click.
- **Shared Calendars**: Track and export time from shared calendars with your team members.
- **Dark Mode**: Fully supports automatic dark mode based on your OS preference.

## 🚀 How it works

### 1. Track your time
Our recommendation is to create a new calendar for your time recordings. You could technically use your personal calendar, but to share your time recordings with somebody else, it's easier to use a dedicated one.

Within that calendar, create new entries representing your work. Every entry must have a tag that identifies the group or project. Behind that tag, you can leave a comment to document the work you have done.
For example:
> `#project1 Learning about time recording with TimeSheet`

### 2. Generate a Report
1. Open a Google Sheets document.
2. Go to **Extensions > Time Report Generator > Create report**.
3. Select your calendar, the desired period (This week, last month, custom dates, etc.).
4. Click **Create Report**! A new tab will be created with your aggregated timesheet.

## 🛠️ Installation for Developers

If you want to install this script in your own Google Workspace environment:

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
   clasp create --type sheets --title "GWorkspace Timesheet"
   clasp push
   ```

## 📝 License

This project is open-source and available under the MIT License.

---
*Développé par [L'atelier informatique](https://atelier-informatique.com)*
