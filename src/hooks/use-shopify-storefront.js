import { useState, useCallback } from 'react';
import ShopifyClient from 'shopify-buy';
import Cookies from 'js-cookie';
import { useMount } from 'react-use';

const useShopifyStorefront = (config) => {
  const [client] = useState(ShopifyClient.buildClient(config));
  const [checkout, setCheckout] = useState();
  const [products, setProducts] = useState([]);

  const checkoutId = checkout?.id;

  const addItemToCart = useCallback(
    async (variantId, quantity) => {
      const newCheckout = await client.checkout.addLineItems(checkoutId, [
        {
          variantId,
          quantity,
        },
      ]);
      setCheckout(newCheckout);
    },
    [checkoutId, client]
  );

  const removeItemFromCart = useCallback(
    async (id) => {
      const newCheckout = await client.checkout.removeLineItems(checkoutId, [
        id,
      ]);
      setCheckout(newCheckout);
    },
    [checkoutId, client]
  );

  const updateItemInCart = useCallback(
    async (id, quantity) => {
      const newCheckout = await client.checkout.updateLineItems(checkoutId, [
        {
          id,
          quantity,
        },
      ]);
      setCheckout(newCheckout);
    },
    [checkoutId, client]
  );

  useMount(() => {
    (async () => {
      const products = await client.product.fetchAll();
      setProducts(products);
    })();
  });

  useMount(() => {
    (async () => {
      const savedCheckoutId = Cookies.get('shopify_checkout_id');
      let newCheckout;
      let shouldCreateNewCheckout = false;

      if (savedCheckoutId) {
        try {
          newCheckout = await client.checkout.fetch(savedCheckoutId);
          shouldCreateNewCheckout = false;
        } catch (error) {
          shouldCreateNewCheckout = true;
        }
      } else {
        shouldCreateNewCheckout = true;
      }

      if (shouldCreateNewCheckout) {
        newCheckout = await client.checkout.create();
        Cookies.set('shopify_checkout_id', newCheckout.id, { expires: 1 });
      }

      setCheckout(newCheckout);
    })();
  });

  return {
    client,
    checkout,
    products,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
  };
};

export default useShopifyStorefront;
