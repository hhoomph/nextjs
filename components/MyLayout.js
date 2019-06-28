import Header from './header';
import css from '../scss/style.scss';
export default function Layout(props) {
  return (
    <div className="layout">
      <Header />
      {props.children}
    </div>
  );
}