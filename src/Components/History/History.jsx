import React from "react"
import "../History/History.css"

function History({ handleIconClick, allTransactions }) {
  return (
    <div id="history">
      <h3>History</h3>
      <div className="in-out">
        <div className="per">
          {allTransactions &&
            allTransactions.map((transaction) => {
              const hasMinusSign = transaction.inputNumber.startsWith("-")
              console.log("hasMinusSign:", hasMinusSign) // Add this line for debugging
              const perBodyClass = hasMinusSign
                ? "per-body red-border"
                : "per-body green-border"
              console.log("inputAsset:", transaction.inputAsset) // Add this line for debugging

              return (
                <div key={transaction.id} className={perBodyClass}>
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => handleIconClick(transaction.id)}
                  ></i>
                  <h4 className="per-name">{transaction.inputAsset}</h4>
                  <h4 className="per-price">{transaction.inputNumber}</h4>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default History
