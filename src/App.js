import React,{useContext } from 'react';
import GlobalStyle from "./globalStyle";
import Components from "./components";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout'
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Coin from "./pages/Coin";
import Sign from "./pages/Sign";
import Counter from "./pages/Shazams";
import RestCountries from "./pages/RestCountries";
import NamesCountries from "./pages/NamesCountries";
import CountryLanguges from "./pages/CountryLanguges";
import NotFoundImage from "./atoms/NotFound";
import {MyProvider} from "./pages/Contenxt.api";
import Redirect from "./pages/Redirect";
import {MyContext} from "./pages/Contenxt.api";
function App() {



  return (

        <MyProvider>
            <MyContext.Consumer>
                {({ state }) => (
                    <div className="App">
             <GlobalStyle/>
              <Router>
                <Routes>
                    <Route exact path="/" element={state.authorization ? <Components /> : <Redirect to="/login" />} />
                    <Route exact path="/404" component={NotFoundImage} />
                    <Route path="/layout" element={<Layout/>} />
                    <Route path="/layout/:id" element={<Detail/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/coin" element={<Coin/>}/>
                    <Route path="/sign" element={<Sign/>}/>
                    <Route path="/layout/restCountries" element={<RestCountries/>}/>
                    <Route path="/layout/restCountries/:name" element={<NamesCountries/>}/>
                    <Route path="/layout/restCountries/name/:common" element={<CountryLanguges/>}/>
                    <Route path="/counter" element={<Counter/>}/>
                </Routes>
            </Router>
              </div>
                )}
         </MyContext.Consumer>
        </MyProvider>


  );
}

export default App;
