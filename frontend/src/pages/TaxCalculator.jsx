import { useState, useRef } from "react";
import axios from "axios";

const TaxCalculator = () => {
  const [taxType, setTaxType] = useState("Income Tax");
  const [amount, setAmount] = useState("");

  const [taxRate, setTaxRate] = useState(null);
  const [taxAmount, setTaxAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [report, setReport] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);
  const calculatorContainerRef = useRef(null);

  const handleTaxTypeChange = (e) => {
    setTaxType(e.target.value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setAmount(value);
    }
  };

  const calculateTax = async () => {
    if (amount === "") return;

    const amountValue = typeof amount === "string" ? parseFloat(amount) : amount;
    try {
      const response = await axios.post("https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/tax/calculate", {
        taxType,
        amount: amountValue,
      });

      setTaxRate(response.data.taxRate);
      setTaxAmount(response.data.taxAmount);
      setTotalAmount(response.data.totalAmount);
      setReport(response.data.report);

      setTimeout(() => {
        if (calculatorContainerRef.current) {
          calculatorContainerRef.current.scrollTo({ top: calculatorContainerRef.current.scrollHeight, behavior: "smooth" });
        }
      }, 200);
    } catch (error) {
      console.error("Error calculating tax:", error);
    }
  };

  const downloadReport = () => {
    if (!report) return;

    const fileContent = `
    Tax Calculation Report:

    The system calculates the tax by applying the selected tax rate to your entered amount. The tax rate for this calculation was ${taxRate * 100}%. Based on the entered amount of Rs.${parseFloat(amount).toFixed(2)}, the tax amount is Rs.${taxAmount?.toFixed(2)}. This tax amount is then added to the original amount to give the total payable, which is Rs.${totalAmount?.toFixed(2)}. 

    If you wish to know the remaining amount after deducting the tax, it is Rs.${(parseFloat(amount) - taxAmount).toFixed(2)}.

    Below is the detailed tax calculation report:

    ${report}
  `; 
    const blob = new Blob([fileContent], { type: "text/plain" });
    const fileURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "Dakapathi_Tax_Report.txt";
    link.click();

    URL.revokeObjectURL(fileURL);

    setShowPopUp(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 3000);
  };

  return (
    <>
      {/* disclaimer */}
      <div className="disclaimer-container">
        <p>
          <strong>Disclaimer:</strong> The tax rates and calculations provided here may not always be up-to-date. <br/>Please verify with official sources.
        </p>
      </div>

      {/* main calculator section */}
      <div className="cal-container">
        <div className="outer-wrapper">
          <h1 className="cal-topic">Unlock Your Tax Potential with DAKAPATHI</h1>

          <div className="calculator-container" ref={calculatorContainerRef}>
            <div className="input-section">
              <label htmlFor="tax-type" className="taxcal-label">Select Tax Type :</label>
              <select id="tax-type" value={taxType} onChange={handleTaxTypeChange}>
                <option value="Income Tax">Income Tax</option>
                <option value="Corporate Tax (Standard)">Corporate Tax (Standard)</option>
                <option value="Corporate Tax (Export Services)">Corporate Tax (Export Services)</option>
                <option value="VAT (Standard)">VAT (Standard)</option>
                <option value="Vehicle Import Duty">Vehicle Import Duty</option>
              </select>

              <label htmlFor="amount" className="taxcal-label">Enter Amount (Rs.) :</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                min="0"
                placeholder="Drop your digits!"
              />

              <button className="calculate-btn" onClick={calculateTax}>
                Calculate
              </button>
            </div>

            {taxRate !== null && (
              <div className="result-section">
                <p>The system calculates the tax by applying the selected tax rate to your entered amount. <br/>The tax amount is then added to the original amount to get the total payable.  
                <br/>For a detailed breakdown, download the full report.</p>

                <h3>Dakapathi Tax Calculation Report:</h3>
                <pre>{report}</pre>
                <button className="download-btn" onClick={downloadReport}>
                  Download The Full Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* success pop-up :) */}
      {showPopUp && (
        <div className="popup-notification-tax">
          <p>You nailed it! Thanks for giving us a shot!</p>
        </div>
      )}
    </>
  );
};

export default TaxCalculator;