import React from "react"
import "../Salary/Salary.css"

function Salary({ allTransactions }) {
  let totalSum = 0

  allTransactions.forEach((transaction) => {
    totalSum += +transaction.value
  })

  return (
    <div id="salary">
      <h3>Your Salary</h3>
      <h1>{totalSum}$</h1>
    </div>
  )
}

export default Salary
