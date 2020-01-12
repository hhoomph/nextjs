import React, { Fragment, useContext, useRef, useState, useEffect, useReducer } from "react";
// import '../scss/style.scss';
import dynamic from "next/dynamic";
import fetchData from "../utils/fetchData";
import Nav from "../components/Nav/Nav";
import Loading from "../components/Loader/Loading";
import Auth from "../components/Auth/Auth";
import IndexHeader from "../components/Head/IndexHeader";
import { CartCountContext } from "../context/context";
import { cartCountReduser } from "../context/reducer";
import Modal from "react-bootstrap/Modal";
// Use AMP
// import { useAmp } from 'next/amp';
// export const config = { amp: 'hybrid' };
const UserSuggest = dynamic({
  loader: () => import("../components/UserSuggest/UserSuggest"),
  loading: () => <Loading />,
  ssr: true
});
const FirstUserSuggest = dynamic({
  loader: () => import("../components/UserSuggest/FirstUserSuggest"),
  loading: () => <Loading />,
  ssr: true
});
const CatProductsRow = dynamic({
  loader: () => import("../components/CatProductsRow/CatProductsRow"),
  loading: () => <Loading />,
  ssr: true
});
const FirstCatProductsRow = dynamic({
  loader: () => import("../components/CatProductsRow/FirstCatProductsRow"),
  loading: () => <Loading />,
  ssr: true
});
const Banners = dynamic({
  loader: () => import("../components/Banner/Banners"),
  loading: () => <Loading />,
  ssr: false
});
const ProductsRow = dynamic({
  loader: () => import("../components/ProductRow/ProductRow"),
  loading: () => <Loading />,
  ssr: true
});
function Page(props) {
  let Following = props.Following.data || [];
  const noFriends = Following.length <= 0 ? true : false;
  const [marketAround, setMarketAround] = useState(props.GetMarketAround.data || []);
  const [friendsMarket, setFriendsMarket] = useState(props.FriendsMarket.data || []);
  const Profile = props.Profile.data || null;
  const isLogin = Profile !== null ? true : false;
  const lat = Profile !== null && Profile.lat !== undefined && Profile.lat !== null ? Profile.lat : 0;
  const long = Profile !== null && Profile.long !== undefined && Profile.long !== null ? Profile.long : 0;
  const allCategories = props.allCategories.data || [];
  const cartData = props.cartData.data || [];
  const getCartCount = cartData
    .map(cart => cart.cartDetailsSelectDtos)
    .reduce((acc, val) => acc.concat(val), [])
    .reduce((acc, val) => {
      const { count } = val;
      return acc + count;
    }, 0);
  const [cartCount, cartCountDispatch] = useReducer(cartCountReduser, getCartCount);
  if (Profile !== null) {
    const selfUser = {
      displayName: Profile.displayName,
      id: Profile.id,
      isFollowed: true,
      phoneNumber: Profile.phoneNumber,
      qerun: Profile.qerun,
      userAvatar: Profile.avatar,
      userName: Profile.userName,
      self: true
    };
    Following = [selfUser, ...Following];
  }
  const [suggestionUsers, setSuggestionUsers] = useState([]);
  const getUserFromClosestPeople = async () => {
    const getClosestPeople = await fetchData(
      "User/U_Friends/ClosestPeople",
      {
        method: "POST",
        body: JSON.stringify({
          lat: lat,
          long: long,
          page: 1,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (getClosestPeople !== undefined && getClosestPeople.isSuccess) {
      const allUsers = suggestionUsers.concat(getClosestPeople.data.model);
      // Remove duplicate Users in array with id
      const res = [];
      const map = new Map();
      for (const item of allUsers) {
        if (!map.has(item.userName)) {
          map.set(item.userName, true); // set any value to Map
          res.push(item);
        }
      }
      setSuggestionUsers(res);
    }
  };
  const getSuggestionUsers = async () => {
    const getUserFollowers = await fetchData(
      "User/U_Friends/Follower",
      {
        method: "GET"
      },
      props.ctx
    );
    if (getUserFollowers !== undefined && getUserFollowers.isSuccess) {
      const allUsers = suggestionUsers.concat(getUserFollowers.data);
      // Remove duplicate Users in array with id
      const res = [];
      const map = new Map();
      for (const item of allUsers) {
        if (!map.has(item.userName)) {
          map.set(item.userName, true); // set any value to Map
          res.push(item);
        }
      }
      setSuggestionUsers(res);
    }
  };
  const getMarketAround = async () => {
    const GetMarketAround = await fetchData(
      "User/U_Product/GetMarketAround",
      {
        method: "POST",
        body: JSON.stringify({
          filters: "New",
          categoryId: 1,
          page: 1,
          pageSize: 10
        })
      },
      props.ctx
    );
    if (GetMarketAround !== undefined && GetMarketAround.isSuccess) {
      setMarketAround(GetMarketAround.data);
    }
  };
  const getFriendsMarket = async () => {
    const FriendsMarket = await fetchData(
      "User/U_Product/FriendsMarket",
      {
        method: "POST",
        body: JSON.stringify({
          page: 1,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (FriendsMarket !== undefined && FriendsMarket.isSuccess) {
      setFriendsMarket(FriendsMarket.data);
    }
  };
  useEffect(() => {
    if (noFriends && Profile !== null) {
      getUserFromClosestPeople();
      //getSuggestionUsers();
    } else {
      getMarketAround();
      getFriendsMarket();
    }
  }, []);
  // Determine Server Or Browser env
  if (typeof window !== "undefined" && window.document !== undefined) {
    //console.log('browser');
    //screen.orientation.lock("portrait-primary");
    //screen.orientation.lock("portrait");
    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", e => {
      deferredPrompt = e;
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  } else if (process) {
    //console.log('node');
  }
  const showFirstCatProductsRow = allCategories.map(cat => <FirstCatProductsRow key={cat.id} id={cat.id} title={cat.titel} isLogin={isLogin} />);
  return (
    <CartCountContext.Provider value={cartCountDispatch}>
      <IndexHeader cartCount={cartCount} />
      <Nav cartCount={cartCount} />
      {noFriends && Profile !== null ? (
        <>
          <FirstUserSuggest users={suggestionUsers} />
          <CatProductsRow products={marketAround} />
          {showFirstCatProductsRow}
        </>
      ) : Profile !== null ? (
        <>
          <UserSuggest users={Following} /> <CatProductsRow products={marketAround} />
          <ProductsRow products={friendsMarket} />
        </>
      ) : (
        showFirstCatProductsRow
      )}
    </CartCountContext.Provider>
  );
}
Page.getInitialProps = async function(context) {
  // Get Current User Info
  const Profile = await fetchData(
    "User/U_Account/Profile",
    {
      method: "GET"
    },
    context
  );
  // Get User's That Current User Followed Them
  const Following = await fetchData(
    "User/U_Friends/Following",
    {
      method: "GET"
    },
    context
  );
  // Get Products Around Current User
  const GetMarketAround = await fetchData(
    "User/U_Product/GetMarketAround",
    {
      method: "POST",
      body: JSON.stringify({
        filters: "New",
        categoryId: 1,
        page: 1,
        pageSize: 10
      })
    },
    context
  );
  // Get Products From User's Friends
  const FriendsMarket = await fetchData(
    "User/U_Product/FriendsMarket",
    {
      method: "POST",
      body: JSON.stringify({
        page: 1,
        pageSize: 6
      })
    },
    context
  );
  // Get Shopping Cart
  const cartData = await fetchData(
    "User/U_Cart/GetAll",
    {
      method: "GET"
    },
    context
  );
  // Get All Categories
  const allCategories = await fetchData(
    "Common/C_Category/GetAllParentAsync",
    {
      method: "GET"
    },
    context
  );
  return { Following, GetMarketAround, FriendsMarket, cartData, Profile, allCategories };
};
//export default Auth(Page);
export default Page;