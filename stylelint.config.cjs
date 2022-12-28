module.exports = {
  extends: [
    "stylelint-config-recommended-scss",
    "stylelint-config-css-modules",
    "stylelint-config-prettier",
    "stylelint-config-clean-order",
  ],
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
  },
  overrides: [
    {
      files: ["src/**/*.module.scss"],
      rules: {
        "selector-class-pattern": [
          "^([a-z][a-z0-9]*)([A-Z][a-z0-9]+)*$",
          {
            message: (selector) =>
              `Expected class selector "${selector}" to be camelCase`,
          },
        ],
      },
    },
  ],
};
