const Nav = () => {

  return(
    <div className="navs">
    <nav id="nav">
       <div className="navigations">
         <h2>Simple Blog</h2>
         <li id="nav-list">
           <a href="/">Home</a>
           <a href="#">About</a>
           <a href="/create">Create Blog</a>
           <a href="#">Search</a>
         </li>
       </div>
        </nav>


      <nav className="select">
        <div className="navigation">
         <li id="nav-list select">
           <a href="/">Random</a>
           <a href="#">World</a>
           <a href="/polities">Polities</a>
           <a href="/entertainment">Entertainment</a>
           <a href="#">Sport</a>
         </li>
        </div>
        </nav>
    </div>
  )
}
 export default Nav;
