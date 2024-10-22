import { useState } from "react";
import styles from "./ProductCard.module.css";

export function ProductCard({
    product, 
    background="slategray",
    onPurchese,
    onFavorite,
    isFavorite
}){
    //    varijabla, seter                 vrijednost
    const [showMore, setShowMore]=useState(false);
 //   const [stockCount, setStockCount]=useState(product.stockCount);

    function handleClick(){
        //             setovanje vrijednosti (stocCount-1)
     //   setStockCount((prevStocCount)=>prevStocCount-1);
        onPurchese(product.id, product.stockCount-1);
    }
    function handleTwoClicks(){
      //  setStockCount((prevStocCount)=>prevStocCount-1);
      //  setStockCount((prevStocCount)=>prevStocCount-1);
      onPurchese(product.id, product.stockCount-2);

    }
    return (
      <article className={styles.Container} style={{ background}}>

        <button 
            className={styles.Favorite}
            onClick={()=>
            onFavorite(product.id)}
        >
            {isFavorite?'❤️': '🤍'}
      
        </button>
        <h1>{product.title}</h1>
        <img 
            src={product.imageSrc} 
            alt={product.title}
            width={128}
            height={128}/>
       <p>Specifikacija
            <button onClick={()=> setShowMore(!showMore)}>{showMore ? 'hide':'show'}</button>
       </p>
      {showMore && <ul className={styles.List} >
            {product.spacification.map((spec, index) =>  (<li key={index}>{spec}</li>))}
        </ul>}
        <Status stockCount={product.stockCount}></Status>
        {product.stockCount>0 &&
         <>
              <p>Price: {product.price} KM</p>
              <button onClick={handleClick}>Kupi </button>
         </>
        }

        {product.stockCount>1 && 
            <button onClick={handleTwoClicks}>Kupi 2x</button>
        }
      </article>
      );
  
  }

  function Status({stockCount}){
    const NotAvailableTemplate= <p className={styles.NotAvailableStatus}>Not available</p>;
const AvailableTemplate=<p className={styles.AvailableStatus}>{stockCount} items available</p>;

    return stockCount===0 ?
    NotAvailableTemplate
     : AvailableTemplate;
  }