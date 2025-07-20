# 🖥️ Terminal Portfolio

A slick, interactive developer portfolio that lives inside a simulated terminal. Built with modern tools like React, Vite, TypeScript, and Tailwind CSS.

**➡️ Live Demo: [your-portfolio-url.com]([https://your-portfolio-url.com](https://shantanu-terminal.vercel.app/))**

---


## 🔮 Features

-   **Interactive Terminal UI:** A fully responsive interface that mimics a real command line.
-   **Custom Command System:** Navigate your portfolio using commands like `about`, `projects`, `contact`, and more.
-   **Hacker-Inspired Theme:** A sleek, customizable theme built with Tailwind CSS.
-   **Easy to Extend:** A modular command handler makes adding your own custom commands a breeze.
-   **Built with Modern Tools:** Leverages the speed of Vite with the power of React and TypeScript.

---

## 🛠️ Tech Stack

-   **Framework:** React
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Routing:** React Router
-   **Data Fetching:** TanStack Query
-   **Notifications:** Sonner

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have **Node.js** (version 18 or higher) and **npm** installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/yourusername/terminal-portfolio.git](https://github.com/yourusername/terminal-portfolio.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd terminal-portfolio
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```

Your portfolio should now be running on `http://localhost:5173/`.

---

## ⌨️ Available Commands

| Command    | Description                             |
| :--------- | :-------------------------------------- |
| `help`     | Lists all available commands.           |
| `about`    | Displays information about me.          |
| `projects` | Shows my past work and projects.        |
| `contact`  | Shows how to get in touch with me.      |
| `clear`    | Clears all output from the terminal.    |

---

## ✨ Customization

Making this portfolio your own is easy:

1.  **Personal Information:** Update your personal data, bio, and project details by modifying the content within the command files located in `src/commands/`. For example, edit `about.tsx` to change your bio.

2.  **Add New Commands:** Create a new component file in `src/commands/` following the existing structure. Then, import and add it to your main command handler logic.

3.  **Styling:** Tweak the color scheme and fonts by editing the CSS variables in `src/index.css` and modifying your `tailwind.config.ts`.

---

## 📦 Building for Production

To create a production-ready build of your portfolio, run:

```sh
npm run build
