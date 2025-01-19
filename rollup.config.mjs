import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      postcss({
        extract: "styles.css",
        minimize: true,
      }),
      url({
        include: ["**/*.png", "**/*.jpg", "**/*.gif", "**/*.mp3", "**/*.svg"],
        limit: 10485760, // Files smaller than this (in bytes) will be inlined as base64
        fileName: "[name][extname]", // Keeps original filename and extension
        publicPath: "assets/", // Optional: adds a public path to your assets
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declarationDir: "dist",
      }),
      terser(),
    ],
    external: ["react", "@xyflow/react"],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
