import React, { useState } from "react"
import History from "../Components/History/History"
import IncExp from "../Components/IncExp/IncExp"
import Salary from "../Components/Salary/Salary"
import Transaction from "../Components/Transaction/Transaction"

function MainPage() {
  const [inputNumber, setInputNumber] = useState("")
  const [inputAsset, setInputAsset] = useState("")
  const [allTransactions, SetAllTransactions] = useState([])

  function HandleNumberChange(event) {
    setInputNumber(event.target.value)
  }
  function HandleAssetChange(event) {
    setInputAsset(event.target.value)
  }

  function handleIconClick(id) {
    const updatedTransactions = allTransactions.filter(
      (transaction) => transaction.id !== id
    )
    SetAllTransactions(updatedTransactions)
  }

  function updateValuePair() {
    const newTransaction = {
      id: Date.now(),
      inputNumber,
      inputAsset,
    }

    SetAllTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ])
  }

  return (
    <div id="expense-tracker">
      <h2>Expense Tracker</h2>
      <Salary allTransactions={allTransactions} />
      <IncExp allTransactions={allTransactions} />
      <History
        handleIconClick={handleIconClick}
        allTransactions={allTransactions}
      />
      <Transaction
        value={inputNumber}
        HandleNumberChange={HandleNumberChange}
        assetName={inputAsset}
        HandleAssetChange={HandleAssetChange}
        updateValuePair={updateValuePair}
      />
    </div>
  )
}

export default MainPage
