import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/musictest/api/transactions");
        const transactions = response.data;
        const total = transactions.reduce(
          (sum, transaction) => sum + transaction.transactionTotalAmount,
          0
        );
        setTotalSales(total);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="home">
      <div className="homeSalesContainer">
        <h3 className="homeSalesTitle">Total Sales</h3>
        <p className="homeSalesAmount">₱{totalSales.toFixed(2)}</p>
      </div>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
