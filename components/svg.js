import React from 'react';
import { ReactComponent as SvgImage } from '../public/static/img/logo.svg';
export default props => {
  //const url = props.url ? props.url : './../logo.svg';
  //return <div>{url}</div>;
  // import must load in componentDidMount
  // import({url})
  //     .then(({ SvgImage }) => {
  //         return <div>{url}</div>;
  //     })
  //     .catch(err => {
  //         return <div>Error on load svg image</div>;
  //     });
  //
  // async function importSvg(url) {
  //     url = url ? url : './../logo.svg';
  //     try {
  //         //import { ReactComponent as SvgImage } from './../logo.svg';
  //         let SvgImage = await import(url);
  //         return SvgImage;
  //     } catch (e) {
  //         return <div>Error on load svg image</div>;
  //     }
  // }
  // importSvg(props.url)
  //     .then(SvgImage => {
  //         return <SvgImage />;
  //     })
  //     .catch(err => {
  //         return err;
  //     });
  //
  // Code With Lazy And Suspense :
  // import React, {lazy, Suspense, Fragment} from 'react';
  // const SvgImage = lazy(() => { import { ReactComponent } from './../logo.svg'; }
  // return (
  //   <Suspense fallback={
  //   <Fragment>
  //   Loading...
  //   </Fragment>
  //   }>
  //     <SvgImage />
  //   </Suspense>
  // );
  return <SvgImage className={props.className} />;
};