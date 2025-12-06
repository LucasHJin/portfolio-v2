import { EB_Garamond, DM_Sans } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer';

// light, normal, semibold
const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm'
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-garamond'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className={`${garamond.variable} ${dm.variable} h-screen p-12 flex flex-col`}>
        <div className="flex-1 min-h-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
