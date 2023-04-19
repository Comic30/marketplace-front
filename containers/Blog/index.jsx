import Breadcumb from '../../components/Breadcumb'
import BlogArea from '../../components/BlogArea'
import dataBlog from '../../data/data-containers/data-Blog.js'

// import '../../assets/css/profile.css'

const BlogContainer = () => {

  return (
    <>
		<Breadcumb  
		          namePage='Blog'
		          title='Blog'
		/>

		<section className="blog-area section-padding-100">
			<div className="container">
				<BlogArea data={dataBlog} />
				<div className="row">
					<div className="col-12">
					  <div className="dream-pagination wow fadeInUp" data-wow-delay="0.2s">
					    <nav>
					      <ul className="pagination justify-content-center">
					    	{Array(7).fill().map((_i , key) => (
					    		<li key={key} className="page-item"><a className="page-link" href="#">{key + 1}</a></li>
					    	))}
					      </ul>
					    </nav>
					  </div>
					</div>
				</div>
			</div>
		</section>
    </>
  );
}

export default BlogContainer;