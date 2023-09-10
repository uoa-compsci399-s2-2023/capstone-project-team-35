/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "foreground-dark": "#707070",
        "foreground-light": "#818181",
        "status-light-green": "#C6E268",
        "status-gray": "#D1D1D1",
        "status-blue": "#5C96E6",
        "status-yellow": "#FBC229",
        "status-orange": "#FC7F40",
        "status-red": "#FF5E49",
        "background-light": "#FFFFFF",
        "background-dark": "#F8F8F8",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
        "primary": "#FC7F40",
                
        "secondary": "#FBC229",
                
        "accent": "#FBC229",
                
        "neutral": "#18182f",
                
        "base-100": "#ffffff",
                
        "info": "#3abff8",
                
        "success": "#36d399",
                
        "warning": "#fbbd23",
                
        "error": "#f87272",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}