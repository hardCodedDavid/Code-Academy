import Home from './Home';
import Nav from './Nav';
import Create from './Create';
import BlogDetail from './BlogDetail';
import Polities from './Polities';
import Entertainment from "./Entertainment";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
<Router>
  <div className="App">
    <Nav />
      <Switch>
          <Route  exact path="/">
                 <Home />
          </Route>
          <Route   path="/create">
                 <Create />
          </Route>
          <Route   path="/blogs/:id">
                 <BlogDetail />
          </Route>
          <Route   path="/polities">
                 <Polities />
          </Route>
          <Route   path="/entertainment">
                 <Entertainment />
          </Route>
    </Switch>
    </div>
</Router>
  );
}

export default App;
