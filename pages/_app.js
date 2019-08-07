import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
export const WindowsWidthContext = React.createContext();
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     windowsWidth: undefined
  //   };
  // }
  // handleWindowSizeChange = () => {
  //   this.setState({ windowsWidth: window.innerWidth });
  // };
  // componentDidMount() {
  //   window.addEventListener('resize', this.handleWindowSizeChange);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowSizeChange);
  // }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {/* <WindowsWidthContext.Provider value={{ windowsWidth: this.state.windowsWidth }}> */}
        <Head>
          <title>قارون</title>
        </Head>
        <Component {...pageProps} />
        {/* </WindowsWidthContext.Provider> */}
      </Container>
    );
  }
}
export default MyApp;