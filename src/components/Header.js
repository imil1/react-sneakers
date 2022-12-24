import React from 'react';
import { Link } from 'react-router-dom'

import { useCart } from '../hooks/useCart';


function Header (props) {
  const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
        <Link to="/" >
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="sneakers-logo"/>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
            <div>
              <a href='https://www.youtube.com/watch?v=ptiom4YWqoE&list=PL0FGkDGJQjJEos_0yVkbKjsQ9zGVy3dG7'>Уроки от Archakov</a>
            </div>
         </div>
        </div>
        </Link>
        <ul className="d-flex">
          <li className="mr-30 cu-p" onClick={props.onClickCart}>
              <img width={18} height={18} src="/img/cart.svg" alt="cart-svg"/>
              <span>{totalPrice} руб</span>
          </li>
           <li className="mr-20 cu-p">
              <Link to='/favourites' >
                <img width={18} height={18} src="/img/heart.svg" alt="fav-svg"/>
              </Link>
          </li>
          <li className="mr-20 cu-p">
              <Link to='/orders'>
              <img width={18} height={18} src="/img/user.svg" alt="user-svg"/>
              </Link>
          </li>
        </ul>
      </header>
    );
}

export default Header;