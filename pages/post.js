import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
// Use AMP
import { useAmp } from 'next/amp';
export const config = { amp: 'hybrid' };
const Post = props => (
  <div>
    <h1>
      {props.data.first_name} {props.data.last_name}
    </h1>
    <p>Email Address = {props.data.email.replace(/<[/]?p>/g, '')}</p>
    <img src={props.data.avatar} />
  </div>
);
Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  const result = await res.json();
  const data = result.data;
  console.log(`Fetched show: ${data.first_name}`);
  return { data };
};
export default Post;