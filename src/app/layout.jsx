import { AuthProvider } from './AuthProvider';
import './globals.css'
import ThemeRegistry from './ThemeRegistry.jsx';
import { Navbar } from '@/components/Navbar';
import ReduxProvider from '@/redux/Reduxprovider';
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: 'Notycal | Sync Notion Dabases with Google Calendar',
  description: 'A central place to connect Google Calendar and Notion',
}


export default function RootLayout(props) {
  const { children } = props;
  return (
    <ReduxProvider>
      <AuthProvider>
        <html lang="en" className={roboto.className}>
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