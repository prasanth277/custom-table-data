const CUSTOMER_PACK_URL =
  "https://6466e9a7ba7110b663ab51f2.mockapi.io/api/v1/pack1";

export const getCustomerPack = ({ id }: { id: string }) => {
  return fetch(`${CUSTOMER_PACK_URL}/${id}`).then((res) => res.json());
};
