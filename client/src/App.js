import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layout/Layout';
import Router from './components/Routes';

function App() {
  return (
    <BrowserRouter >
      <MainLayout>
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
