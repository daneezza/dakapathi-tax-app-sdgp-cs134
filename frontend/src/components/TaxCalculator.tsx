import React, { useState, useRef } from "react";
import axios from "axios";

const TaxCalculator = () => {
  const [taxType, setTaxType] = useState<string>("Income Tax");
  const [amount, setAmount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number | null>(null);
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [report, setReport] = useState<string>("");

  // Reference for calculator container
  const calculatorContainerRef = useRef<HTMLDivElement>(null);

  const handleTaxTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaxType(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const calculateTax = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/tax/calculate", {
        taxType,
        amount,
      });

      setTaxRate(response.data.taxRate);
      setTaxAmount(response.data.taxAmount);
      setTotalAmount(response.data.totalAmount);
      setReport(response.data.report);

      // Make the calculator-container scroll to the result
      setTimeout(() => {
        calculatorContainerRef.current?.scrollTo({ top: calculatorContainerRef.current.scrollHeight, behavior: "smooth" });
      }, 200);
    } catch (error) {
      console.error("Error calculating tax:", error);
    }
  };

  // Function to download report
  const downloadReport = () => {
    if (!report) return;

    const fileContent = `Tax Calculation Report\n\nTax Type: ${taxType}\nAmount: Rs.${amount.toFixed(2)}\nTax Rate: ${(taxRate! * 100).toFixed(2)}%\nTax Amount: Rs.${taxAmount?.toFixed(2)}\nTotal Amount: Rs.${totalAmount?.toFixed(2)}\n\nReport Details:\n${report}`;
    
    const blob = new Blob([fileContent], { type: "text/plain" });
    const fileURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "Tax_Report.txt";
    link.click();

    URL.revokeObjectURL(fileURL);
  };

  return (
    <div className="calculator-container" ref={calculatorContainerRef}>
      <div className="input-section">
        <label htmlFor="tax-type">Select Tax Type :</label>
        <select id="tax-type" value={taxType} onChange={handleTaxTypeChange}>
          <option value="Income Tax">Income Tax</option>
          <option value="Corporate Tax (Standard)">Corporate Tax (Standard)</option>
          <option value="Corporate Tax (Export Services)">Corporate Tax (Export Services)</option>
          <option value="VAT (Standard)">VAT (Standard)</option>
          <option value="Vehicle Import Duty">Vehicle Import Duty</option>
        </select>

        <label htmlFor="amount">Enter Amount (Rs.) :</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          placeholder="Enter the amount"
        />

        <button className="calculate-btn" onClick={calculateTax}>
          Calculate
        </button>
      </div>

      {taxRate !== null && (
        <div className="result-section">
          <h2>Results</h2>
          <p>Tax Rate: {(taxRate * 100).toFixed(2)}%</p>
          <p>Tax Amount: Rs.{taxAmount?.toFixed(2)}</p>
          <p>Total Amount: Rs.{totalAmount?.toFixed(2)}</p>
          <h3>Tax Calculation Report:</h3>
          <pre>{report}</pre>
          <button className="download-btn" onClick={downloadReport}>
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default TaxCalculator;
