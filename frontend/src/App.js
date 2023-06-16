import { Navbar } from 'components/Navbar';
import { Advisors } from 'features/Advisors';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Advisors} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
