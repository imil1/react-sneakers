import React from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Drawer from './components/Drawer/index'
import Header from './components/Header'
import AppContext from './context'

import Home from './pages/Home'
import Favourites from './pages/Favourites'
import Orders from './pages/Orders'
import {Footer} from './components/Footer'


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // console.log(JSON.stringify(cartItems));

  React.useEffect(()=> {
    async function fetchData() {
      try {
        const [cartResponse,favouriteResponse,itemsResponse] = await Promise.all([
          axios.get('https://639e22193542a26130578fa5.mockapi.io/cart'),
          axios.get('https://639e22193542a26130578fa5.mockapi.io/favourites'),
          axios.get('https://639e22193542a26130578fa5.mockapi.io/items')
        ]);
        setIsLoading(true);
        // const cartResponse = await axios.get('https://639e22193542a26130578fa5.mockapi.io/cart');
        // const favouriteResponse = await axios.get('https://639e22193542a26130578fa5.mockapi.io/favourites');
        // const itemsResponse = await axios.get('https://639e22193542a26130578fa5.mockapi.io/items');

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavourites(favouriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('ошибка при запросе данных :(');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if(findItem){
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://639e22193542a26130578fa5.mockapi.io/cart/${findItem.id}`);
      }else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://639e22193542a26130578fa5.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map((item) => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Не получилось добавить в корзину');
      console.error(error);
    }
  
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      axios.delete(`https://639e22193542a26130578fa5.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Не получилось удаления из корзины');
      console.error(error);
    }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))){
        axios.delete(`https://639e22193542a26130578fa5.mockapi.io/favourites/${obj.id}`);
        setFavourites(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } 
      else {
        const { data } = await axios.post('https://639e22193542a26130578fa5.mockapi.io/favourites', obj);
        setFavourites(prev => [...prev,data]);
      }  
    } catch (errors){
      alert('Не удалось добавить в favourites');
      console.error(errors);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }
  

  return (
         <AppContext.Provider value={{
      items, 
      cartItems, 
      favourites,
      isItemAdded, 
      onAddToFavourite,
      setCartOpened, 
      setCartItems,
      onAddToCart
      }}>
      <div className="wrapper clear">
        <Drawer 
          items={cartItems} 
          onClose={()=> setCartOpened(false)} 
          onRemove={onRemoveItem}   
          opened={cartOpened}  
        />
     
      <Header onClickCart={()=> setCartOpened(true)} /> 
      <div className='banner'>
        <img src='/img/banner.png' alt='banner'/>
      </div>


      <Route path="/" exact >
        <Home 
          items={items} 
          cartItems={cartItems}
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput} 
          onAddToFavourite={onAddToFavourite}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />
      </Route>
      <Route path='/favourites' exact>
        <Favourites />
      </Route>
      <Route path='/orders' exact>
        <Orders />
      </Route>
      
      <Footer />
    </div>
    </AppContext.Provider>
  );
}

export default App;