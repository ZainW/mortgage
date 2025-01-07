import { MortgageCalculator } from './components/MortgageCalculator'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 w-full">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mortgage Calculator
            </h1>
            <ThemeToggle />
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <MortgageCalculator />
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
