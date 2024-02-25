import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PeopleList from './pages/PeopleList.tsx';
import ShipsList from './pages/ShipsList.tsx';
import PeopleDetails from './pages/PeopleDetails';
import ShipDetails from './pages/ShipDetails.tsx';

function App() {

  return (
    <div>
      <div className="container">
        <h1>A Long Time Ago, in a Galaxy Far, Far Away...</h1>
        <div className='centered'>
          <div className='row'>
            <div className="col-12">
              <Router>
                <nav className='text-center'>
                  <ul>
                    <Link to="/people"><span className='title1'>People</span></Link> <span className='title1'>|</span><Link to="/ships"><span className='title2'>Ship</span></Link>
                  </ul>
                </nav>
                <div>
                  <Routes>
                    <Route path="/people" element={<PeopleList />} />
                    <Route path="/people/:personId" element={<PeopleDetails />} />
                    <Route path="/ships" element={<ShipsList />} />
                    <Route path="/starships/:shipId" element={<ShipDetails />} />
                  </Routes>
                </div>
              </Router>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
