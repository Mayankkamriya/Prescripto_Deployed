
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    exclude: ['jsonwebtoken', 'cloudinary'],
    esbuildOptions: {
      // Fix for handling ".html" files correctly
      loader: {
        '.html': 'text', // Use the "text" loader for HTML files
      },
    },
  },
  plugins: [
    react(), // Enables React plugin for Vite
  ],
  build: {
    rollupOptions: {
      input: './index.html', // Specify the entry point for Rollup
    },
  },
  server: {
    port: 5174, // Development server port
  },
});





// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         '.html': 'file', // Ensures .html files are processed correctly
//       },
//     },
//   },
//   plugins: [
//     react(), // Enables React support
//   ],
//   css: {
//     postcss: './postcss.config.js', // Use your existing PostCSS config if applicable
//   },
//   server: {
//     port: 5174, // Set the development server port
//   },
// });




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import html from '@rollup/plugin-html';

// export default defineConfig({
//   plugins: [
//     react(),
//     html({
//       inject: false, // Adjust this based on your HTML template requirements
//     }),
//   ],
//   css: {
//     postcss: './postcss.config.js',
//   },
//   server: {
//     port: 5174,
//   },
//   build: {
//     rollupOptions: {
//       external: ['@mapbox/node-pre-gyp', 'mock-aws-s3', 'aws-sdk', 'nock'],
//       plugins: [],
//     },
//   },
// });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
  
//   css: {
//     postcss: './postcss.config.js',
//   },

//   server:{port:5174}
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
