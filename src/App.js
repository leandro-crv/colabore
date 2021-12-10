import './App.css';
import Routers from './routers';
import Header from './components/header'; 
import Footer from './components/footer';
import { ProviderOpenMenu } from './services/context';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ProviderOpenMenu>
        <Header />
        <Routers/>
        <Footer/>
      </ProviderOpenMenu>
    </BrowserRouter>  
  
  );
}

export default App;
