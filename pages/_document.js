import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    if (typeof window !== "undefined" && window.document !== undefined) {
      screen.orientation.lock("portrait");
    }
    return (
      <Html lang="fa">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
          <meta name="apple-mobile-web-app-status-bar-style" content="light" />
          <link rel="apple-touch-icon" href="../static/img/splash.png" />
          <link rel="apple-touch-startup-image" href="../static/img/splash.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="description" content="قارون" />
          <link rel="manifest" href="../manifest.json" />
          <link rel="shortcut icon" href="../favicon.ico" />
          <meta name="theme-color" content="#fff" />
          <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;