// Usuarios predefinidos
const usuariosPredefinidos = [
    { username: "admin", password: "1234" },
    { username: "usuario1", password: "abcd" }
  ];
  
  // Esperar a que cargue el DOM
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Obtener usuarios registrados desde localStorage
      const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      // Buscar en predefinidos
      const usuarioPredef = usuariosPredefinidos.find(user => user.username === username && user.password === password);
  
      // Buscar en registrados
      const usuarioRegistrado = usuariosRegistrados.find(user => user.email === username && user.password === password);
  
      // Verificación final
      if (usuarioPredef) {
        localStorage.setItem("usuarioLogueado", usuarioPredef.username);
        window.location.href = "last_login.html";
      } else if (usuarioRegistrado) {
        localStorage.setItem("usuarioLogueado", usuarioRegistrado.fullName);
        window.location.href = "last_login.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  });
  