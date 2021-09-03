import { useState } from "react";
import  useFetch from "./useFetch";
import EnterList from "./EnterList";

const Entertainment = () => {
const { data: blogs , pending, error } = useFetch('http://localhost:8000/blogs')

  return(
<div className="home-component">
<h1 className="h1-blog">Entertainment</h1>
{ blogs && <EnterList blogs={ blogs.filter((blog) => blog.options === "Entertainment") } />}
{ pending && <div className="loading">Loading...</div>}
{ error && <div className="Errors">{ error }</div> }
</div>
)}
export default Entertainment;
