# Server environment variables

Set these in your shell or in a local `.env` (if allowed):

- `PORT`: Server port (default: 3000)
- `CORS_ORIGIN`: e.g. `http://localhost:5173` for your React dev server
- `GITHUB_TOKEN` (optional): Personal Access Token to increase GitHub rate limits

Example (macOS/Linux):

```bash
PORT=3000 CORS_ORIGIN=http://localhost:5173 GITHUB_TOKEN=ghp_xxx npm run start --prefix ./server
```


