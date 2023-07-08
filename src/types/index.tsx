export type PackDataType = {
  ingredient: string;
  inventory_code: string;
  quantity: number;
  unit: string;
};

export type CustomerPackType = {
  customer_id: number;
  id: string;
  pack_data: PackDataType[];
};
