// Selecionando os elementos do formulario
const amount = document.getElementById("amount")
const forms = document.querySelector("form")
const category = document.getElementById("category")
const expense = document.getElementById("expense")

// Selecionando os elementos da lista 
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

// Evento que captura o input e formata o valor
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

    // Adiciona mais um item na lista
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
    expenseCategory.textContent = newExpense.category_name

    // Adicionando as infomações de despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
        .toUpperCase()
        .replace("R$", "")
    }`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", `img/remove.svg`)
    removeIcon.setAttribute("alt", "remover")


    // Adicionando as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adicionando o item na lista.
    expenseList.append(expenseItem)

    // Atualiza o total de items
    updateTotals()

    } catch (error) {
        alert("Não foi possivel concluir o formulário")
        console.log(error)
    }
}

// Atualiza os totais
function updateTotals() {
    try {
        const items = expenseList.children
        
        // quantidade de despesas
        expenseQuantity.textContent = `${items.length} ${
            items.length > 1 ? "despesas" : "despesa"
        }`

       //Acumular o valor total
       let total = 0

       for(let item = 0; item < items.length; item++) {

        const itemAmount = items[item].querySelector(".expense-amount")

        let value = itemAmount.textContent.replace(/[^\d,]/g, "")
        .replace(",", ".")

        value = parseFloat(value)

        // Verificando se o numero é valido
        if(isNaN(value)) {
            return alert(
                "Não foi possivel calcular o total. O valor não aparece ser um número."
            )
        }

        total += Number(value)
       }

        expenseTotal.textContent = total

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // Formata o valor e remove o R$ que será exibido pela small com um estilo
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // Limpa o conteúdo do elemento
        expenseTotal.innerHTML = ""

        // Adiciona o simbolo 
        expenseTotal.append(symbolBRL, total)
    
    } catch (error) {
        alert("Não foi possivel atualizar a lista")
        console.log(error)
    }
}

// Evento que captura o cliique dos itens da lista 
expenseList.addEventListener("click", function (event){
    // Verifica se o item clicando é o de remove
    if(event.target.classList.contains("remove-icon")) {

        // Obtem a li pai do elemento clicado
        const item = event.target.closest(".expense")

        // Remove a li
        item.remove()
    }

    // Atualiza os totais
    updateTotals() 
    
})