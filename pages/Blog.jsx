import dynamic from "next/dynamic";
const Header = dynamic(
  () => {
    return import('../layouts/Header');
  },
  { ssr: false }
);
import BlogContainer from '../containers/Blog';
import Footer from '../layouts/Footer';

const Blog = () => {
  return (
    <>
      <Header Title='Blog1' />
      <BlogContainer />
      <Footer />
    </>
  );
}

export default Blog;

