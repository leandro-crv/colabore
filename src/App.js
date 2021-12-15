import './App.css';
import Routers from './routers';
import Header from './components/header';
import Footer from './components/footer';
import MenuProvider from './context/context';
import { CampanhaProvider } from './context/CampanhaContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <MenuProvider>
      <CampanhaProvider>
      <BrowserRouter>
        <Header />
        <main className='body-content'>
          <Routers />
        </main>
        <Footer />
      </BrowserRouter>
      </CampanhaProvider>
    </MenuProvider>

  );
}

export default App;

