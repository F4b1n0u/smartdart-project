import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DisplayScreen from './display/DisplayScreen';
import ControlScreen from './command/ControlScreen';
import PlayerInput from './dpad/PlayerInput';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/display-screen" component={DisplayScreen} />
        <Route path="/control-screen" component={ControlScreen} />
        <Route path="/player-input" component={PlayerInput} />
      </Switch>
    </Router>
  );
};

export default App