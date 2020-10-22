export default function cartReducer(cart, action) {
  switch (action.type) {
    case "addItems": {
      const { id, sku } = action;
      const itemsInCart = cart.find((i) => i.sku === sku);
      if (itemsInCart) {
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...cart, { id, sku, quantity: 1 }];
      }
    }
    case "updateQuantity": {
      const { quantity, sku } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku) //remvoes item if quantity is selected Remove option
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i)); // updates the quantity
    }
    case "emptyCart":
      return [];
    default:
      throw new Error("Unhandled action type:" + action.type);
  }
}
