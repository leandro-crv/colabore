import './App.css';
import Routers from './routers';
import Header from './components/header';
import Footer from './components/footer';
import MenuProvider from './context/context';
import { CampanhaProvider } from './context/CampanhaContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <MenuProvider>
      <CampanhaProvider>
      
        <Header />
        <main className='body-content'>
          <Routers />
        </main>
        <Footer />
      </CampanhaProvider>
    </MenuProvider>
  </BrowserRouter>

  );
}

export default App;

