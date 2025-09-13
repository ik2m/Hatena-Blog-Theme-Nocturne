import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: ["src/nocturne.css"],
      output: {
        assetFileNames: ({ name }) => name,
      },
    },
    outDir: "build",
    cssMinify: false,
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer(),
        {
          postcssPlugin: "add-charset",
          Once(root) {
            /** @charset "utf-8"; がビルド時に消えてしまうので追記する**/
            // すでに @charset がある場合は追加しない
            const hasCharset = root.nodes.some(
              (node) => node.type === "atrule" && node.name === "charset",
            );
            if (!hasCharset) {
              root.prepend({
                name: "charset",
                params: '"utf-8"',
                type: "atrule",
              });
            }
          },
        },
      ],
    },
  },
});
