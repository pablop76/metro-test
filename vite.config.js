import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Aplikacja stoi pod https://pablop76.github.io/metro-test/ — ta sama sciezka,
  // ktora wczesniej wynikala z pola "homepage" w package.json. Trafia do
  // import.meta.env.BASE_URL, uzywanego przy budowaniu sciezek do grafik pytan.
  base: "/metro-test/",

  build: {
    // gh-pages publikuje katalog "build" — zostawiamy nazwe z czasow CRA,
    // zeby skrypt deploy dzialal bez zmian
    outDir: "build",
    sourcemap: false,
  },

  server: {
    port: 3000,
    open: false,
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    css: false,
  },
});
