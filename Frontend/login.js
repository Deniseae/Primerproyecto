const API = "http://localhost:3000/api";

// REGISTRO
function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const rol = document.getElementById("regRol").value;

  fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      rol: rol,
    }),
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        // backend respondió error (400)
        throw new Error(data.message || "Error al registrar");
      }

      return data;
    })
    .then((data) => {
      mostrarMensaje(data.message || "Usuario registrado correctamente");
    })
    .catch((error) => {
      mostrarMensaje(error.message);
    });
}

// FUNCIÓN MENSAJE (SIEMPRE definida)
function mostrarMensaje(texto) {
  document.getElementById("mensaje").innerText = texto;
}
// LOGIN
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      return data;
    })
    .then((data) => {
      // GUARDAR TOKEN Y ROL
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);

      mostrarMensaje("Login correcto");

      if (data.rol === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }
    });
}
