/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },    
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Noto Sans", "serif",],
      },
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
      },
      colors: {
        'ioai': {
                '50': '#f6f6f7',
                '100': '#efeff0',
                '200': '#e2e1e4',
                '300': '#d3d2d7',
                '400': '#bcb9c0',
                '500': '#a9a6ae',
                '600': '#94919a',
                '700': '#817c86',
                '800': '#69666d',
                '900': '#57555a',
                '950': '#333135',
            },      
      },      
    },    
  },
  plugins: [
  ],  
}
