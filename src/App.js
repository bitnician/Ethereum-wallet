import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ShowBalance from './components/getBalance';
import Mint from './components/faucet';
import Logout from './components/logout';
import Navigation from './components/navbar';
import NotFound from './components/notFound';

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <main>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/faucet">
            <Mint />
          </Route>
          <Route path="/get-balance">
            <ShowBalance />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>

          <Redirect from="/" to="/dashboard" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
