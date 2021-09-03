const EnterList = ({ blogs }) => {

  return(
<div className="Pol-List">
{ blogs.map((blog) => (
  <div className="blog-list" key = { blog.id }>
  <a href={`/blogs/${ blog.id }`}>
  <div className="each-blog">
  <h5>10:54 PM</h5>
    <h2>{ blog.title }</h2>
    <p>{ blog.body }</p>
    <h3>author: { blog.author }</h3>
  </div>
  </a>
  </div>
))
}

</div>
  )
}





export default EnterList;
