import { useState, useEffect } from 'react';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(600000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(25);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const payment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment);
    
    // Calculate amortization schedule
    let balance = loanAmount;
    const schedule: AmortizationRow[] = [];
    
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: balance
      });
    }
    
    setAmortizationSchedule(schedule);
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mortgage Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Loan Term (years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-100">Monthly Payment</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">${monthlyPayment.toFixed(2)}</p>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="border-b border-gray-200 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Month</th>
                <th className="border-b border-gray-200 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Payment</th>
                <th className="border-b border-gray-200 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Principal</th>
                <th className="border-b border-gray-200 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Interest</th>
                <th className="border-b border-gray-200 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-white">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row) => (
                <tr key={row.month} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="border-b border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">{row.month}</td>
                  <td className="border-b border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">${row.payment.toFixed(2)}</td>
                  <td className="border-b border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">${row.principal.toFixed(2)}</td>
                  <td className="border-b border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">${row.interest.toFixed(2)}</td>
                  <td className="border-b border-gray-200 dark:border-gray-700 p-3 text-gray-700 dark:text-gray-300">${row.remainingBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 