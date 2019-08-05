import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import css from '../scss/style.scss';
const Api = props => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>
              <img className={css.circle_img} src={show.avatar} width="50" height="50" />
              {show.first_name} - {show.last_name}{' '}
            </a>
          </Link>
        </li>
      ))}
    </ul>{' '}
    <hr />
    <div>
      Click{' '}
      <span style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => Router.push('/about')}>
        here
      </span>{' '}
      to see About Page
    </div>
  </div>
);
Api.getInitialProps = async function() {
  const res = await fetch('https://reqres.in/api/users');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.data.length}`);
  return {
    shows: data.data
  };
};
export default Api;