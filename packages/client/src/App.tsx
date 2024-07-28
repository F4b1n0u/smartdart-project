import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DisplayScreen from './screens/display/Screen';
import ControlScreen from './screens/command/Screen';
import DpadScreen from './screens/dpad/Screen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/display" component={DisplayScreen} />
        <Route path="/control" component={ControlScreen} />
        <Route path="/dpad" component={DpadScreen} />
      </Switch>
    </Router>
  );
};

export default App