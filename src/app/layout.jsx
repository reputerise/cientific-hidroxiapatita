import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer"
import Header from "../components/Header";
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: 'Cientific Hidroxiapatita | Futerman International Products',
  description: "Somos el único laboratorio sudamericano que diseña y elabora dispositivos médicos en base a ácido hialurónico reticulado e hidroxiapatita de calcio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Metadata (opcional, si usas metadata en las páginas) */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>

      {/* <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GHPS101LNJ"
      />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GHPS101LNJ');
        `}
      </Script> */}


      <body className={`${montserrat.className} montserrat relative`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
