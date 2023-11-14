/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx}" //path 설정
    ],
    theme: {
      extend: {
        backgroundImage: {
          'image': "url('./image/bg.png')",
        }
      },
    },
    plugins: [],
  }
  
  