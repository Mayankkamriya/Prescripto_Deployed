
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './index.html',
//     './src/**/*.{js,jsx,ts,tsx}', // Make sure to include your source files
//   ],
//   theme: {
//     extend: {
//       colors:{
//                 'primary': "#5F6FFF"
//               }
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#5F6FFF"
      }
    },
  },
  plugins: [],
}
