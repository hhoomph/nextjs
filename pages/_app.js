import React, { useReducer } from "react";
import App from "next/app";
import Head from "next/head";
import fetchData from "../utils/fetchData";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { CartCountContext } from "../context/context";
import { cartCountReduser } from "../context/reducer";
import getHost from "../utils/get-host";
import BottomNav from "../components/Nav/BottomNav";
import "../scss/style.scss";
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let accessToken = "";
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (nextCookie(ctx).accessToken !== undefined) {
      accessToken = nextCookie(ctx).accessToken;
    }
    if (router.route !== "/login") {
      //console.log(router);
    }
    return { pageProps, accessToken };
  }
  constructor() {
    super();
    this.state = {
      orderCount: 0,
      eventCount: 0,
      userStatus: false
    };
    this.baseHub = new HubConnectionBuilder()
      .withUrl("https://api.qarun.ir/baseHub", {
        accessTokenFactory: () => {
          return this.props.accessToken;
        }
      })
      .configureLogging(LogLevel.Error)
      .build();
    // this.statusHub = new HubConnectionBuilder()
    //   .withUrl("https://api.qarun.ir/statusHub", {
    //     accessTokenFactory: () => {
    //       return this.props.accessToken;
    //     }
    //   })
    //   .configureLogging(LogLevel.Error)
    //   .build();
    // this.baseHub = this.baseHub.bind(this);
    // this.statusHub = this.statusHub.bind(this);
  }
  async start() {
    try {
      await this.baseHub.start();
      await this.statusHub.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 4000);
    }
  }
  componentDidMount() {
    // this.baseHub = new HubConnectionBuilder()
    //   .withUrl("https://api.qarun.ir/baseHub", {
    //     accessTokenFactory: () => {
    //       return this.props.accessToken;
    //     }
    //   })
    //   .configureLogging(LogLevel.Error)
    //   .build();
    // this.statusHub = new HubConnectionBuilder()
    //   .withUrl("https://api.qarun.ir/statusHub", {
    //     accessTokenFactory: () => {
    //       return this.props.accessToken;
    //     }
    //   })
    //   .configureLogging(LogLevel.Error)
    //   .build();
    // Manually reconnect hub
    // this.baseHub.onclose(async () => {
    //   await this.start();
    // });
    // this.statusHub.onclose(async () => {
    //   await this.start();
    // });
    // Start to signalR hub
    // this.baseHub
    //   .start({ withCredentials: false })
    //   .then(function() {
    //     // console.log("baseHub connected");
    //   })
    //   .catch(err => console.error(err.toString()));
    // this.baseHub.onclose(async () => {
    //   await this.start();
    // });
    // setTimeout(() => {
    //   this.baseHub
    //     .invoke("GetUserStatus", "hhoomph")
    //     .then(function(e) {})
    //     .catch(err => console.error(err.toString()));
    //   this.baseHub.on("GetStatus", res => {
    //     console.log(res);
    //     this.setState({ userStatus: res });
    //   });
    // }, 3000);
    // this.statusHub
    //   .start({ withCredentials: false })
    //   .then(function() {
    //     console.log("statusHub connected");
    //   })
    //   .catch(err => console.error(err.toString()));
    // this.statusHub.onclose(async () => {
    //   await this.start();
    // });
    // setTimeout(() => {
    //   this.statusHub.on("EventsCount", res => {
    //     console.log(res);
    //     this.setState({ eventCount: res });
    //   });
    //   // this.statusHub.on("OrderCount", res => {
    //   //   console.log(res);
    //   //   this.setState({ orderCount: res });
    //   // });
    // }, 6000);
  }
  componentWillUnmount() {}
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component
          baseHub={this.baseHub}
          _tkn={this.props.accessToken}
          {...pageProps}
        />
        <BottomNav/>
      </>
    );
  }
}
export default MyApp;