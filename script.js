document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userTable = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];
  const submitBtn = document.getElementById("submitBtn");
  const toggleFormBtn = document.getElementById("toggleFormBtn");
  const formContainer = document.getElementById("formContainer");
  const formTitle = document.getElementById("formTitle");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let editingIndex = -1;

  function renderTable(usersToRender = users) {
    userTable.innerHTML = "";
    usersToRender.forEach((user, index) => {
      const row = userTable.insertRow();
      Object.values(user).forEach((text) => {
        const cell = row.insertCell();
        cell.textContent = text;
      });
      const actionsCell = row.insertCell();
      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.className = "action-btn edit-btn";
      editBtn.onclick = () => editUser(index);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.className = "action-btn delete-btn";
      deleteBtn.onclick = () => deleteUser(index);
      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
    });
  }

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
  }

  function addUser(user) {
    users.push(user);
    saveUsers();
  }

  function updateUser(index, user) {
    users[index] = user;
    saveUsers();
  }

  function deleteUser(index) {
    users.splice(index, 1);
    saveUsers();
  }

  function editUser(index) {
    const user = users[index];
    document.getElementById("userId").value = index;
    document.getElementById("nombre").value = user.nombre;
    document.getElementById("telefono").value = user.telefono;
    document.getElementById("sexo").value = user.sexo;
    document.getElementById("pais").value = user.pais;
    document.getElementById("departamento").value = user.departamento;
    document.getElementById("ciudad").value = user.ciudad;
    document.getElementById("temperatura").value = user.temperatura;
    document.getElementById("fechaNacimiento").value = user.fechaNacimiento;
    submitBtn.textContent = "Actualizar";
    formTitle.textContent = "Editar Usuario";
    editingIndex = index;
    showForm();
  }

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      sexo: document.getElementById("sexo").value,
      pais: document.getElementById("pais").value,
      departamento: document.getElementById("departamento").value,
      ciudad: document.getElementById("ciudad").value,
      temperatura: document.getElementById("temperatura").value,
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
    };

    if (editingIndex === -1) {
      addUser(user);
    } else {
      updateUser(editingIndex, user);
      editingIndex = -1;
    }

    userForm.reset();
    hideForm();
    submitBtn.textContent = "Registrar";
    formTitle.textContent = "Registrar Usuario";
  });

  function showForm() {
    formContainer.classList.remove("hidden");
    toggleFormBtn.textContent = "Cancelar";
  }

  function hideForm() {
    formContainer.classList.add("hidden");
    toggleFormBtn.textContent = "Registrar Nuevo Usuario";
    userForm.reset();
    editingIndex = -1;
    submitBtn.textContent = "Registrar";
    formTitle.textContent = "Registrar Usuario";
  }

  toggleFormBtn.onclick = () => {
    if (formContainer.classList.contains("hidden")) {
      showForm();
    } else {
      hideForm();
    }
  };

  function searchUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.nombre.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredUsers);
  }

  searchBtn.addEventListener("click", searchUsers);

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  });

  renderTable();
});
