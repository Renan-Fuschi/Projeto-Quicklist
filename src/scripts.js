const addItem = document.querySelector(".add-item-button");
const newItem = document.querySelector(".quicklist-add-items input");
const list = document.querySelector(".quicklist-items-list");
const removeItem = document.querySelector(".remove-item");

// Salvar itens no localStorage
function saveItems() {
    const items = [...document.querySelectorAll(".quicklist-item label")].map(el => el.textContent);
    localStorage.setItem("quicklist", JSON.stringify(items));
}

// CARREGAR itens salvos ao abrir a página
window.addEventListener("load", () => {
    const saved = JSON.parse(localStorage.getItem("quicklist")) || [];

    saved.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("quicklist-item");
        li.innerHTML = `
            <input type="checkbox">
            <label>${item}</label>
            <button class="remove-item"></button>
        `;
        list.appendChild(li);
    });
});

// ADICIONAR item novo
addItem.addEventListener("click", (event) => {
    event.preventDefault();

    if (!newItem.value.trim()) return;

    const li = document.createElement("li");
    li.classList.add("quicklist-item");
    li.innerHTML = `
        <input type="checkbox">
        <label>${newItem.value}</label>
        <button class="remove-item"></button>
    `;

    list.appendChild(li);
    newItem.value = "";
    saveItems(); // salvar após adicionar
});

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const item = event.target.closest(".quicklist-item");
        item.remove();
        saveItems(); // salvar após remover
    }
});