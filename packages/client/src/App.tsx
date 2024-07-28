import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DisplayScreen from './screens/display/Screen';
import CommandScreen from './screens/command/Screen';
import DpadScreen from './screens/dpad/Screen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/display" component={DisplayScreen} />
        <Route path="/command" component={CommandScreen} />
        <Route path="/dpad" component={DpadScreen} />
      </Switch>
    </Router>
  );
};

export default App