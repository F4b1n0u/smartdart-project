import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainScreen from './main_screen/MainScreen';
import ControlScreen from './control_screen/ControlScreen';
import PlayerInput from './player_input/PlayerInput';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainScreen" component={MainScreen} />
        <Route path="/ControlScreen" component={ControlScreen} />
        <Route path="/PlayerInput" component={PlayerInput} />
      </Switch>
    </Router>
  );
};

export default App