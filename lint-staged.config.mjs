export default {
  '*.{js,cjs,mjs,ts,tsx,jsx,json,css,md}': ['biome format --write'],
  '*.{js,cjs,mjs,ts,tsx,jsx}': ['eslint --fix'],
};
