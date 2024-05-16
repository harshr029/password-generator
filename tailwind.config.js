/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily:{
        spartan: ["League Spartan"," sans-serif"]
      },

      colors:{
        dkviolet: "hsl(268, 75%, 9%)",
        ltviolet: "hsl(268, 47%, 21%)",
        ltviolet2: "hsl(281, 89%, 26%)",
        vbviolet: "hsl(285, 91%, 52%)",
        vbviolet2: "hsl(290, 70%, 36%)",
      
        vbyellow: "hsl(52, 100%, 62%)",
      
      
        plwhite: "hsl(0, 0%, 100%)",
      
        vbcyan: "hsl(176, 100%, 44%)",
        vbcyan2: "hsl(177, 92%, 70%)",
        dktext: "hsl(198, 20%, 13%)",
      }
    },
  },
  plugins: [],
}

