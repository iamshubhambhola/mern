import List from "./List";
import NavBar from "./navBar";
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <NavBar/>
      <List/>
    </div>
    </Provider>
  );
}

export default App;
