import React, { useState } from "react";
import { Chart } from "react-google-charts";

function Home() {
  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  const Person = {
    customers: [
      { id: 1, name: "Ahmed Ali" },
      { id: 2, name: "Aya Elsayed" },
      { id: 3, name: "Mina Adel" },
      { id: 4, name: "Sarah Reda" },
      { id: 5, name: "Mohamed Sayed" },
    ],
    transactions: [
      { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
      { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
      { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
      { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
      { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
      { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
      { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
      { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
      { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
    ],
  };

  const filteredCustomers = Person.customers.filter(customer =>
    customer.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const filteredTransactions = Person.transactions.filter(transaction =>
    filterAmount ? transaction.amount === parseInt(filterAmount) : true
  );

  const transactionsToDisplay = filteredCustomers.flatMap((customer) =>
    filteredTransactions.filter((transaction) => transaction.customer_id === customer.id).map((transaction) => ({
      customerName: customer.name,
      ...transaction
    }))
  );

  const transactionSummary = transactionsToDisplay.reduce((acc, transaction) => {
    const date = transaction.date;
    const customer = transaction.customerName;
    if (!acc[date]) acc[date] = {};
    if (!acc[date][customer]) acc[date][customer] = 0;
    acc[date][customer] += transaction.amount;
    return acc;
  }, {});

  const chartHeaders = ["Date", ...new Set(transactionsToDisplay.map(t => t.customerName))];
  const chartData = [
    chartHeaders,
    ...Object.entries(transactionSummary).map(([date, customers]) => [
      date,
      ...chartHeaders.slice(1).map(name => customers[name] || 0)
    ])
  ];

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col md-6">
            <div className="form-group">
              <label className="fw-bold">
                Filter by Customer Name:
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="form-control"
                />
              </label>
            </div>
          </div>
          <div className="col md-6">
            <div className="form-group">
              <label className="fw-bold">
                Filter by Transaction Amount:
                <input
                  type="number"
                  value={filterAmount}
                  onChange={(e) => setFilterAmount(e.target.value)}
                  className="form-control"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-2 shadow">
        {transactionsToDisplay.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Transaction Date</th>
                <th>Transaction Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionsToDisplay.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.customerName}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-warning">Nothing is found</div>
        )}
      </div>
      <Graph data={chartData} />
    </>
  );
}

function Graph({ data }) {
  const options = {
    chart: {
      title: "Customer Transactions per Day",
      subtitle: "Total transaction amounts per day for each customer",
    },
  };

  return (
    <div className="container">

      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default Home;
