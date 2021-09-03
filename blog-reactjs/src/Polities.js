import { useState } from "react";
import  useFetch from "./useFetch";
import PoliList from "./PoliList";

const Polities = () => {
const { data: blogs , pending, error } = useFetch('http://localhost:8000/blogs')

  return(
<div className="home-component">
<h1 className="h1-blog">Polities</h1>
{ blogs && <PoliList blogs={ blogs.filter((blog) => blog.options === "Polities") } />}
{ pending && <div className="loading">Loading...</div>}
{ error && <div className="Errors">{ error }</div> }
</div>
)}
export default Polities;
