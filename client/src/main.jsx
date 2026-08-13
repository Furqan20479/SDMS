import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import '../src/style/base.css';
import App from './App.jsx';
import Navbar from "./pages/Navbar";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
    <App />
  </BrowserRouter>,
)


