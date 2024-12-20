export default [
  {
      files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
      rules: {
          "prefer-const": "off",
          "no-constant-binary-expression": "error"
      },
  }
];