import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|code|dropdown|image|input|kbd|link|listbox|navbar|select|snippet|spinner|toggle|ripple|menu|divider|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ "var(--font-sans)" ],
        mono: [ "var(--font-mono)" ],
      },
    },
  },
  darkMode: "class",
  plugins: [ nextui() ],
}
