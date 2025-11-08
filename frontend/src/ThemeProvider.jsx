import useTheme from "./hooks/useTheme";

export default function ThemeProvider({ children }) {
  useTheme(); // initialize theme on first render
  return children;
}
