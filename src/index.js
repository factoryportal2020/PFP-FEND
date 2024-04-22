import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './jewell/App';
import Website from './website/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import storeAdmin from './jewell/app/store'
import storeWebsite from './website/app/store'
import { getAdmin } from './website/features/auth/adminAuctions';
import { useSelector, useDispatch } from 'react-redux'


let site_url = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : null;

let menu = (window.location.pathname.split('/')[2]) ? window.location.pathname.split('/')[2] : null;
console.log(site_url);
console.log(menu);

let comp = (menu == "home" || menu == "shop" || menu == "about" || menu == "product" || menu == "category" 
|| menu == "contact" || menu == "login" || menu == "register" || menu == "profile" || menu == "forget" || menu == "reset" 
|| menu == "enquiry") ? <Website site_url={site_url} /> : <App />

let store = (menu == "home" || menu == "shop" || menu == "about" || menu == "product" || menu == "category" 
|| menu == "contact" || menu == "login" || menu == "register" || menu == "profile" || menu == "forget" || menu == "reset" 
|| menu == "enquiry") ? storeWebsite : storeAdmin


if((site_url && menu==null && menu!="" && site_url!="login" && site_url!="home")){
 comp = <Website site_url={site_url} />
 store = storeWebsite
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// const dispatch = useDispatch()
// dispatch(getAdmin(domain));



root.render(  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {comp}
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
