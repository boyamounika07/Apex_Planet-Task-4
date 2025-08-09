window.onload = () => {
  loadTasks();
  filterProducts();
};
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task === "") return;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}
function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">❌</button>`;
    taskList.appendChild(li);
  });
}
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
const products = [
  { name: "Laptop", category: "Electronics", price: 60000 },
  { name: "T-Shirt", category: "Clothing", price: 800 },
  { name: "Headphones", category: "Electronics", price: 2500 },
  { name: "Jeans", category: "Clothing", price: 1500 }
];
function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortOption").value;
  let filtered = [...products];
  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }
  displayProducts(filtered);
}
function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<strong>${p.name}</strong><br>${p.category}<br>₹${p.price}`;
    container.appendChild(div);
  });
}
