import { AuthProvider } from './AuthProvider';
import './globals.css'
import ThemeRegistry from './ThemeRegistry.jsx';
import { Navbar } from '@/components/Navbar';
import ReduxProvider from '@/redux/Reduxprovider';

export const metadata = {
  title: 'Notycal | Sync Notion Dabases with Google Calendar',
  description: 'A central place to connect Google Calendar and Notion',
}


export default function RootLayout(props) {
  const { children } = props;
  return (
    <ReduxProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <ThemeRegistry >
              {children}
            </ThemeRegistry>
          </body>
        </html>
      </AuthProvider>

    </ReduxProvider>
  );
}




// E3KJqdIm4HTYEgut