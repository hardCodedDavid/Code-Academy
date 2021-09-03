import { useState } from "react";
import  useFetch from "./useFetch";
import BlogList from "./BlogList";

const Home = () => {
const { data: blogs , pending, error } = useFetch('http://localhost:8000/blogs')

  return(
<div className="home-component">
<h1 className="h1-blog">All Blogs</h1>
{ blogs && <BlogList blogs={ blogs } />}
{ pending && <div className="loading">Loading...</div>}
{ error && <div className="Errors">{ error }</div> }
</div>
)}
export default Home;
