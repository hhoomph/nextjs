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
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="description" content="App created for test development" />
          <link rel="manifest" href="../manifest.json" />
          <link rel="shortcut icon" href="../favicon.ico" />
          <meta name="theme-color" content="#f96d01" />
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