import React, { useEffect, useState } from "react"
import History from "../Components/History/History"
import IncExp from "../Components/IncExp/IncExp"
import Salary from "../Components/Salary/Salary"
import Transaction from "../Components/Transaction/Transaction"
import api from "../api/transactions"

function MainPage() {
  const [allTransactions, SetAllTransactions] = useState([])
  const [inputNumber, setInputNumber] = useState("")
  const [inputAsset, setInputAsset] = useState("")

  useEffect(() => {
    const fetchTransitions = async () => {
      try {
        const response = await api.get("/incexp")
        SetAllTransactions(response.data)
      } catch (error) {
        if (error.response) {
          // Not in 200 response range
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log(`Error: ${error.message}`)
        }
      }
    }
    fetchTransitions()
  }, [])

  function HandleNumberChange(event) {
    setInputNumber(event.target.value)
  }
  function HandleAssetChange(event) {
    setInputAsset(event.target.value)
  }

  function handleEditClick(event) {
    const editDiv = event.target.parentElement.nextElementSibling
    if (editDiv.style.display === "flex") {
      editDiv.style.display = "none"
    } else {
      editDiv.style.display = "flex"
    }
  }

  async function handleDeleteClick(id) {
    try {
      await api.delete(`/incexp/${id}`)
      const updatedTransactions = allTransactions.filter(
        (transaction) => transaction.id !== id
      )
      SetAllTransactions(updatedTransactions)
    } catch (error) {
      console.log(`Error deleting transaction with ID ${id}: ${error.message}`)
    }
  }

  async function handleEditSubmit(id, editedName, editedValue) {
    try {
      const updatedTransaction = {
        id,
        incexp: editedName,
        value: editedValue,
      }

      const response = await api.put(`/incexp/${id}`, updatedTransaction)

      if (response.status === 200) {
        const updatedTransactions = allTransactions.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                incexp: editedName || transaction.incexp,
                value: editedValue || transaction.value,
              }
            : transaction
        )
        SetAllTransactions(updatedTransactions)
      } else {
        console.log(
          `Server error while updating transaction with ID ${id}: ${response.statusText}`
        )
      }
    } catch (error) {
      console.log(`Error updating transaction with ID ${id}: ${error.message}`)
    }
  }

  async function postValuePair() {
    try {
      const newTransaction = {
        id: Date.now(),
        incexp: inputAsset,
        value: inputNumber,
      }
      const response = await api.post("./incexp", newTransaction)

      SetAllTransactions((prevTransactions) => [
        ...prevTransactions,
        response.data,
      ])
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <div id="expense-tracker">
      <h2>Expense Tracker</h2>
      <Salary allTransactions={allTransactions} />
      <IncExp allTransactions={allTransactions} />
      <History
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleEditSubmit={handleEditSubmit}
        allTransactions={allTransactions}
      />
      <Transaction
        value={inputNumber}
        HandleNumberChange={HandleNumberChange}
        assetName={inputAsset}
        HandleAssetChange={HandleAssetChange}
        postValuePair={postValuePair}
      />
    </div>
  )
}

export default MainPage
