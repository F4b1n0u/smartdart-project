import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainScreen from './main_screen/MainScreen';
import SecondaryScreen from './secondary_screen/SecondaryScreen';
import PlayerInput from './player_input/PlayerInput';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/MainScreen" component={MainScreen} />
        <Route path="/SecondaryScreen" component={SecondaryScreen} />
        <Route path="/PlayerInput" component={PlayerInput} />
      </Switch>
    </Router>
  );
};

export default App