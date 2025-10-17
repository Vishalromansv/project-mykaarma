# 🤖 AI Shopping Chat Agent (Mobiles)

A conversational AI agent built with Next.js, Google Gemini, and Supabase that helps users discover, compare, and learn about mobile phones.

---

## ✨ Features

* **Natural Language Search:** Understands user queries for phones based on budget, brand, and specific features (e.g., "best camera phone under ₹30k").
* **Database-Grounded Responses:** Uses a Supabase (PostgreSQL) database to provide factual, accurate product information, preventing AI hallucinations.
* **Interactive UI:** A clean, responsive chat interface built with Next.js that displays both text responses and rich product cards with images.
* **Safety & Adversarial Handling:** Gracefully refuses off-topic or malicious requests to ensure a focused and safe user experience.

---

## 🚀 Live Demo

You can try out the live version of the chat agent here:
**[Link to your Vercel or other deployment URL]**

### Screenshot

![Chat Agent Screenshot]([link_to_your_screenshot.png])

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (React)
* **Backend:** Next.js API Routes
* **AI Model:** Google Gemini (`gemini-1.5-pro-latest`) with Function Calling
* **Database:** Supabase (PostgreSQL)

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/[your-repo-name].git
    cd [your-repo-name]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add the following keys.

    ```
    # Supabase credentials (from Project Settings > API)
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

    # Google AI Studio API Key
    GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🏗️ Architecture Overview

This project uses a **Retrieval-Augmented Generation (RAG)** architecture.

1.  The user sends a message from the **Next.js frontend**.
2.  The backend API route receives the message and sends it to the **Google Gemini** model.
3.  Gemini interprets the user's intent and decides to call the `find_phones` function.
4.  The backend executes this function, which queries the **Supabase** database for relevant phone data.
5.  The retrieved data is sent back to Gemini.
6.  Gemini uses this data to generate a final, natural-language response, which is then sent back to the user.

This ensures that the AI's responses are always based on the factual data stored in the database.
