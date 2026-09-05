// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // The React Compiler immutability/refs rules treat Reanimated shared
    // values (`sharedValue.value = ...`) and gesture worklets as illegal
    // render-time mutations. That mutation is the intended, compiler-safe
    // Reanimated API, so these rules are disabled for the animation modules.
    files: [
      "src/components/ui/button.tsx",
      "src/components/calibration/**/*.tsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
]);

