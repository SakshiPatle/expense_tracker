// Initial balance
let balance = 0;
let expenses = [];

// Get elements from the DOM
const balanceElement = document.getElementById('balance');
const totalSpentElement = document.getElementById('total-spent');
const expenseCountElement = document.getElementById('expense-count');
const expensesElement = document.getElementById('expenses');
const expenseForm = document.getElementById('expense-form');
const addMoneyForm = document.getElementById('add-money-form');
const moneyAmountInput = document.getElementById('money-amount');

// Function to update the UI with the current balance, total spent, and number of expenses
function updateUI() {
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    balanceElement.textContent = `₹${balance.toFixed(2)}`;
    totalSpentElement.textContent = totalSpent.toFixed(2);
    expenseCountElement.textContent = expenses.length;
}

// Function to render the list of expenses
function renderExpenses() {
    expensesElement.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="expense-details">
                <span>${expense.description}</span>
                <span class="amount">₹${expense.amount.toFixed(2)}</span>
            </div>
            <button onclick="deleteExpense(${index})">&times;</button>
        `;
        expensesElement.appendChild(li);
    });
}

// Function to add a new expense
function addExpense(description, amount) {
    expenses.push({ description, amount });
    balance -= amount;
    updateUI();
    renderExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
    const deletedExpense = expenses.splice(index, 1)[0];
    balance += deletedExpense.amount;
    updateUI();
    renderExpenses();
}

// Function to add money to the balance
function addMoney(amount) {
    balance += amount;
    updateUI();
}

// Handle form submission for adding an expense
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (description && amount) {
        addExpense(description, amount);
        expenseForm.reset();
    }
});

// Handle form submission for adding money
addMoneyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(moneyAmountInput.value);
    if (amount) {
        addMoney(amount);
        addMoneyForm.reset();
    }
});

// Initial UI update
updateUI();
