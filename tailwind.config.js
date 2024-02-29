/** @type {import('tailwindcss').Config} */
import teste from 'tw-elements/dist/plugin.cjs';

export default {
   content: ['./src/**/*.tsx', './node_modules/flowbite/**/*.js'],
   theme: {
      extend: {
         colors: {
            primary: '#6358DC',
         },
         fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
         },
      },
   },
   // eslint-disable-next-line no-undef
   plugins: [teste, require('flowbite/plugin')],
};
