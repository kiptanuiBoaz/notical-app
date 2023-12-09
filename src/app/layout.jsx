import './globals.css'
import ThemeRegistry from './ThemeRegistry';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ReduxProvider from '@/redux/Reduxprovider';





export const metadata = {
  title: 'Notycal | Sync Notion Dabases with Google Calendar',
  description: 'A central place to connect Google Calendar and Notion',
}

// app/layout.js
export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeRegistry >
            <Navbar />
            {children}
          </ThemeRegistry>
        </ReduxProvider>

      </body>
    </html>
  );
}