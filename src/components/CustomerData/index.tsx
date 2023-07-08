import { useEffect, useState } from "react";

import { getCustomerPack } from "../../services/apiServices";
import { CustomerPackType } from "../../types";
import { packContentHeaders } from "../../constants";

import "./styles.css";

export default function CustomerData() {
  const [customerData, setCustomerData] = useState<CustomerPackType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const [loader, setLoader] = useState<boolean>(false);

  const getCustomerData = async () => {
    try {
      setLoader(true);
      const customerAPIData = await getCustomerPack({ id: "1" });
      setCustomerData(customerAPIData);
      setLoader(false);
    } catch (err) {
      // can assign error message from error object as well
      setError("Failed to retrive packet data");
      setLoader(false);
    }
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const renderCustomerDataValues = () => {
    const { customer_id, pack_data } = customerData as CustomerPackType;
    return (
      <tbody>
        <tr>
          <th rowSpan={pack_data.length + 1}>{customer_id}</th>
        </tr>
        {pack_data.map((pack) => (
          <tr key={JSON.stringify(pack)}>
            <td>{pack.ingredient}</td>
            <td>{pack.inventory_code}</td>
            <td>{pack.quantity}</td>
            <td>{pack.unit}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const renderHeader = () => (
    <thead>
      <tr>
        <th rowSpan={2}>Customer ID</th>
        <th colSpan={4}>Pack data</th>
      </tr>
      <tr>
        {packContentHeaders.map((header) => (
          <th key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
  );

  const renderContent = () => (
    <>
      {customerData ? (
        <table className="styled-table">
          {renderHeader()}
          {renderCustomerDataValues()}
        </table>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
  return (
    <div className="container">
      {loader ? <h1>Loading....</h1> : renderContent()}
    </div>
  );
}
