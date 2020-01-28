import React, { Fragment, useState, useEffect, memo } from "react";
import Link from "../Link";
const Sort = props => {
  const handleSort = props.handleSort;
  const [sorts, setSorts] = useState([
    { id: 0, name: "تازه", filter: "New", active: true },
    { id: 1, name: "تخفیف", filter: "Discount", active: false },
    { id: 2, name: "پرفروش", filter: "BestSeller", active: false },
    { id: 3, name: "محبوب", filter: "Popular", active: false }
    // { id: 4, name: "فعال", filter: "Online", active: false }
  ]);
  const toggleActiveSort = index => {
    sorts[index];
    const sortObject = sorts.filter(s => sorts.indexOf(s) == index)[0];
    sortObject.active = true;
    const otherSortObject = sorts
      .filter(s => sorts.indexOf(s) !== index)
      .map(s => {
        s.active = false;
        return s;
      });
    const all = otherSortObject.concat(sortObject).sort((a, b) => a.id - b.id);
    setSorts(all);
  };
  const [classO, setclassO] = useState("nav-link");
  const showSorts = sorts.map(sort => {
    let classN = sort.active ? "nav-link active" : "nav-link";
    return (
      <li key={sort.id} className="nav-item">
        <a
          className={classN}
          onClick={() => {
            handleSort(sort.filter);
            toggleActiveSort(sort.id);
            setclassO("nav-link");
          }}
        >
          {sort.name}
        </a>
      </li>
    );
  });
  return (
    <ul className="nav">
      {showSorts}
      <li key={4} className="nav-item">
        <a
          className={classO}
          onClick={() => {
            props.getOnlineProducts();
            const otherSortObject = sorts.map(s => {
              s.active = false;
              return s;
            });
            const all = otherSortObject.sort((a, b) => a.id - b.id);
            setSorts(all);
            setclassO("nav-link active");
          }}
        >
          فعال
        </a>
      </li>
    </ul>
  );
};
export default memo(Sort);