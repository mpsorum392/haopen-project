import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Cache hashed assets long-term (Vite fingerprints these filenames)
app.use('/assets', express.static(path.join(__dirname, "dist", "assets"), {
  maxAge: '1y',
  immutable: true,
}));

// Serve other static files (images, fonts, etc.) normally
app.use(express.static(path.join(__dirname, "dist"), { index: false }));

// Always serve a fresh index.html — never let it be cached
app.get("*", (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});