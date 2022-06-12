
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './Containers/Auth';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
