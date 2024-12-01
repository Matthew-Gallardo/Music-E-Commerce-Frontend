import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [totalSales, setTotalSales] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);

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

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const monthlySalesMap = transactions.reduce((acc, transaction) => {
          const date = new Date(transaction.transactionDate);
          const month = monthNames[date.getMonth()];
          const year = date.getFullYear();
          const key = `${year} ${month}`;
          if (!acc[key]) {
            acc[key] = {
              month: key,
              totalAmount: 0,
            };
          }
          acc[key].totalAmount += transaction.transactionTotalAmount;
          return acc;
        }, {});
        setMonthlySales(Object.values(monthlySalesMap));
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
      <div className="homeChart">
        <h3 className="homeChartTitle">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={monthlySales}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}