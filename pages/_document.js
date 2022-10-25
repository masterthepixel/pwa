import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class PWADocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Script
            id="sumo-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(s,u,m,o,j,v){j=u.createElement(m);v=u.getElementsByTagName(m)[0];j.async=1;j.src=o;j.dataset.sumoSiteId='4b800e27eea612e6d3ecdf5cda10edf062f7acc6527f41af42de4ab2d9d9a7c5';v.parentNode.insertBefore(j,v)})(window,document,'script','//load.sumo.com/');`,
            }}
          />
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="c7beeb1d-1d4b-4cbb-af4b-5a18a7086b1a"
            data-blockingmode="auto"
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-906KKM7QX3"
          />
          <Script
            id="google-analytics"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-906KKM7QX3');`,
            }}
          />
          <Script
            id="google-tag-manager"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KZDJTBH');`,
            }}
          />
          <Script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/c7beeb1d-1d4b-4cbb-af4b-5a18a7086b1a/cd.js"
            async
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default PWADocument;
