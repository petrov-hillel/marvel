import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {MainPage, ComicsPage, NotFound, SingleComicPage, SingleComicsPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics/">
                            <ComicsPage/>
                        </Route>
                        <Route exact path="/comics/:comicId">
                            <SingleComicPage/>
                        </Route>
                        <Route exact path="*">
                            <NotFound/>
                        </Route>
                </Switch>
            </main>
        </div>
</Router>
)
}

export default App;