import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScoreBoard from './display_screen/DisplayScreen';
import ControlScreen from './control_screen/ControlScreen';
import PlayerInput from './player_input/PlayerInput';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/display-screen" component={ScoreBoard} />
        <Route path="/control-screen" component={ControlScreen} />
        <Route path="/player-input" component={PlayerInput} />
      </Switch>
    </Router>
  );
};

export default App