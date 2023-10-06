import { UserProvider } from "./userContext";
import "./globals.css";
 
import { ThemeProvider } from "@material-tailwind/react";
 
export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider> 
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}