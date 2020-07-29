import React from 'react'; 
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import NavbarScreen from './screens/NavbarScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';



function App() {

  return (
      <BrowserRouter>
        <header className="app-header">
          <NavbarScreen></NavbarScreen>
          
        </header>

        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/products" component={ProductsScreen} ></Route>
            <Route path="/categories/:id" component={HomeScreen} ></Route>
            <Route path="/shipping" component={ShippingScreen} ></Route>
            <Route path="/payment" component={PaymentScreen} ></Route>
            <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
            <Route path="/profile" component={ProfileScreen} ></Route>
          </div>
        </main>

      </BrowserRouter>
    );
  }


export default App;
