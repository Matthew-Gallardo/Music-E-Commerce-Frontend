import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";


export default function TransactionList() {
  const [data, setData] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    fetch("/musictest/api/transactions")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const userTransactionMap = data.reduce((acc, transaction) => {
          const userId = transaction.users.userId;
          if (!acc[userId]) {
            acc[userId] = {
              userId: userId,
              userName: `${transaction.users.userFirstname} ${transaction.users.userLastname}`,
              totalAmount: 0,
              transactionCount: 0,
              userMobile: transaction.users.userMobile,
              userStreet: transaction.users.userStreet,
              userCity: transaction.users.userCity,
              userState: transaction.users.userState,
              userZipcode: transaction.users.userZipcode,
              userCountry: transaction.users.userCountry,
              userBillingAddress: transaction.users.userBillingAddress,
              userShippingAddress: transaction.users.userShippingAddress,
            };
          }
          acc[userId].totalAmount += transaction.transactionTotalAmount;
          acc[userId].transactionCount += 1;
          return acc;
        }, {});
        setUserTransactions(Object.values(userTransactionMap));
      })
      .catch((error) => console.error("Error fetching transaction data:", error));
  }, []);

  const transactionColumns = [
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    { field: "transactionTotalAmount", headerName: "Total Amount", width: 150 },
    { field: "transactionStatus", headerName: "Status", width: 150 },
    { field: "transactionDate", headerName: "Date", width: 200 },
    { field: "userName", headerName: "User Name", width: 200 },
  ];

  const userColumns = [
    { field: "userId", headerName: "User ID", width: 90 },
    { field: "userName", headerName: "User Name", width: 150 },
    { field: "totalAmount", headerName: "Total Amount", width: 150 },
    { field: "transactionCount", headerName: "Transaction Count", width: 150 },
    { field: "userMobile", headerName: "Mobile", width: 150 },
    { field: "userStreet", headerName: "Street", width: 150 },
    { field: "userCity", headerName: "City", width: 150 },
    { field: "userState", headerName: "State", width: 150 },
    { field: "userZipcode", headerName: "Zipcode", width: 150 },
    { field: "userCountry", headerName: "Country", width: 150 },
    { field: "userBillingAddress", headerName: "Billing Address", width: 200 },
    { field: "userShippingAddress", headerName: "Shipping Address", width: 200 },
  ];

  const transactionRows = data.map((transaction, index) => ({
    id: index,
    transactionId: transaction.transactionId,
    transactionTotalAmount: transaction.transactionTotalAmount.toFixed(2),
    transactionStatus: transaction.transactionStatus,
    transactionDate: new Date(transaction.transactionDate).toLocaleString(),
    userName: `${transaction.users.userFirstname} ${transaction.users.userLastname}`,
  }));

  const userRows = userTransactions.map((userTransaction, index) => ({
    id: index,
    userId: userTransaction.userId,
    userName: userTransaction.userName,
    totalAmount: userTransaction.totalAmount.toFixed(2),
    transactionCount: userTransaction.transactionCount,
    userMobile: userTransaction.userMobile,
    userStreet: userTransaction.userStreet,
    userCity: userTransaction.userCity,
    userState: userTransaction.userState,
    userZipcode: userTransaction.userZipcode,
    userCountry: userTransaction.userCountry,
    userBillingAddress: userTransaction.userBillingAddress,
    userShippingAddress: userTransaction.userShippingAddress,
  }));

  return (
    <div className="trackList">
      <div className="trackListHeader">
        <h1>Transaction Report</h1>
      </div>
      <h2>All Transactions</h2>
      <div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
        <DataGrid rows={transactionRows} columns={transactionColumns} pageSize={5} />
      </div>
      <h2>Total Transactions per User</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={userRows} columns={userColumns} pageSize={5} />
      </div>
    </div>
  );
}