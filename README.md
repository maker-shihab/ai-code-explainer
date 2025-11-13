# 🤖 AI Code Explainer

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/) [![DeepSeek API](https://img.shields.io/badge/DeepSeek_API-gray?style=for-the-badge&logo=openai)](https://www.deepseek.com/)

A simple web application that translates complex code into plain, easy-to-understand English. Paste any code snippet and get an instant explanation, powered by the DeepSeek Coder API.

---

## ✨ Features

- **Simple Interface:** A clean, minimal UI with a single text area for pasting code.
- **Instant Explanations:** Get real-time, human-like explanations for any code snippet.
- **Multi-Language Support:** Understands JavaScript, Python, React, SQL, Regex, and more.
- **Modern Tech:** Built with the latest Next.js 14 (App Router) and Server Actions.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Platform:** [Vercel](https://vercel.com/)
- **AI:** [DeepSeek API](https://www.deepseek.com/) (deepseek-coder model)

---

## 🛠️ Getting Started

Follow these instructions to get a copy of the project running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (Version 18.x or newer)
- A DeepSeek API Key (Get yours from the [DeepSeek Platform](https://platform.deepseek.com/))

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/ai-code-explainer.git](https://github.com/your-username/ai-code-explainer.git)
cd ai-code-explainer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a new file named `.env.local` in the root of your project and add your DeepSeek API key.

```bash
DEEPSEEK_API_KEY="YOUR_SECRET_DEEPSEEK_API_KEY_HERE"
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [Local Host](http://localhost:3000) with your browser to see the application.

## ⚙️ How It Works

1.  The user enters their code into the `<textarea>` on the client-side page (`app/page.tsx`).
2.  Clicking the "Explain" button triggers a **Next.js Server Action** (`explainCode`) defined in `app/actions.ts`.
3.  This Server Action (running securely on the server) fetches the `DEEPSEEK_API_KEY` from environment variables.
4.  It makes a `POST` request to the DeepSeek API, sending the user's code and a system prompt.
5.  The AI's response is parsed and returned directly to the client component.
6.  The client component updates its state with the explanation, displaying it to the user.

---

## 📜 License

This project is licensed under the MIT License.
