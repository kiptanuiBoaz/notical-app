import './globals.css'
import ThemeRegistry from './ThemeRegistry.jsx';
import { Navbar } from '@/components/Navbar';
import ReduxProvider from '@/redux/Reduxprovider';

export const metadata = {
  title: 'Notycal | Sync Notion Dabases with Google Calendar',
  description: 'A central place to connect Google Calendar and Notion',
}

// app/layout.js
export default function RootLayout(props) {
  const { children } = props;
  return (
    <ReduxProvider>
      <html lang="en">
        <body>
          <ThemeRegistry >
            {children}
          </ThemeRegistry>
        </body>
      </html>
    </ReduxProvider>
  );
}




// E3KJqdIm4HTYEgut