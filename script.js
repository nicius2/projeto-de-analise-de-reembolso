// Selecionando os elementos de forms
const amount = document.getElementById("amount")
const forms = document.querySelector("form")
const category = document.getElementById("category")
const expense = document.getElementById("expense")
const expenseList = document.querySelector("ul")

// Evento que captura o input
amount.oninput = () => {
    // Formata o valor para não aceitar caracteres
    let value = amount.value.replace(/\D+/g, "") // expressão regular

    //Transformando valor em centavos
    value = Number(value) / 100

    // Atualizando o valor
    amount.value = formatCurrencyBRL(value)
}

// Formata para a moeda BRL
function formatCurrencyBRL(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
} 

// Evento de submit do forms
forms.onsubmit = (event) => {
    // Previne o comportamento padrão de atualizar a pagina
    event.preventDefault()

    // Objeto que vai ficar as informações do formulários
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value, // valor do input expense
        category_id: category.value, // valor da categoria no select
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_id: new Date(),        
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {

    try {
         // Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // cria a categooria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_id

    // Adicionando as infomações de despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Adicionando as informações no item
    expenseItem.append(expenseIcon, expenseInfo)

    // Adicionando o item na lista.
    expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possivel concluir o formulário")
        console.log(error)
    }
}