import React, { useCallback, useState } from 'react';
import Counter from './counter';

const Product = ({ variants, title, addItemToCart, ...props }) => {
  const [quantity, setQuantity] = useState(1);

  const { id, price, compareAtPrice } = variants?.[0];

  const handleSubmit = useCallback(() => {
    if (id) {
      addItemToCart(id, quantity);
    }
  }, [addItemToCart, id, quantity]);

  const handleChange = useCallback((value) => {
    setQuantity(value);
  }, []);

  return (
    <div>
      <div>
        <b>
          {title?.toUpperCase()} £{price}{' '}
          {compareAtPrice != null && (
            <>
              £<del>{compareAtPrice}</del>
            </>
          )}
        </b>
      </div>
      <Counter value={quantity} min={1} max={100} onChange={handleChange} />
      <button type="button" onClick={handleSubmit}>
        Buy Now
      </button>
    </div>
  );
};

export default Product;
