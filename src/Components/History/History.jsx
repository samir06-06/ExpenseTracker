import React from "react"
import "../History/History.css"

function History({
  handleDeleteClick,
  allTransactions,
  handleEditClick,
  handleEditSubmit,
}) {
  return (
    <div id="history">
      <h3>History</h3>
      <div className="in-out">
        <div className="per">
          {allTransactions &&
            allTransactions.map((transaction) => {
              const hasMinusSign = transaction.value.startsWith("-")
              const perBodyClass = hasMinusSign
                ? "per-body red-border"
                : "per-body green-border"
              return (
                <div key={transaction.id} className="history">
                  <div className={perBodyClass}>
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => handleDeleteClick(transaction.id)}
                    ></i>
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={(e) => handleEditClick(e)}
                    ></i>
                    <h4 className="per-name">{transaction.incexp}</h4>
                    <h4 className="per-price">{transaction.value}</h4>
                  </div>
                  <div className="edit">
                    <button
                      type="submit"
                      onClick={() =>
                        handleEditSubmit(
                          transaction.id,
                          transaction.editedName,
                          transaction.editedValue
                        )
                      }
                    >
                      Submit
                    </button>
                    <input
                      type="text"
                      className="edited-name"
                      defaultValue={transaction.incexp}
                      onChange={(e) =>
                        (transaction.editedName = e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="edited-value"
                      defaultValue={transaction.value}
                      onChange={(e) =>
                        (transaction.editedValue = e.target.value)
                      }
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default History
