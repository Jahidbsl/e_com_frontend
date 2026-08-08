import { serverMutation } from "../core/server";

export const createOrder = async (formData, cartItems) => {
  console.log("SENDING ORDER DATA:", { ...formData, items: cartItems });

  const orderPayload = {
    ...formData,
    items: cartItems,
  };

  const res = await serverMutation(`/api/orders/create/`, orderPayload);
  return res;
};