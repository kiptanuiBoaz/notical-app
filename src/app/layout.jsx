import './globals.css'
import ThemeRegistry from './ThemeRegistry';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';




export const metadata = {
  title: 'notical',
  description: 'Your connections at a central place',
}

// app/layout.js
export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Navbar />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}