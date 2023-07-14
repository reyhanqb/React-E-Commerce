/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT"


export default withMT({
  content: [
    "./index.html",
    './src/*.{vue,js,jsx}', './src/**/*.{js,jsx}',
    "../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [],
});

