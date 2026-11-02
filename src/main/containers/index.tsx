import {createRoot} from 'react-dom/client'
import store from '../../config/redux/store';
import {Provider} from 'react-redux'
import Providers from "../providers/unsigned/Providers";

createRoot(document.getElementById('root')!).render(<Provider store={ store }><Providers/></Provider>)