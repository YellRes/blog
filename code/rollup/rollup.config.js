import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import html from "@rollup/plugin-html";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import { generateHtmlPlugin } from "./plugin/html.js";

/** @type {import('rollup').RollupOptions} */
export default {
  // 当前入口 popup.tsx
  input: [
    "src/popup/popup.tsx",
    "src/options/options.tsx",
    "src/content/content.js",
  ],
  output: {
    dir: "./dist",
    entryFileNames: "[name].js",
    format: "es",
    // 手动拆出 react react-dom
    manualChunks: {
      react: ["react"],
      "react-dom": ["react-dom"],
    },
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
      plugins: [],
    }),
    html(generateHtmlPlugin("popup")),
    html(generateHtmlPlugin("options")),
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
      preventAssignment: true,
    }),
    copy({
      targets: [{ src: "public/**", dest: "dist/" }],
    }),
  ],
};
