import type { Metadata } from "next";
import { EB_Garamond, DM_Sans } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next"

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

export const metadata: Metadata = {
  title: {
    default: "Lucas Jin",
    template: "%s | Lucas Jin"
  },
  description: "Computer Science student at University of Waterloo, inspired by the intersection of Software Engineering and AI. ML engineer at Wat.AI FlockRL. Building scalable projects, RAG systems, and web platforms.",
  keywords: [
    "Lucas Jin",
    "Machine Learning Engineer",
    "Software Engineer",
    "Computer Science",
    "University of Waterloo",
    "Wat.AI",
    "Neural Networks",
    "Web Development",
    "React",
    "Next.js",
    "Portfolio"
  ],
  authors: [{ name: "Lucas Jin" }],
  creator: "Lucas Jin",
  publisher: "Lucas Jin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lucasjin.ca'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CS @ Waterloo",
    description: "Computer Science student at University of Waterloo, inspired by the intersection of Software Engineering and AI. ML engineer at Wat.AI FlockRL. Building scalable projects, RAG systems, and web platforms.",
    url: 'https://lucasjin.ca',
    siteName: 'Lucas Jin',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/preview-image.png', 
        width: 1200,
        height: 630,
        alt: 'Lucas Jin Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lucas Jin",
    description: "Computer Science student at University of Waterloo, inspired by the intersection of Software Engineering and AI.",
    images: ['/preview-image.png'], 
    creator: '@lucashjin', 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  //verification: {
    //google: 'your-google-verification-code', // Get from Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  //},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className={`${garamond.variable} ${dm.variable} h-screen p-8 md:p-12 flex flex-col`}>
        <div className="flex-1 min-h-0">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
