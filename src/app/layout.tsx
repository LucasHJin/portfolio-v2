import { EB_Garamond, DM_Sans } from 'next/font/google';
import "./globals.css";

// light, normal, semibold
const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
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
    <html lang="en">
      <body className={`${garamond.variable} ${dm.variable}`}>
        {children}
      </body>
    </html>
  );
}
