import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class PWADocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Script
            id="sumo-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(s,u,m,o,j,v){j=u.createElement(m);v=u.getElementsByTagName(m)[0];j.async=1;j.src=o;j.dataset.sumoSiteId='4b800e27eea612e6d3ecdf5cda10edf062f7acc6527f41af42de4ab2d9d9a7c5';v.parentNode.insertBefore(j,v)})(window,document,'script','//load.sumo.com/');`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default PWADocument;
