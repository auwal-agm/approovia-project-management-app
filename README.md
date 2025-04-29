# Approovia Project Management App

A simple and responsive **drag-and-drop dashboard interface** built with React and Tailwind CSS, allowing users to organize projects into folders. This project was developed as part of a frontend test challenge.

🔗 **Live Demo**: https://approovia-project-management.onrender.com  
📁 **Repository**: [https://github.com/auwal-agm/approovia-project-management-app](https://github.com/auwal-agm/approovia-project-management-app)

---

## 🚀 Features

- 📂 View and manage a list of folders containing projects.
- 🔄 Drag and drop projects between folders with smooth UI updates.
- ✨ Active/inactive state styling for folders and projects.
- 📡 Simulated API submission when projects are moved.
- 💬 Clean, modern, and responsive UI.
- ⚙️ Built with `@dnd-kit/core` for performant drag-and-drop.

---

## 📦 Requirements

### Dashboard Layout
- A minimum of **3 folders**.
- Each folder contains **at least 2 projects**.

### Drag and Drop
- Drag a project from one folder to another.
- UI updates immediately after drop.

### Active/Inactive States
- Active state is applied when a folder or project is selected or being dragged.
- Inactive state is the default appearance.
- Visual differences via color, border, or shadow.

### Mock API Submission
- On drop, simulate sending the updated folder/project relationship to a mock API.
- Uses `fetch()` with `setTimeout()` to simulate a successful submission.
- Logs the simulated response in the console.

---

## 🎨 Bonus Features (Optional Enhancements)
- ✨ Smooth animations during drag and drop.
- 📝 Rename folders or projects via inline editing.
- 📱 Mobile-friendly design.

---

## ⚙️ Tech Stack

- **Frontend Framework:** React
- **Styling:** Tailwind CSS
- **Drag and Drop:** `@dnd-kit/core`
- **Mock API:** Simulated with `fetch()` + `Promise.resolve()`

---

## 📂 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/auwal-agm/approovia-project-management-app.git
   cd approovia-project-management-app
   npm install
   npm run dev
