import React from 'react';


import Card from '../components/Card'


function Home  ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavourite,
  onAddToCart,
  isLoading
}) {

  const renderItems = () => {
    const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue)) ;
    return ( (isLoading ? [...Array(8)] : filtredItems)
      .map((item, index) => (
        <Card 
          key={index}
          onFavourite={(obj) => onAddToFavourite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
      ))

    );
  };
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
           <h1>{searchValue ? `Поиск "${searchValue}"` : 'Все кроссовки'}</h1>
           <div className="search-block d-flex">
              <img src="img/search.svg" alt="search-icon"/>
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/> 
              {searchValue && (
                <img  
                  onClick={() => setSearchValue('')} 
                  src="img/btn-remove.svg" 
                  alt="Clear" 
                />
              )}
           </div>
        </div>
        

        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>

      </div>
    );
}

export default Home;
