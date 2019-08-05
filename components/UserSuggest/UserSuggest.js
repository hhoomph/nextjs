import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
const UserSuggest = () => {
  return (
    <div className="d-flex mb-1">
      <div className="p-2 bd-highlight">
        <img src="../../static/img/user.png" alt="" className="rounded-circle img-thumbnail border-warning" />
      </div>
      <div className="p-2 bd-highlight">
        <img src="../../static/img/profile.png" alt="" className="rounded-circle img-thumbnail border-warning" />
      </div>
      <div className="p-2 bd-highlight">
        <img src="../../static/img/user.png" alt="" className="rounded-circle img-thumbnail border-warning" />
      </div>
      <div className="p-2 bd-highlight">
        <img src="../../static/img/profile.png" alt="" className="rounded-circle img-thumbnail border-warning" />
      </div>
    </div>
  );
};
export default memo(UserSuggest);