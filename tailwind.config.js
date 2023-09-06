const screens = {
  xs: '0px', // phone
  sm: '576px', // phone rotated
  md: '768px', // tablet
  lg: '992px', // tablet rotated / small desktop
  xl: '1200px', // big desktop
  xxl: '1400px',
  '3xl': '1800px',
  dd: '813px' // hide right side for main layout
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: screens,
      width: screens,
      backgroundImage: {
        'auth_bg_desktop':
          "url('/public/assets/images/background-desktop-auth.png')",
        'auth_bg_mobile':
          "url('/public/assets/images/background-mobile-auth.png')",
        'gradient1':
          'linear-gradient(135deg, #83A5F2 0%, #204ECF 58.85%)',
        'gradient2':
          'linear-gradient(135deg, #EA9836 0%, #F9A187 58.85%)',
        'gradient3':
          'linear-gradient(135deg, #F9A187 0%, #F26749 58.85%)',
        'gradient4': 'linear-gradient(135deg, #204ECF 0%, #F26749 0.01%, #F9A187 100%)',
        'gradient5':
          'linear-gradient(135deg, #83A5F2 0%, #EA9836 90.85%)',
        "buttongradient": "linear-gradient(272deg, #204ECF 10.29%, #F9A197 92.77%)",
        "buttongradientBlack": "linear-gradient(272deg, #080815 10.29%, rgba(8, 8, 21, 0.50) 92.77%)",
      },
      colors: {
        primary: {
          delft: {
            dark: "#204ECF",
            medium: "rgba(32, 78, 207, 0.90)",
            light: "rgba(32, 78, 207, 0.70)"
          },
          watermelons: {
            dark: "#F26749",
            medium: "rgba(242, 103, 73, 0.50)",
            light: "rgba(242, 103, 73, 0.30)"
          },
          cornflower: {
            dark: "#83A5F2",
            medium: "rgba(131, 165, 242, 0.50)",
            light: "rgba(131, 165, 242, 0.30)"
          },
        },
        secondary: {
          charlotte: "#FCDED6",
          wimlex: "#EA9836",
          pink: "#F9A187",
        },
        high: {
          dark: "#080815",
          light: "#B3FFD1"
        },
        piano: {
          dark: "9DD7B4",
          medium: "rgba(8, 8, 21, 0.90)",
          light: "rgba(8, 8, 21, 0.50)"
        },
        rae: "#F6F3F0",
        nimbus: "#F0ECE7",
        dentist: "#FDFCFB",
        white: "#fff",
        glass: "rgba(255, 255, 255, 0.50)",
        black: "#000",
        oldBurgundy: '#362A2F',
        carrot: '#EA9836'
      },
      fontSize: {
        subtitle1: [
          '12px',
          {
            fontWeight: '400',
            lineHeight: '16px'
          }
        ],
        subtitle2: [
          '12px',
          {
            fontWeight: '600',
            lineHeight: '16px'
          }
        ],
        subtitle3: [
          '14px',
          {
            fontWeight: '400',
            lineHeight: '20px'
          }
        ],
        subtitle4: [
          '14px',
          {
            fontWeight: '600',
            lineHeight: '20px'
          }
        ],
        subtitle5: [
          '16px',
          {
            fontWeight: '400',
            lineHeight: '20px'
          }
        ],
        subtitle6: [
          '16px',
          {
            fontWeight: '600',
            lineHeight: '20px'
          }
        ],
        subtitle7: [
          '18px',
          {
            fontWeight: '400',
            lineHeight: '24px'
          }
        ],
        subtitle8: [
          '18px',
          {
            fontWeight: '600',
            lineHeight: '24px'
          }
        ],
      },
      boxShadow: {
        primary: '0px 4px 0px 0px #F0ECE7',
        active: '0 4px 0 0 rgba(50, 83, 202, 1)',
        verified: '0 4px 0 0 rgba(179, 255, 209, 1)',
        error: '0 4px 0 0 rgba(242, 103, 73, 1)',
        button: '2px 2px 0px 0px #83A5F2',
        buttonBlack: '2px 2px 0px 0px rgba(8, 8, 21, 0.50)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'tilt-warp': ['Tilt Warp', 'cursive']
      }
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
