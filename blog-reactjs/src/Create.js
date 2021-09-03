import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ options, setOptions ] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
 const blog = { title, body, author, options };
 // console.log(blog);

fetch('http://localhost:8000/blogs', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(blog)
})
.then(() => {
  console.log("New Blog was added");
  history.push('/')
})
   }

  return(
    <div className="create-blog">
    <h1 className="h1-blog">Create Blog</h1>
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
         type="text"
         placeholder="title...."
         required
         value={ title }
         onChange={(e) => setTitle(e.target.value)}
         />
        <label>Blog Body:</label>
        <textarea
        rows="8"
        cols="80"
        required
        value={ body }
        onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <input
        type="text"
        placeholder="your name....."
        required
        value={ author }
        onChange={ (e) => setAuthor(e.target.value) }
        />
        <select
        required
        value={ options }
        onChange={ (e) => setOptions(e.target.value) }
        >
          <option>Random</option>
          <option>World</option>
          <option>Sport</option>
          <option>Entertainment</option>
          <option>Polities</option>
        </select>
        <button>Submit</button>
       </form>
    </div>
    </div>
  );
}

export default Create;
