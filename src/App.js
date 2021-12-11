import './App.css';
import Routers from './routers';
import Header from './components/header/Header'; 
import Footer from './components/footer/Footer'
import MenuProvider from './context/context'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <Header />
        <Routers/>
        <Footer/>
      </MenuProvider>
    </BrowserRouter>  
  
  );
}

export default App;

