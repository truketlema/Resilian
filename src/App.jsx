"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { ArrowLeft, BarChart3, PiggyBank, CheckCircle2, Check } from "lucide-react"
import HomePage from "./HomePage"
import "./App.css"
import logo from "./assets/Rectangle.png"

function BudgetTracker() {
  const [step, setStep] = useState(1)
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [trackingFrequency, setTrackingFrequency] = useState("weekly")
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" })
  const [savings, setSavings] = useState([])
  const [savingDays, setSavingDays] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [activeTab, setActiveTab] = useState("tracker")

  // Generate saving plans based on income
  const getSavingPlans = () => {
    const income = Number.parseFloat(monthlyIncome)
    if (!income || isNaN(income)) return []

    return [
      {
        id: "conservative",
        name: "Conservative Plan",
        percentage: 10,
        amount: (income * 0.1).toFixed(2),
        description: "Save 10% of your income each month. Ideal for beginners or those with high expenses.",
      },
      {
        id: "balanced",
        name: "Balanced Plan",
        percentage: 20,
        amount: (income * 0.2).toFixed(2),
        description: "Save 20% of your income each month. A good balance between saving and spending.",
      },
      {
        id: "aggressive",
        name: "Aggressive Plan",
        percentage: 30,
        amount: (income * 0.3).toFixed(2),
        description: "Save 30% of your income each month. Ideal for rapid wealth building.",
      },
      {
        id: "custom",
        name: "Custom Plan",
        percentage: "Custom",
        amount: "You decide",
        description: "Set your own saving goal based on your financial situation.",
      },
    ]
  }

  // Calculate progress based on selected plan
  const calculateProgress = () => {
    const income = Number.parseFloat(monthlyIncome)
    if (!income || isNaN(income) || !selectedPlan) return 0

    const totalSaved = savings.reduce((sum, item) => sum + item.amount, 0)

    if (selectedPlan === "custom") {
      // For custom plan, we'll use the total saved as a percentage of income
      return Math.min((totalSaved / income) * 100, 100)
    }

    const plan = getSavingPlans().find((p) => p.id === selectedPlan)
    if (!plan) return 0

    const targetSavings = (income * plan.percentage) / 100
    return Math.min((totalSaved / targetSavings) * 100, 100)
  }

  // Add a new expense
  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, newExpense])
      setNewExpense({ category: "", amount: "" })
    }
  }

  // Add a new saving entry
  const handleAddSaving = (amount) => {
    const today = new Date().toISOString().split("T")[0]
    setSavings([...savings, { date: today, amount }])
  }

  // Get monthly saving target
  const getMonthlySavingTarget = () => {
    const income = Number.parseFloat(monthlyIncome)
    if (!income || isNaN(income) || !selectedPlan) return 0

    if (selectedPlan === "custom") {
      // For custom plan, we'll use a default of 15%
      return income * 0.15
    }

    const plan = getSavingPlans().find((p) => p.id === selectedPlan)
    if (!plan) return 0

    return (income * plan.percentage) / 100
  }

  // Get daily saving target
  const getDailySavingTarget = () => {
    const monthlySavingTarget = getMonthlySavingTarget()
    // Assuming 30 days in a month
    return monthlySavingTarget / 30
  }

  // Get weekly saving target
  const getWeeklySavingTarget = () => {
    const monthlySavingTarget = getMonthlySavingTarget()
    // Assuming 4 weeks in a month
    return monthlySavingTarget / 4
  }

  // Format currency in Ethiopian Birr
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} ብር`
  }

  // Generate days for the current month
  const generateDaysInMonth = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days = []

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i).toISOString().split("T")[0]

      // Check if we already have this day in our state
      const existingDay = savingDays.find((day) => day.date === date)

      if (existingDay) {
        days.push(existingDay)
      } else {
        days.push({
          date,
          completed: false,
          amount: getDailySavingTarget(),
        })
      }
    }

    return days
  }

  // Generate weeks for the current month
  const generateWeeksInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)

    const weeks = []
    const currentDate = new Date(firstDay)

    // Find the first day of the week (Sunday)
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())

    while (currentDate <= lastDay || weeks.length < 6) {
      const weekStart = new Date(currentDate)
      const weekDays = []

      // Add 7 days to make a week
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate)
        const dateString = date.toISOString().split("T")[0]

        // Check if the day is in the current month
        const isCurrentMonth = date.getMonth() === currentMonth

        // Check if we already have this day in our state
        const existingDay = savingDays.find((day) => day.date === dateString)

        if (existingDay && isCurrentMonth) {
          weekDays.push(existingDay)
        } else if (isCurrentMonth) {
          weekDays.push({
            date: dateString,
            completed: false,
            amount: getDailySavingTarget(),
          })
        } else {
          weekDays.push(null) // Day not in current month
        }

        currentDate.setDate(currentDate.getDate() + 1)
      }

      weeks.push({
        start: weekStart.toISOString().split("T")[0],
        days: weekDays,
        completed: false,
        amount: getWeeklySavingTarget(),
      })

      if (weeks.length >= 6) break // Maximum 6 weeks to display
    }

    return weeks
  }

  // Toggle day completion
  const toggleDayCompletion = (date) => {
    const updatedDays = savingDays.map((day) => {
      if (day.date === date) {
        // If toggling from incomplete to complete, add to savings
        if (!day.completed) {
          handleAddSaving(day.amount)
        }

        return { ...day, completed: !day.completed }
      }
      return day
    })

    setSavingDays(updatedDays)
  }

  // Toggle week completion
  const toggleWeekCompletion = (weekStart) => {
    const updatedDays = savingDays.map((day) => {
      const dayDate = new Date(day.date)
      const weekStartDate = new Date(weekStart)
      const weekEndDate = new Date(weekStartDate)
      weekEndDate.setDate(weekEndDate.getDate() + 6)

      if (dayDate >= weekStartDate && dayDate <= weekEndDate) {
        return { ...day, completed: true }
      }
      return day
    })

    // Add weekly saving to total
    handleAddSaving(getWeeklySavingTarget())

    setSavingDays(updatedDays)
  }

  // Initialize saving days when tracking frequency or month changes
  useEffect(() => {
    if (step === 4) {
      if (trackingFrequency === "daily") {
        setSavingDays(generateDaysInMonth())
      } else if (trackingFrequency === "weekly") {
        // For weekly tracking, we still need daily data
        setSavingDays(generateDaysInMonth())
      }
    }
  }, [trackingFrequency, currentMonth, currentYear, step])

  // Get month name
  const getMonthName = (month) => {
    return new Date(2000, month, 1).toLocaleString("default", { month: "long" })
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="budget-tracker">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="Resilian Logo" width={24} height={24} />
            <span>Resilian</span>
          </Link>
          <Link to="/" className="back-button">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="content">
            <h1>Budget Tracker</h1>
            <p className="subtitle">
              Take control of your finances with our easy-to-use budget tracker
            </p>

            {step === 1 && (
              <div className="card">
                <div className="card-header">
                  <h2>Let's get started</h2>
                  <p>
                    First, tell us about your monthly income so we can create a
                    personalized saving plan
                  </p>
                </div>
                <div className="card-content">
                  <div className="form-group">
                    <label htmlFor="monthly-income">
                      Monthly Income (in Ethiopian Birr)
                    </label>
                    <div className="input-wrapper">
                      <span className="currency-symbol">ብር</span>
                      <input
                        id="monthly-income"
                        type="number"
                        placeholder="Enter your monthly income"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="button primary full-width"
                    onClick={() => setStep(2)}
                    disabled={!monthlyIncome}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <div className="card-header">
                  <h2>Choose a Saving Plan</h2>
                  <p>
                    Based on your monthly income of{" "}
                    {Number.parseFloat(monthlyIncome).toLocaleString()} ብር, here
                    are some saving plans we recommend
                  </p>
                </div>
                <div className="card-content">
                  <div className="radio-group">
                    <div className="plan-grid">
                      {getSavingPlans().map((plan) => (
                        <div key={plan.id} className="plan-option">
                          <input
                            type="radio"
                            id={plan.id}
                            name="plan"
                            value={plan.id}
                            checked={selectedPlan === plan.id}
                            onChange={() => setSelectedPlan(plan.id)}
                            className="radio-input"
                          />
                          <label
                            htmlFor={plan.id}
                            className={`plan-label ${
                              selectedPlan === plan.id ? "selected" : ""
                            }`}
                          >
                            <div className="plan-details">
                              <div>
                                <div className="plan-name">{plan.name}</div>
                                <div className="plan-description">
                                  {plan.description}
                                </div>
                              </div>
                              <div className="plan-amount">
                                <div className="amount">
                                  {plan.id === "custom"
                                    ? plan.amount
                                    : `${plan.amount} ብር`}
                                </div>
                                <div className="percentage">
                                  {plan.percentage}% of income
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="button secondary"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="button primary"
                    onClick={() => setStep(3)}
                    disabled={!selectedPlan}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card">
                <div className="card-header">
                  <h2>How would you like to track your savings?</h2>
                  <p>
                    Choose how frequently you want to monitor your saving
                    progress
                  </p>
                </div>
                <div className="card-content">
                  <div className="radio-group">
                    <div className="frequency-grid">
                      {[
                        {
                          id: "daily",
                          name: "Daily",
                          description: `Save ${formatCurrency(
                            getDailySavingTarget()
                          )} every day`,
                        },
                        {
                          id: "weekly",
                          name: "Weekly",
                          description: `Save ${formatCurrency(
                            getWeeklySavingTarget()
                          )} every week`,
                        },
                      ].map((option) => (
                        <div key={option.id} className="frequency-option">
                          <input
                            type="radio"
                            id={option.id}
                            name="frequency"
                            value={option.id}
                            checked={trackingFrequency === option.id}
                            onChange={() => setTrackingFrequency(option.id)}
                            className="radio-input"
                          />
                          <label
                            htmlFor={option.id}
                            className={`frequency-label ${
                              trackingFrequency === option.id ? "selected" : ""
                            }`}
                          >
                            <div className="frequency-name">{option.name}</div>
                            <div className="frequency-description">
                              {option.description}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="button secondary"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button className="button primary" onClick={() => setStep(4)}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="dashboard">
                <div className="card">
                  <div className="card-header">
                    <h2>Your Budget Dashboard</h2>
                    <p>Track your income, expenses, and savings progress</p>
                  </div>
                  <div className="card-content">
                    <div className="tabs">
                      <div className="tab-list">
                        <button
                          className={`tab-button ${
                            activeTab === "tracker" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("tracker")}
                        >
                          Saving Tracker
                        </button>
                        <button
                          className={`tab-button ${
                            activeTab === "overview" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("overview")}
                        >
                          Overview
                        </button>
                        <button
                          className={`tab-button ${
                            activeTab === "expenses" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("expenses")}
                        >
                          Expenses
                        </button>
                      </div>

                      {activeTab === "tracker" && (
                        <div className="tab-content">
                          <div className="card inner-card">
                            <div className="card-header">
                              <div className="month-navigation">
                                <button
                                  className="button small"
                                  onClick={goToPreviousMonth}
                                >
                                  Previous
                                </button>
                                <h3>
                                  {getMonthName(currentMonth)} {currentYear}
                                </h3>
                                <button
                                  className="button small"
                                  onClick={goToNextMonth}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                            <div className="card-content">
                              {trackingFrequency === "daily" && (
                                <div className="calendar">
                                  <div className="weekdays">
                                    {[
                                      "Sun",
                                      "Mon",
                                      "Tue",
                                      "Wed",
                                      "Thu",
                                      "Fri",
                                      "Sat",
                                    ].map((day) => (
                                      <div key={day} className="weekday">
                                        {day}
                                      </div>
                                    ))}
                                  </div>

                                  <div className="days-grid">
                                    {generateWeeksInMonth().flatMap((week) =>
                                      week.days.map((day, index) => (
                                        <div
                                          key={`${week.start}-${index}`}
                                          className={`day ${
                                            !day ? "inactive" : ""
                                          } ${
                                            day?.completed ? "completed" : ""
                                          }`}
                                        >
                                          {day && (
                                            <>
                                              <div className="day-number">
                                                {new Date(day.date).getDate()}
                                              </div>
                                              <div className="day-checkbox">
                                                {day.completed ? (
                                                  <div className="check-circle">
                                                    <Check size={16} />
                                                  </div>
                                                ) : (
                                                  <input
                                                    type="checkbox"
                                                    checked={day.completed}
                                                    onChange={() =>
                                                      toggleDayCompletion(
                                                        day.date
                                                      )
                                                    }
                                                  />
                                                )}
                                              </div>
                                              <div className="day-amount">
                                                {formatCurrency(day.amount)}
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      ))
                                    )}
                                  </div>

                                  <div className="saving-summary">
                                    <div>
                                      <div className="summary-label">
                                        Daily Saving Target
                                      </div>
                                      <div className="summary-value">
                                        {formatCurrency(getDailySavingTarget())}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="summary-label">
                                        Monthly Saving Target
                                      </div>
                                      <div className="summary-value">
                                        {formatCurrency(
                                          getMonthlySavingTarget()
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="summary-label">
                                        Days Completed
                                      </div>
                                      <div className="summary-value">
                                        {
                                          savingDays.filter(
                                            (day) => day.completed
                                          ).length
                                        }{" "}
                                        / {savingDays.length}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {trackingFrequency === "weekly" && (
                                <div className="calendar">
                                  <div className="weekdays">
                                    {[
                                      "Sun",
                                      "Mon",
                                      "Tue",
                                      "Wed",
                                      "Thu",
                                      "Fri",
                                      "Sat",
                                    ].map((day) => (
                                      <div key={day} className="weekday">
                                        {day}
                                      </div>
                                    ))}
                                  </div>

                                  {generateWeeksInMonth().map(
                                    (week, weekIndex) => (
                                      <div key={week.start} className="week">
                                        <div className="days-grid">
                                          {week.days.map((day, dayIndex) => (
                                            <div
                                              key={`${week.start}-${dayIndex}`}
                                              className={`day mini ${
                                                !day ? "inactive" : ""
                                              } ${
                                                day?.completed
                                                  ? "completed"
                                                  : ""
                                              }`}
                                            >
                                              {day && (
                                                <div className="day-number">
                                                  {new Date(day.date).getDate()}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>

                                        <div className="week-summary">
                                          <div>
                                            <div className="week-name">
                                              Week {weekIndex + 1}
                                            </div>
                                            <div className="week-amount">
                                              {formatCurrency(
                                                getWeeklySavingTarget()
                                              )}
                                            </div>
                                          </div>
                                          <div>
                                            {week.days.some(
                                              (day) => day?.completed
                                            ) ? (
                                              <div className="check-circle large">
                                                <Check size={20} />
                                              </div>
                                            ) : (
                                              <button
                                                className="button small"
                                                onClick={() =>
                                                  toggleWeekCompletion(
                                                    week.start
                                                  )
                                                }
                                                disabled={
                                                  !week.days.some(
                                                    (day) => day !== null
                                                  )
                                                }
                                              >
                                                Mark as Saved
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}

                                  <div className="saving-summary">
                                    <div>
                                      <div className="summary-label">
                                        Weekly Saving Target
                                      </div>
                                      <div className="summary-value">
                                        {formatCurrency(
                                          getWeeklySavingTarget()
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="summary-label">
                                        Monthly Saving Target
                                      </div>
                                      <div className="summary-value">
                                        {formatCurrency(
                                          getMonthlySavingTarget()
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="summary-label">
                                        Weeks Completed
                                      </div>
                                      <div className="summary-value">
                                        {
                                          generateWeeksInMonth().filter(
                                            (week) =>
                                              week.days.some(
                                                (day) => day?.completed
                                              )
                                          ).length
                                        }{" "}
                                        / {generateWeeksInMonth().length}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="card inner-card">
                            <div className="card-header">
                              <h3>Saving Progress</h3>
                              <p>
                                {selectedPlan &&
                                  getSavingPlans().find(
                                    (p) => p.id === selectedPlan
                                  )?.name}
                              </p>
                            </div>
                            <div className="card-content">
                              <div className="progress-container">
                                <div className="progress-labels">
                                  <span>Progress</span>
                                  <span>
                                    {Math.round(calculateProgress())}%
                                  </span>
                                </div>
                                <div className="progress-bar">
                                  <div
                                    className="progress-fill"
                                    style={{ width: `${calculateProgress()}%` }}
                                  ></div>
                                </div>
                                <div className="progress-summary">
                                  <div>
                                    <div className="summary-label">
                                      Saved so far
                                    </div>
                                    <div className="summary-value">
                                      {formatCurrency(
                                        savings.reduce(
                                          (sum, item) => sum + item.amount,
                                          0
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="summary-label">
                                      Monthly target
                                    </div>
                                    <div className="summary-value">
                                      {formatCurrency(getMonthlySavingTarget())}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "overview" && (
                        <div className="tab-content">
                          <div className="stats-grid">
                            <div className="card inner-card">
                              <div className="card-header">
                                <h3 className="small">Monthly Income</h3>
                              </div>
                              <div className="card-content">
                                <div className="stat">
                                  <span className="currency-symbol">ብር</span>
                                  <span className="stat-value">
                                    {Number.parseFloat(
                                      monthlyIncome
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="card inner-card">
                              <div className="card-header">
                                <h3 className="small">Total Expenses</h3>
                              </div>
                              <div className="card-content">
                                <div className="stat">
                                  <BarChart3
                                    size={20}
                                    className="stat-icon expense"
                                  />
                                  <span className="stat-value">
                                    {expenses
                                      .reduce(
                                        (sum, item) =>
                                          sum +
                                          Number.parseFloat(item.amount || "0"),
                                        0
                                      )
                                      .toLocaleString()}{" "}
                                    ብር
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="card inner-card">
                              <div className="card-header">
                                <h3 className="small">Total Savings</h3>
                              </div>
                              <div className="card-content">
                                <div className="stat">
                                  <PiggyBank
                                    size={20}
                                    className="stat-icon saving"
                                  />
                                  <span className="stat-value">
                                    {savings
                                      .reduce(
                                        (sum, item) => sum + item.amount,
                                        0
                                      )
                                      .toLocaleString()}{" "}
                                    ብር
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card inner-card">
                            <div className="card-header">
                              <h3>Saving Progress</h3>
                              <p>
                                {selectedPlan &&
                                  getSavingPlans().find(
                                    (p) => p.id === selectedPlan
                                  )?.name}
                              </p>
                            </div>
                            <div className="card-content">
                              <div className="progress-container">
                                <div className="progress-labels">
                                  <span>Progress</span>
                                  <span>
                                    {Math.round(calculateProgress())}%
                                  </span>
                                </div>
                                <div className="progress-bar">
                                  <div
                                    className="progress-fill"
                                    style={{ width: `${calculateProgress()}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "expenses" && (
                        <div className="tab-content">
                          <div className="card inner-card">
                            <div className="card-header">
                              <h3>Add Expense</h3>
                            </div>
                            <div className="card-content">
                              <div className="expense-form">
                                <div className="form-row">
                                  <div className="form-group">
                                    <label htmlFor="expense-category">
                                      Category
                                    </label>
                                    <select
                                      id="expense-category"
                                      value={newExpense.category}
                                      onChange={(e) =>
                                        setNewExpense({
                                          ...newExpense,
                                          category: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="" disabled>
                                        Select category
                                      </option>
                                      <option value="housing">Housing</option>
                                      <option value="transportation">
                                        Transportation
                                      </option>
                                      <option value="food">Food</option>
                                      <option value="utilities">
                                        Utilities
                                      </option>
                                      <option value="healthcare">
                                        Healthcare
                                      </option>
                                      <option value="entertainment">
                                        Entertainment
                                      </option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="expense-amount">
                                      Amount (ብር)
                                    </label>
                                    <div className="input-wrapper">
                                      <span className="currency-symbol">
                                        ብር
                                      </span>
                                      <input
                                        id="expense-amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={newExpense.amount}
                                        onChange={(e) =>
                                          setNewExpense({
                                            ...newExpense,
                                            amount: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="button primary full-width"
                                  onClick={handleAddExpense}
                                  disabled={
                                    !newExpense.category || !newExpense.amount
                                  }
                                >
                                  Add Expense
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="card inner-card">
                            <div className="card-header">
                              <h3>Expense List</h3>
                            </div>
                            <div className="card-content">
                              {expenses.length === 0 ? (
                                <p className="empty-message">
                                  No expenses added yet
                                </p>
                              ) : (
                                <div className="expense-list">
                                  {expenses.map((expense, index) => (
                                    <div key={index} className="expense-item">
                                      <div className="expense-category">
                                        {expense.category}
                                      </div>
                                      <div className="expense-amount">
                                        {Number.parseFloat(
                                          expense.amount
                                        ).toLocaleString()}{" "}
                                        ብር
                                      </div>
                                    </div>
                                  ))}
                                  <div className="expense-total">
                                    <div className="total-label">Total</div>
                                    <div className="total-amount">
                                      {expenses
                                        .reduce(
                                          (sum, item) =>
                                            sum +
                                            Number.parseFloat(
                                              item.amount || "0"
                                            ),
                                          0
                                        )
                                        .toLocaleString()}{" "}
                                      бр
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card tips-card">
                  <div className="card-header">
                    <h2>Saving Tips</h2>
                  </div>
                  <div className="card-content">
                    <div className="tips-list">
                      {[
                        "Set up a separate savings jar or envelope for your daily/weekly savings",
                        "Mark each day you save on the calendar to build a streak habit",
                        "Start with small amounts if the target seems difficult at first",
                        "Involve family members in your saving goals for accountability",
                        "Celebrate when you reach weekly or monthly saving milestones",
                      ].map((tip, index) => (
                        <div key={index} className="tip-item">
                          <CheckCircle2 size={20} className="tip-icon" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Resilian. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("tracker")

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
      </Routes>
    </Router>
  )
}

export default App


