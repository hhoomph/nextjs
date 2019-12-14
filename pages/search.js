import React, { Fragment, useReducer, useState, useContext, useRef, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loader/Loader";
import Loading2 from "../components/Loader/Loading";
import fetchData from "../utils/fetchData";
import Auth from "../components/Auth/Auth";
import "../scss/components/mapPage.scss";
import { ToastContainer, toast } from "react-toastify";
import { FaGripLines, FaArrowUp } from "react-icons/fa";
import "react-toastify/scss/main.scss";
const Nav = dynamic({
  loader: () => import("../components/Nav/Nav"),
  loading: () => <Loading />,
  ssr: true
});
const UserSuggest = dynamic({
  loader: () => import("../components/UserSuggest/UserSuggest2"),
  loading: () => <Loading />,
  ssr: true
});
const MapComponent = dynamic({
  loader: () => import("../components/Map/Map"),
  loading: () => <Loading />,
  ssr: false
});
const MapHeader = dynamic({
  loader: () => import("../components/Head/mapHeader"),
  loading: () => <Loading />,
  ssr: true
});
const SearchPage = dynamic({
  loader: () => import("../components/Search/Search"),
  loading: () => <Loading />,
  ssr: true
});
const FirstCatProductsRow = dynamic({
  loader: () => import("../components/CatProductsRow/FirstCatProductsRow"),
  loading: () => <Loading />,
  ssr: true
});
let lastScrollTop = 0;
const Page = props => {
  toast.configure({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  const [view, setView] = useState(1);
  const allCategories = props.allCategories.data || [];
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [mapRadius, setMapRadius] = useState(1);
  const [mapPeople, setMapPeople] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [topScale, setTopScale] = useState(0.9);
  const [lastScroll, setLastScroll] = useState(0);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const currentUserLatLong = props.result.data !== undefined && props.result.data !== null && props.result.data.lat != 0 ? [props.result.data.lat, props.result.data.long] : [34.635059, 50.880823];
  const scrollButton = useRef();
  const scrollDiv = useRef();
  const peopleDiv = useRef();
  const scrollHandle = () => {
    const st = document.documentElement.scrollTop;
    const t = window.innerHeight - 80;
    const m = scrollButton.current.clientHeight;
    //console.log(st, t, m);
    // if (st >= lastScrollTop) {
    //   // downscroll code
    //   if (st > 22 && st < 450) {
    //     let t = window.innerHeight - 50;
    //     window.scrollTo(0, t);
    //     //window.scrollTo(0, 590);
    //   } else if (st < 22) {
    //     window.scrollTo(0, 0);
    //   }
    // } else {
    //   // upscroll code
    //   if (st < 500) {
    //     window.scrollTo(0, 0);
    //   }
    // }
    // lastScrollTop = st;
    if (st >= 26 && st < m) {
      // scrollDiv.current.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'start'
      // });
      window.scrollTo(0, t);
      //window.scrollTo(0, 590);
    } else if (st < 26) {
      window.scrollTo(0, 0);
    } else if (st < t && st > m) {
      window.scrollTo(0, 0);
      //window.scrollTo(0, 590);
    }
  };
  const handleScrollSize = () => {
    let mass = Math.min(2.5, 1.12 - 0.001 * document.documentElement.scrollTop);
    setTopScale(mass);
    //lastScrollTop = document.documentElement.scrollTop;
  };
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = e => {
    setSearchValue(e.current.value);
  };
  const showFirstCatProductsRow = allCategories.map(cat => <FirstCatProductsRow key={cat.id} id={cat.id} title={cat.titel} />);
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScrollSize);
  //   return () => window.removeEventListener("scroll", handleScrollSize);
  // }, []);
  useEffect(() => {
    if (!props.isServer) {
      setView(1);
    }
  }, [props.date]);
  const selectUser = id => {
    console.log("object");
    const data = people.map(user => {
      if (user.id === id) {
        setActiveUser(user);
        return { ...user, active: true };
      } else {
        return { ...user, active: false };
      }
    });
    setPeople(data);
  };
  const showPepole = people.map((user, index) => {
    const userImg = user.userAvatar !== null ? `https://api.qarun.ir/${user.userAvatar}` : "/static/img/no-userimage.svg";
    return (
      <UserSuggest
        key={user.id}
        id={user.id}
        active={user.active}
        image={userImg}
        userName={user.userName}
        displayName={user.displayName}
        phoneNumber={user.phoneNumber}
        isFollowed={user.isFollowed}
        lat={user.lat}
        long={user.long}
        distance={user.distance}
        onClick={() => selectUser(user.id)}
        onTouchStartCapture={() => selectUser(user.id)}
      />
    );
  });
  const getMapPeople = async () => {
    setLoading(true);
    const Result = await fetchData(
      "User/U_Friends/PeopleInMap",
      {
        method: "POST",
        body: JSON.stringify({
          lat: 34.635059,
          long: 50.880823,
          closestKM: mapRadius
        })
      },
      props.ctx
    );
    if (Result.isSuccess) {
      let data = [];
      // Get User That have Minimum Distance to loggined user
      const userWithMinDistance = Result.data.model.reduce((min, usr) => {
        return usr.distance < min.distance ? usr : min;
      }, Result.data.model[0]);
      data = Result.data.model.map(user => {
        if (user.id === userWithMinDistance.id) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });
      setMapPeople(data);
    }
    setLoading(false);
  };
  const getClosestPeople = async () => {
    setLoading(true);
    const Result = await fetchData(
      "User/U_Friends/ClosestPeople",
      {
        method: "POST",
        body: JSON.stringify({
          lat: 0,
          long: 0,
          page: page,
          pageSize: 6
        })
      },
      props.ctx
    );
    if (Result.isSuccess) {
      let data = [];
      if (people.length < 1) {
        // Get User That have Minimum Distance to loggined user
        const userWithMinDistance = Result.data.model.reduce((min, usr) => {
          return usr.distance < min.distance ? usr : min;
        }, Result.data.model[0]);
        setActiveUser(userWithMinDistance);
        data = Result.data.model.map(user => {
          if (user.id === userWithMinDistance.id) {
            return { ...user, active: true };
          } else {
            return { ...user, active: false };
          }
        });
      } else {
        data = Result.data.model.map(user => {
          return { ...user, active: false };
        });
      }
      setPeople(people.concat(data));
      if (Result.data.model.length >= 6) {
        setPage(page + 1);
      } else {
        //setTimeout(() => setIsFetching(true), 300);
      }
    } else if (Result.message != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    } else if (Result.error != undefined) {
      setTimeout(() => setIsFetching(false), 200);
    }
    setLoading(false);
  };
  function handleXScroll() {
    //console.log(peopleDiv.current.scrollLeft);
    if (peopleDiv.current.scrollLeft > 5 || isFetching) return;
    setIsFetching(true);
  }
  useEffect(() => {
    peopleDiv.current.addEventListener("scroll", handleXScroll);
    return () => peopleDiv.current.removeEventListener("scroll", handleXScroll);
  }, []);
  useEffect(() => {
    getClosestPeople();
  }, []);
  useEffect(() => {
    getMapPeople();
  }, [mapRadius]);
  useEffect(() => {
    if (!isFetching) return;
    getClosestPeople();
  }, [isFetching]);
  switch (view) {
  case 1:
    return (
      <>
        <Nav />
        <MapHeader setView={setView} searchValue={searchValue} handleSearchChange={handleSearchChange} />
        <div className="container mb-1 rtl p-0 mapContainer">
          <MapComponent id="map_id" searchValue={searchValue} users={mapPeople} activeUser={activeUser} setMapRadius={setMapRadius} center={currentUserLatLong} />
        </div>
        <div className="container mb-1 rtl" ref={scrollButton} onTouchEndCapture={scrollHandle}>
          <div className="row">
            <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
              <FaGripLines className="font-icon scroller_line" onClick={scrollHandle} onTouchEndCapture={scrollHandle} style={{ transform: `scale(${topScale})` }} />
            </div>
            <div className={"col-12 d-flex justify-content-start p-0 pt-4 map_user_suggestion"} ref={peopleDiv}>
              {showPepole}
              {loading && (
                <div className="p-1 text-center col-4 user_div">
                  <Loading2 />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="categories_rows" ref={scrollDiv} onTouchEndCapture={scrollHandle}>
          {showFirstCatProductsRow}
        </div>
      </>
    );
    break;
  case 2:
    return (
      <>
        <Nav />
        <SearchPage setView={setView} />
      </>
    );
    break;
  default:
    return (
      <>
        <Nav />
        <MapHeader setView={setView} searchValue={searchValue} handleSearchChange={handleSearchChange} />
        <div className="container mb-1 rtl p-0 mapContainer">
          <MapComponent id="map_id" searchValue={searchValue} users={mapPeople} activeUser={activeUser} setMapRadius={setMapRadius} center={currentUserLatLong} />
        </div>
        <div className="container mb-1 rtl" ref={scrollButton} onTouchEndCapture={scrollHandle}>
          <div className="row">
            <div className="col-12 d-flex justify-content-center pt-0 scroller_div">
              <FaGripLines className="font-icon scroller_line" onClick={scrollHandle} onTouchEndCapture={scrollHandle} style={{ transform: `scale(${topScale})` }} />
            </div>
            <div className={"col-12 d-flex justify-content-start p-0 pt-4 map_user_suggestion"} ref={peopleDiv}>
              {showPepole}
              {loading && (
                <div className="p-1 text-center col-4 user_div">
                  <Loading2 />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="categories_rows" ref={scrollDiv} onTouchEndCapture={scrollHandle}>
          {showFirstCatProductsRow}
        </div>
      </>
    );
    break;
  }
};
Page.getInitialProps = async function(context) {
  const req = context.req;
  // Get Current User Data
  const result = await fetchData(
    "User/U_Account/Profile",
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
  return { result, allCategories, isServer: !!req, date: new Date() };
};
export default Auth(Page);