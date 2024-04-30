import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default defineConfig([
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/bundle.cjs",
                format: "umd",
                name: 'zhooks',
                sourcemap: true,
                globals: {
                    react: "react",
                },
            },
            {
                file: "dist/bundle.mjs",
                format: "esm",
                sourcemap: true,
                globals: {
                    react: "react",
                },
            },
        ],

        plugins: [typescript()],
        watch: {
            exclude: "node_modules/**",
        },
        external: ["react"], // 项目中引用的第三方库
    },
    {
        input: "./src/index.ts",
        output: [
            {
                file: "dist/bundle.d.ts",
                format: "esm",
            },
        ],
        plugins: [dts()],
    },
]);
