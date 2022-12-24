import React, { Fragment } from 'react'
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

import AppContext from '../../context.js'


function Card ( {
  id,
  imageUrl,
  title,
  price,
  onFavourite,
  onPlus ,
  favourited = false, 
  loading = false,
} ) {
    const { isItemAdded } = React.useContext(AppContext); 
    const [isFavourite, setIsFavourite] = React.useState(favourited);

    const obj = { id, parentId: id, imageUrl, title, price };

    const onClickPlus = () => {
      onPlus(obj);
      
    };

    const onClickFavourite = () => {
      onFavourite(obj);
      setIsFavourite(!isFavourite);
    };

    return (
        <div className={styles.card}>
        {
          loading ?  (
            <ContentLoader
              speed={2}
              width={155}
              height={250}
              viewBox="0 0 155 265"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
              <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
              <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
              <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
              <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
          ): (  <Fragment>
            {onFavourite && (
              <div className={styles.favourite} onClick={onClickFavourite}>
                <img src={isFavourite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}  alt="Unliked"/>
              </div>
            )}
            <img width='100%' height={135} src={imageUrl} alt="sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб</b>
            </div>
          
            {onPlus && (
              <img 
              className={styles.plus} 
              onClick={onClickPlus}  
              src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} 
              alt="plus"

            />
            )}

            </div>
          </Fragment>
          )}
       
      </div> 
    );
}

export default Card;