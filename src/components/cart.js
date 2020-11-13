import React, { useCallback, useEffect, useState } from 'react';
import Counter from './counter';
import styles from './cart.module.css';
import { usePrevious } from 'react-use';

const CartItem = ({
  id,
  title,
  quantity,
  onDelete = () => {},
  onUpdate = () => {},
  variant,
  ...props
}) => {
  const prevQuantity = usePrevious(quantity);
  const [total, setTotal] = useState(quantity);

  const handleClick = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleUpdate = useCallback(() => {
    onUpdate(id, total);
  }, [id, onUpdate, total]);

  useEffect(() => {
    if (prevQuantity !== quantity) {
      setTotal(quantity);
    }
  }, [prevQuantity, quantity]);

  return (
    <div className={styles.cartItem}>
      <div>
        <b>Title:</b> {title}
      </div>
      <Counter value={total} min={1} max={100} onChange={setTotal} />
      <button type="button" onClick={handleUpdate}>
        Update
      </button>
      <button type="button" onClick={handleClick} aria-label="Delete">
        X
      </button>
    </div>
  );
};

const Cart = ({
  lineItems: items = [],
  webUrl: href,
  totalPrice,
  totalTax,
  deleteItem = () => {},
  updateItem = () => {},
  ...props
}) => {
  const handleDelete = useCallback(
    (id) => {
      deleteItem(id);
    },
    [deleteItem]
  );

  const handleUpdate = useCallback(
    (id, quantity) => {
      updateItem(id, quantity);
    },
    [updateItem]
  );

  return (
    <div className={styles.container}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        'No items in cart'
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
          <div>
            <b>Tax:</b> £{totalTax}
          </div>
          <div>
            <b>Total:</b> £{totalPrice}
          </div>
          <a href={href}>Checkout</a>
        </>
      )}
    </div>
  );
};

export default Cart;
