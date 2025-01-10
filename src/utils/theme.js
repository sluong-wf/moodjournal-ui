import { createTheme } from "@mui/material/styles";

export const themes = {
  light: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FF7043", // Coral
      },
      secondary: {
        main: "#00B8D4", // Cyan
      },
      tertiary: {
        main: "#FFEB3B", // Yellow
      },
      text: {
        primary: "#212121", // Dark Gray
        secondary: "#757575", // Gray
      },
      background: {
        default: "#FFFFFF", // White
        paper: "#F5F5F5", // Light Gray
        light: "#F0F0F0", // Subtle off-white for cards or sections
        dark: "#E0E0E0",  // Light gray for borders or dividers
      },
      accent: "#FF4081", // Pink
    },
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#673AB7", // Deep Purple
      },
      secondary: {
        main: "#8BC34A", // Lime Green
      },
      tertiary: {
        main: "#FF5722", // Deep Orange
      },
      text: {
        primary: "#FFFFFF", // White
        secondary: "#B0BEC5", // Light Gray
      },
      background: {
        default: "#121212", // Black
        paper: "#1F1F1F", // Dark Gray
        light: "#424242", // Darker gray for cards or sections
        dark: "#333333",  // Dark border for dividers
      },
      accent: "#CF6679", // Red
    },
  }),
  nature: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#2E7D32", // Darker Forest Green
      },
      secondary: {
        main: "#81C784", // Soft Green
      },
      tertiary: {
        main: "#FF7043", // Coral
      },
      text: {
        primary: "#1B5E20", // Deep Green
        secondary: "#4CAF50", // Vibrant Green
      },
      background: {
        default: "#E8F5E9", // Very Light Green
        paper: "#C8E6C9", // Light Mint Green
        light: "#F1F8E9", // Soft Green for cards or sections
        dark: "#388E3C",  // Dark Green for borders or dividers
      },
      accent: "#FFEB3B", // Bright Yellow
    },
  }),
  ocean: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0288D1", // Deep Blue
      },
      secondary: {
        main: "#00BCD4", // Cyan
      },
      tertiary: {
        main: "#FFC107", // Yellow
      },
      text: {
        primary: "#01579B", // Navy Blue
        secondary: "#0288D1", // Medium Blue
      },
      background: {
        default: "#FFF9C4", // Light Yellow (Sandy)
        paper: "#FFF3E0",   // Soft Beige
        light: "#FFEB3B",   // Golden Yellow (for cards or sections)
        dark: "#F57F17",    // Dark Amber (for borders or dividers)
      },
      accent: "#FFC107", // Yellow
    },
  }),
  sunset: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FF7043", // Coral
      },
      secondary: {
        main: "#FFEB3B", // Yellow
      },
      tertiary: {
        main: "#FF5722", // Bright Orange
      },
      text: {
        primary: "#BF360C", // Burnt Orange
        secondary: "#E64A19", // Warm Orange
      },
      background: {
        default: "#FFF3E0", // Cream
        paper: "#FFE0B2", // Light Peach
        light: "#FFCC80", // Lighter peach for cards or sections
        dark: "#FF5722",  // Darker orange for borders or dividers
      },
      accent: "#FF6F00", // Amber
    },
  }),
  pastel: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FFCDD2", // Light Pink
      },
      secondary: {
        main: "#FFABAB", // Soft Red
      },
      tertiary: {
        main: "#B2EBF2", // Light Cyan
      },
      text: {
        primary: "#333333", // Charcoal
        secondary: "#666666", // Gray
      },
      background: {
        default: "#FFF1F3", // Soft Pink
        paper: "#FFF0F5",   // Light Pink
        light: "#F48FB1",   // Light Coral Pink (for cards or sections)
        dark: "#F06292",    // Deep Pink (for borders or dividers)
      },
      accent: "#D4A5A5", // Mauve
    },
  }),
  futuristic: createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00E5FF", // Neon Cyan
      },
      secondary: {
        main: "#651FFF", // Neon Purple
      },
      tertiary: {
        main: "#FFEA00", // Neon Yellow
      },
      text: {
        primary: "#FFFFFF", // White
        secondary: "#BDBDBD", // Light Gray
      },
      background: {
        default: "#212121", // Deep Black
        paper: "#424242", // Dark Gray
        light: "#616161", // Darker gray for cards or sections
        dark: "#757575",  // Darker gray for borders or dividers
      },
      accent: "#FFEA00", // Neon Yellow
    },
  }),
};

