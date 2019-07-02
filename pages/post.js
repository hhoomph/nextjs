import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout.js';
const Post = props => (
  <Layout>
    <h1>{props.data.first_name}  {props.data.last_name}</h1>
    <p>Email Address = {props.data.email.replace(/<[/]?p>/g, '')}</p>
    <img src={props.data.avatar} />
  </Layout>
);
Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://reqres.in/api/users/1`);
  const result = await res.json();
  const data = result.data;
  console.log(`Fetched show: ${data.first_name}`);
  return { data };
};
export default Post;