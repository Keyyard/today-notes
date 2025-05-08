
# Today Notes

Today Notes is a modern, minimalist daily task manager built with **Next.js 14 App Router**, **React**, **TailwindCSS**, **Prisma**, and **PostgreSQL (Supabase)**. Tasks expire in 24 hours, encouraging focus and productivity—no more endless backlogs!


<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js_14-000000?logo=next.js" alt="Next.js 14" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-61dafb?logo=react" alt="React" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Styling-TailwindCSS-38bdf8?logo=tailwindcss" alt="Styling: TailwindCSS" />
  </a>
  <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/ORM-Prisma-2d3748?logo=prisma" alt="ORM: Prisma" />
  </a>
  <a href="https://supabase.com/">
    <img src="https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ecf8e?logo=supabase" alt="Database: Supabase PostgreSQL" />
  </a>
  <a href="https://next-auth.js.org/">
    <img src="https://img.shields.io/badge/Auth-NextAuth_Google-4285f4?logo=google" alt="Auth: NextAuth (Google)" />
  </a>
</p>


---

## 🧠 Why "Today Notes"?

**Today Notes** is based on the psychology of immediacy: we procrastinate less when tasks are urgent and actionable. By limiting your list to today, you focus on what matters now. Tasks expire after 24 hours, so you can’t put them off—tomorrow is a new slate.

---

## ✨ Features

- **Google Auth**: Secure login with Google via NextAuth.
- **Task CRUD**: Add, complete, re-add, and auto-expire tasks.
- **Optimistic UI**: Instant feedback for all actions.
- **Theme Switcher**: Light/dark mode with persistent preference.
- **Global State**: Context + custom hooks for task management.
- **Type Safety**: Centralized types, strict API contracts.
- **Error Handling**: User-friendly errors and defensive state.
- **Prisma ORM**: PostgreSQL (Supabase) for robust persistence.
- **Modern Styling**: TailwindCSS, accessible, responsive.
- **Developer Experience**: Barrel exports, clean imports, clear docs.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 App Router, React, TailwindCSS
- **Backend**: Next.js API Routes, Prisma, PostgreSQL (Supabase)
- **Auth**: NextAuth (Google provider)
- **State**: React Context, custom hooks
- **Notifications**: react-hot-toast
- **Testing**: Jest, React Testing Library (see `src/__tests__`)

---

## 🖼️ Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Home</b></td>
      <td align="center"><b>Task List</b></td>
      <td align="center"><b>Dark Mode</b></td>
      <td align="center"><b>Expired Tasks</b></td>
    </tr>
    <tr>
      <td><img src="public/medias/1.png" width="240" alt="Home" /></td>
      <td><img src="public/medias/2.png" width="240" alt="Task List" /></td>
      <td><img src="public/medias/3.png" width="240" alt="Dark Mode" /></td>
      <td><img src="public/medias/4.png" width="240" alt="Expired Tasks" /></td>
    </tr>
  </table>
</div>

---

## 📝 Usage

- **Login via Google:** Click the `Login with Google` button.
- **Add Task:** Click the floating `+` and enter your task.
- **Mark as Done:** Click a task to complete it.
- **Re-add Expired:** Click an expired task to move it back to active.
- **Expiry:** Tasks expire after 24h, deleted after 48h.
- **Theme:** Toggle light/dark mode with the switcher.

---

## 🧩 Architecture & Best Practices

- **Atomic Components:** UI is broken into small, reusable pieces.
- **Centralized Types:** All types in `src/types` for consistency.
- **Repository Pattern:** Data access is abstracted for testability.
- **Service Layer:** Business logic is separated from UI and data.
- **Context & Hooks:** Global state and logic via context/providers and custom hooks.
- **Barrel Exports:** Clean, maintainable imports.
- **Error Handling:** Defensive code, user-friendly errors.
- **Client/Server Boundaries:** "use client" only where needed.

---

## Architecture Flow

```
1. User interacts with UI (e.g., adds a task).
                  v
2. Service layer (frontend) sends request to API (e.g., TaskAPIService).
                  v
3. API Route/Handler receives the request and calls the repository.
                  v
4. Repository layer interacts with the database (e.g., TaskRepository).
                  v
5. Database layer (e.g., PostgreSQL) stores the data.
```

## 📄 License

MIT. See [LICENSE](LICENSE).

---

**Enjoy a focused, productive day with Today Notes!**