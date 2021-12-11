import './App.css';
import Routers from './routers';
import Header from './components/header'; 
import Footer from './components/footer';
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

