import './styles/index.css';

import Main from './components/Main';
import Header from './components/Header/Header';
import initEventListeners from './core/initEventListeners';

async function App() {
  Header();
  Main();
  initEventListeners();
}

App();

export default App;
