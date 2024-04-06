import React from "react"
import "../IncExp/IncExp.css"

function IncExp({ allTransactions }) {
  let totalIncome = 0
  let totalExpense = 0

  allTransactions.forEach((transaction) => {
    if (transaction.inputNumber.startsWith("-")) {
      totalExpense += +transaction.inputNumber
    } else {
      totalIncome += +transaction.inputNumber
    }
  })

  return (
    <div className="inc-exp">
      <div id="inc" className="in-and-out">
        <h4>Income</h4>
        <h3>{totalIncome}$</h3>
      </div>
      <div id="exp" className="in-and-out">
        <h4>Expense</h4>
        <h3>{totalExpense}$</h3>
      </div>
    </div>
  )
}

export default IncExp
