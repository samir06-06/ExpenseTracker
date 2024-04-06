import "../Transaction/Transaction.css"
function Transaction({
  inputNumber,
  HandleNumberChange,
  inputAsset,
  HandleAssetChange,
  updateValuePair,
}) {
  const text = document.getElementById("text")
  const number = document.getElementById("number")
  function handleButton() {
    if (text.value.trim() === "" || number.value.trim() === "") {
      alert("Please fill in both input fields.")
      return
    } else {
      updateValuePair()
    }
    text.value = ""
    number.value = ""
  }

  return (
    <div id="transaction">
      <h3>Add New Transaction </h3>
      <h5>Text</h5>
      <input
        id="text"
        className="input"
        type="text"
        value={inputAsset}
        onChange={HandleAssetChange}
      />
      <h5>Amount</h5>
      <input
        id="number"
        className="input"
        type="number"
        value={inputNumber}
        onChange={HandleNumberChange}
      />
      <button onClick={handleButton}>Add Transaction</button>
    </div>
  )
}

export default Transaction
