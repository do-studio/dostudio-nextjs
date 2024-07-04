/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs':'280px',
      'sm': '400px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
      '2xl' : '1500px'},
    extend: {
      padding:{
        'allpadding':'4.5rem'
      },
     boxShadow:{
      'shadow1':'0px 10px 15px 9px rgba(0,0,0,0.1)'
     },
     backgroundColor:{

        dashclr:'#232b33',
        mainbg:'rgb(255, 255, 255)'
     },
     colors:{
      mainclr:'rgb(0, 0, 0)',
      primarygreen:'#AFFE00',
     }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'),],
  
};
