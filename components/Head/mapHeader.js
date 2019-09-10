import React, { useState, useEffect, memo } from 'react';
import Link from '../Link';
import { ReactComponent as MicroSvg } from '../../static/svg/microphone.svg';
import { ReactComponent as MenuSvg } from '../../static/svg/menu-line.svg';
const Header = props => {
	return (
		<div className="container map_header">
			<div className="row">
				<div className="col d-block text-center">
					<MenuSvg className="svg_icon menu" />
					<input type="text" className="form-control searchInput" placeholder="دنبال چه هستید؟" />
					<MicroSvg className="svg_icon microphone" />
				</div>
			</div>
		</div>
	);
};
export default memo(Header);