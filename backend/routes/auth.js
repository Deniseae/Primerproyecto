const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SECRET = "clave_secreta_tp";

// REGISTRO
router.post("/register", (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  db.run(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, hash, rol || "user"],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "Usuario ya existe" });
      }
      res.json({ message: "Usuario creado correctamente" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, user) => {
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const valido = bcrypt.compareSync(password, user.password);
    if (!valido) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id, rol: user.rol }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, rol: user.rol });
  });
});

module.exports = router;
