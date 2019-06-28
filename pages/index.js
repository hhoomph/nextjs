import { withAmp } from 'next/amp';
import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import Head from 'next/head';
import { Image } from '../components/image';
function PostLink(props) {
  return (
    <li>
      <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  );
}
const Index = () => (
  <Layout>
    {/* Add tag to Head */}
    <Head>
      <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
      <title>Index Page</title>
    </Head>
    <p>Hello Next.js</p>
    <p>Welcome to AMP + Next.js.</p>
    <Image src="https://placehold.it/120" width="120" height="120" />
    <div>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="hello-nextjs" title="Hello Next.js" />
        <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
        <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
      </ul>
    </div>
  </Layout>
);
//export default Index;
export default withAmp(Index, { hybrid: true });