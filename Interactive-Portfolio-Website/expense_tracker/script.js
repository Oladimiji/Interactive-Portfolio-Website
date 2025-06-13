document.addEventListener("DOMContentLoaded", () => {
    const budgetWarning = document.getElementById("budget-warning");
    const budgetAdvice = document.getElementById("budget-advice");
    const expensePrediction = document.getElementById("expense-prediction");
    const streakStatus = document.getElementById("streak-status");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function updateInsights() {
        let totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        let budgetLimit = parseFloat(localStorage.getItem("budgetLimit")) || 0;
        let savingGoal = parseFloat(localStorage.getItem("savingGoal")) || 0;
        let overspendingDays = 0;
        let spendingStreak = 1;
        let previousDate = null;

        // AI Budget Advice
        if (totalSpent > budgetLimit && budgetLimit > 0) {
            budgetWarning.textContent = "Warning: You've exceeded your budget!";
            budgetWarning.style.color = "red";
        } else {
            budgetWarning.textContent = "";
        }

        budgetAdvice.textContent = totalSpent > budgetLimit * 0.8 
            ? "Caution: You're nearing your budget limit. Plan wisely." 
            : "You're managing expenses efficiently! Keep going.";

        // Future Expense Prediction
        let daysElapsed = (new Date() - new Date(expenses[0]?.date)) / (1000 * 60 * 60 * 24);
        let dailyAvg = totalSpent / (daysElapsed || 1);
        let daysRemaining = 30 - new Date().getDate();
        expensePrediction.textContent = `Projected spending by month-end: $${(dailyAvg * daysRemaining).toFixed(2)}`;

        // Spending Streak Tracking
        expenses.forEach(exp => {
            let expDate = new Date(exp.date);
            if (previousDate) {
                if ((expDate - previousDate) / (1000 * 60 * 60 * 24) === 1) {
                    spendingStreak++;
                } else {
                    spendingStreak = 1;
                }
            }
            previousDate = expDate;
            
            if (budgetLimit > 0 && exp.amount > budgetLimit / 30) {
                overspendingDays++;
            }
        });

        streakStatus.textContent = `Current streak: ${spendingStreak} days. Overspending days: ${overspendingDays}`;
        streakStatus.style.color = overspendingDays > 3 ? "red" : "green";
    }

    updateInsights(); // Load insights on page load
});
