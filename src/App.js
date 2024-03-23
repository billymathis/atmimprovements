import React from "react";

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        width="200"
        value="Submit"
        id="submit-input"
        disabled={!isValid}
      ></input>
    </label>
  );
};

const App = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("Deposit");
  const [validTransaction, setValidTransaction] = React.useState(true);
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    const value = Number(event.target.value);
    console.log(`handleChange ${event.target.value}`);
    if (value <= 0) {
      setValidTransaction(false);
      return;
    }else{
      setValidTransaction(true);
    }
    if (atmMode === "Cash Back") {
      const isTransactionValid = value <= totalState;
      setValidTransaction(isTransactionValid);
    }
    setDeposit(value);
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    if(isDeposit){
      alert(`Deposited ${deposit} in your account.`)
    }else{
      alert(`Withdrew ${deposit} from your account.`)
    }
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    event.preventDefault();
    if (event.target.value === "Deposit") {
      setIsDeposit(true);
      setAtmMode(event.target.value);
    } else if(event.target.value === "Cash Back") {
      setIsDeposit(false);
      setAtmMode(event.target.value);
    }
    else {
      setIsDeposit(false);
      setAtmMode("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        {/* <option id="no-selection" value=""></option> */}
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      {atmMode && (
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
        ></ATMDeposit>
      )}
    </form>
  );
};

export default App;
