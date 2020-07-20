module.exports = {
    parserOptions: {
        parser: "babel-eslint",
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
        ecmaVersion: 2017,
        sourceType: "module",
        ecmaFeatures: {
          modules: true,
          legacyDecorators: true
        }
      },
      env: {
       jest: true,
       browser: true
      },
      settings: {
       "import/resolver": {
        node: {
         extensions: [".js", ".jsx", ".ts", ".tsx", ".eslintrc"]
        },
        webpack: {
         config: {
          resolve: {
           alias: {
            src: "src"
           }
          }
         }
        }
       }
      },
      plugins: [
        "vue",
        "@typescript-eslint"
      ],
      extends: [
        "eslint:recommended",
        "plugin:vue/base",
        "typescript"
      ]
}