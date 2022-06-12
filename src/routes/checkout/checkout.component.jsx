import { useSelector } from "react-redux";

import {
  selectCartTotal,
  selectCartItems,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        const { id } = cartItem;

        return <CheckoutItem key={id} cartItem={cartItem} />;
      })}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
