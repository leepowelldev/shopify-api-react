import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './components/cart';
import Product from './components/product';
import useShopifyStorefront from './hooks/use-shopify-storefront';

const App = () => {
  const {
    checkout,
    products,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
  } = useShopifyStorefront({
    domain: process.env.STOREFRONT_DOMAIN,
    storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
  });

  return (
    <div>
      {checkout ? (
        <Cart
          {...checkout}
          deleteItem={removeItemFromCart}
          updateItem={updateItemInCart}
        />
      ) : (
        'Loading...'
      )}
      {products.map((product) => (
        <Product {...product} addItemToCart={addItemToCart} key={product.id} />
      ))}
    </div>
    // <div>
    //   {[
    //     ReactDOM.createPortal(
    //       <Cart href={checkout?.webUrl} items={items} isLoading={!checkout} />,
    //       document.getElementById('cart')
    //     ),
    //     ReactDOM.createPortal(
    //       products.map((product) => <Product data={product} />),
    //       document.getElementById('counter')
    //     ),
    //   ]}
    // </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
