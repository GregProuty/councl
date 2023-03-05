const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  // classes that will be included in bundle even if not detected in code
  // (ex: dynamic classnames)
  safelist: [
    {
      pattern:
        /bg-ak-(|blue|yellow|grey)-(100|200|300|400|500|600|700|800|900)/,
      variants: ["hover"],
    },
  ],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      // colors shades - lightest 100, main 500, darkest 900
      colors: {
        "ak-blue-100": "#EDF3F7",
        "ak-blue-200": "#DBE7EF",
        "ak-blue-300": "#CADBE8",
        "ak-blue-400": "#B8CFE0",
        "ak-blue-500": "#D0E3EF",
        "ak-blue-600": "#8AA5B9",
        "ak-blue-700": "#6E879A",
        "ak-blue-800": "#526A7A",
        "ak-blue-900": "#364C5B",
        "ak-grey-100": "#F4F4F4",
        "ak-grey-500": "#C9C9C9",
        "ak-grey-font": "#787878",
        "ak-yellow-100": "#FEFBDF",
        "ak-yellow-200": "#FDF7BF",
        "ak-yellow-300": "#FBF2A0",
        "ak-yellow-400": "#FAEE80",
        "ak-yellow-500": "#FBCD58",
        "ak-yellow-600": "#D1C44D",
        "ak-yellow-700": "#A89E3A",
        "ak-yellow-800": "#807728",
        "ak-yellow-900": "#575115",
        "aragon-blue": "#38425C",
        "aragon-dark-blue":"#293148",
        "aragon-light-blue": "#43506E",
        "snapshot-green": "#57B375",
      },
      // fontFamily: {
      //   'sans': ['ui-sans-serif', 'system-ui'],
      // },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 0.3,
          },
          "50%": {
            opacity: 1,
          },
        },
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
    },
    fontSize: {
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      base: "1rem",
      sm: "0.8rem",
      xl: "1.25rem",
    },
  },
}
