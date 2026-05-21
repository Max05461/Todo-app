# Todo App

A simple Todo app with localStorage persistence, served via Express and deployable to Render.

## Features

- Add, complete, and delete todos
- Filter by All / Active / Completed
- Clear all completed at once
- Data persists in `localStorage` — survives page refreshes
- Responsive UI with Bootstrap 5

## Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML, CSS, Vanilla JS |
| UI Framework | Bootstrap 5 + Bootstrap Icons |
| Backend | Node.js + Express (static file server) |
| Storage | Browser `localStorage` |

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:10000`

## Deploy to Render

1. Push this repo to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Render will assign a public URL automatically

The server binds to `0.0.0.0:PORT` using the `PORT` environment variable Render injects at runtime.
