import { useState } from 'react';
import { Fragment } from 'react';
import { ProductList } from './Components/ProductList';
import { ProductFilter } from './Components/ProductFilter';
import { ProductCard } from './Components/ProductCard';
import styles from './App.module.css';
import { products as productsData } from './Data/products';
function App() {
  const [products, setProducts]= useState(productsData);

const [filters, setFilters]=useState({
  price:{
    min:0,
    max:999
  },
  other: "other value"
});
const [favorites, setFavorites]= useState([]);

function handlePurchese(productId, stockCount){
 // alert(`${product.title} kosta ${product.price} KM`);                                
                                                                               
  setProducts((prevProducts)=>
     prevProducts.map((product)=> 
      product.id=== productId ?
  //map vraca objekat pa ga traba raspakovati ... , i postaviti vrijednost koju mjenjamo
  {...product, stockCount}
  : product))
}

function handleFilter(key, value){
    setFilters((pervFilters)=>({
      ...pervFilters,//[key]: value,
       price:{
        ...pervFilters.price,
        [key]:value,
       }                            
    }));
}


  function handleFavorite(productId){
    if(favorites.includes(productId)){//vrati sve id koji nisu jednaki productId
      setFavorites((prevFavorites)=> prevFavorites.filter((id)=> id !== productId))
    }
    else{                             //u niz se pusha novi id ...prevFavorites je niz vec dodanih vrijednosti
      setFavorites((prevFavorites)=>[...prevFavorites, productId])
    }
  }
  return (
    <div className={styles.App}>
      <ProductList>
        {products.map(product =>
          <ProductCard 
            key={product.title} 
            product={product} 
            isFavorite={favorites.includes(product.id)}
            onPurchese={handlePurchese}
            onFavorite={handleFavorite}
          />)}
      </ProductList>

      <h2>Product filtered by price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter}/>
        {products.filter(({price})=>price>= filters.price.min && price <= filters.price.max).map(({title, price})=>
          <Fragment key={title}>
            <hr className={styles.ListDivider}/>
            <p className={styles.ListTitle}>{title} - {price} KM  </p>
          </Fragment>
        )}
    </div>
  );
}

export default App;
