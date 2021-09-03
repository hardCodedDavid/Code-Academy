import { useParams } from "react-router-dom";
import  useFetch from "./useFetch";
import { useHistory } from 'react-router-dom';

const BlogDetail = () => {
const { id } = useParams();
const { data: blogs, pending, error } = useFetch('http://localhost:8000/blogs/' + id);
const history = useHistory();

const handleDelete = () => {
fetch('http://localhost:8000/blogs/' + id, {
  method: "DELETE"
  })
    .then(() => {
    history.push('/')
})
}
  return(
    <div className="details">
  { blogs && (
    <article>
    <h1 className="blog-title"> { blogs.title } </h1>
     <p className="blog-body">{ blogs.body }</p>
    <button class="delete" onClick={handleDelete}>delete blog</button>
    </article>
  ) }
  { pending && <div className="loading">Loading...</div>}
  { error && <div>{ error }</div> }
  </div>
  )
}
export default BlogDetail;
