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
    // Add Cart Count Context Later
    // const GetCartCount = await fetchData(
    //   'User/U_Cart/GetAll',
    //   {
    //     method: 'GET'
    //   },
    //   context
    // );
    // if (GetCartCount !== undefined && GetCartCount.isSuccess) {
    //   let cData = GetCartCount.data || [];
    //   cartDispatch({ type: 'refresh', payload: cData });
    // } else if (GetCartCount !== undefined && GetCartCount.message != undefined) {
    // } else if (GetCartCount !== undefined && GetCartCount.error != undefined) {
    // }
    if (router.route !== "/login") {
      //console.log(router);
    }
    return { pageProps, accessToken };
  }
  constructor() {
    super();
    this.baseHub = new HubConnectionBuilder()
      .withUrl("https://api.qarun.ir/baseHub")
      .configureLogging(LogLevel.Error)
      .build();
    //this.connection2 = new HubConnectionBuilder().withUrl("https://chatappwithsignalr.azurewebsites.net/chatHub").build();
  }
  async start() {
    try {
      await this.baseHub.start();
      await this.statusHub.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }
  componentDidMount() {
    // this.baseHub = new HubConnectionBuilder()
    //   .withUrl("https://api.qarun.ir/baseHub")
    //   .configureLogging(LogLevel.Error)
    //   .build();
    this.statusHub = new HubConnectionBuilder()
      .withUrl("https://api.qarun.ir/statusHub", {
        accessTokenFactory: () => {
          return this.props.accessToken;
        }
      })
      .configureLogging(LogLevel.Error)
      .build();
    // Manually reconnect hub
    // this.baseHub.onclose(async () => {
    //   await this.start();
    // });
    // this.statusHub.onclose(async () => {
    //   await this.start();
    // });
    // Start to signalR hub
    this.baseHub
      .start({ withCredentials: false })
      .then(function() {
        console.log("baseHub connected");
      })
      .catch(err => console.error(err.toString()));
    this.statusHub
      .start({ withCredentials: false })
      .then(function() {
        console.log("statusHub connected");
      })
      .catch(err => console.error(err.toString()));
    //this.connection2.start({ withCredentials: false }).catch(err => console.error(err.toString()));
    // this.baseHub
    //   .invoke("GetUserStatus", "oomph")
    //   .then(function(e) {
    //     console.log(e);
    //   })
    //   .catch(err => console.error(err.toString()));
  }
  componentWillUnmount() {}
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component baseHub={this.baseHub} statusHub={this.statusHub} {...pageProps} />
      </>
    );
  }
}
export default MyApp;