import "./index.css";
import {Routes, Route} from 'react-router-dom'
import Countries from "./components/Countries";
import Country from "./components/Country";


function App() {
  return (
    <>
    <div className="header">
     <div className="container">
     <h5>Where in the world</h5>
    </div>
     </div>
    <div className="container">
      <Routes>
        <Route path="/"  element={<Countries/>}/>
        <Route path="/country/:countryName"  element={<Country/>}/>

      </Routes>
    </div>
    </>
  );
}

export default App;
