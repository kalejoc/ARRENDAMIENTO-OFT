document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const phone = document.getElementById("phone").value;
  
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
  
      // Leer usuarios existentes
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
      // Verificar si el email ya está registrado
      const existe = usuarios.find(user => user.email === email);
      if (existe) {
        alert("Este correo ya está registrado.");
        return;
      }
  
      // Crear nuevo usuario
      const nuevoUsuario = { fullName, email, password, phone };
      usuarios.push(nuevoUsuario);
  
      // Guardar en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    });
  });
  