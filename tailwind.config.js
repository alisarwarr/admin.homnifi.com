/** @type {import('tailwindcss').Config} */
export default {
  // content: [
  //   "./index.html",
  //   "./src/**/*.{js,ts,jsx,tsx}",
  // ],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B9FDA',
        primaryLight: '#89D5ED',
        primaryExtraLight: '#7FC9FF',
        primaryDark: '#0E173F',
        primaryGrey: '#7D7D7D',
        blueGrey: '#D5DBE0',
        redDanger: '#FF2727',
        redSecondary: '#FF6363',
        borderBlue: '#D9E4F1',
        borderLightGray: '#EAECF0',
        cardPrimaryText: '#101828',
        cardSecondaryText: '#616161',
        nodeShadow: '#D9D9D9',
        defaultBlack: '#292929',
        secondaryBlack: '#121212',
        borderGray: '#E7E7E7',
        searchColor: '#667085',
        selectedLightBlue: '#F5FAFF',
        darkBlue: '#24288E',
        primaryPurple: '#7583FF',
        extraDarkBlue: '#0D327D',
        lightGray: '#E6EBFF',
        extralightGray: '#F2F6FF',
        midBlue: '#5CA8FF',
        secondaryblue: '#3B89FF',
        alertBrown: '#8D6E00',
        pageBackground: '#FAFAFA',
        primaryGreen: '#5BAC0A',
        primaryRed: '#F23838',
        searchBorder: '#D0D5DD',
        cardBg: '#FBFBFB',
        tableRow: '#AAAAAA',
      },
      backgroundImage: {
        authLayout: "url('/public/img/Auth/layout1.jpg')",
        'gradient-primary-blue':
          'linear-gradient(242.75deg, #88D5EE 32.62%, #6ECBEB 39.58%, #47BBE8 52.35%, #28AFE6 65.12%, #11A6E4 76.73%, #04A1E3 88.33%, #00A0E3 98.78%)',
        'card-header-gradient':
          'linear-gradient(90deg, #1B9FDA 0%, #0E173F 100%)',

        'card-gradient-glow':
          'linear-gradient(360deg, #84D3ED 100%, #1B9FDA 10%)',
      },
      animation: {
        'slow-spin': 'spin 3s linear infinite',
        'reverse-spin': 'reverse-spin 3s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      screens: {
        xs: '425px',
        xxs: '320px',
        screen890: '890px',
        screen990: '990px',
        screen1070: '1070px',
        screen1460: '1460px',
        screen1640: '1640px',
        screen1780: '1780px',
      },
      borderRadius: {
        stepperShape: '25% 25% 25% 25% / 40% 0% 40% 0%',
      },
      fontFamily: {
        baumans: ['Baumans', 'system-ui'],
      },
      dropShadow: {
        dashboardDropShadow: '0px 4px 43px 0px rgba(239, 238, 238, 0.43)',
      },
    },
  },
  plugins: [],
};
