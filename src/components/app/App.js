import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Suspense, lazy} from "react";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const NotFoundLazy = lazy(() => import('../pages/NotFound'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics/">
                                <ComicsPage/>
                            </Route>
                            <Route exact path="/comics/:id">
                                <SinglePage type="comic"/>
                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage type="character"/>
                            </Route>
                            <Route path="*">
                                <NotFoundLazy/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;