const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADMIN crea turno
router.post("/", auth, (req, res) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "No autorizado" });
  }

  const { fecha, hora } = req.body;

  db.run(
    "INSERT INTO turnos (fecha, hora, disponible) VALUES (?, ?, 1)",
    [fecha, hora],
    () => {
      res.json({ message: "Turno creado" });
    }
  );
});

// VER turnos disponibles
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM turnos WHERE disponible = 1", [], (err, rows) => {
    res.json(rows);
  });
});

// USUARIO reserva turno
router.post("/reservar/:id", auth, (req, res) => {
  db.run(
    "UPDATE turnos SET disponible = 0, usuarioId = ? WHERE id = ?",
    [req.user.id, req.params.id],
    () => {
      res.json({ message: "Turno reservado" });
    }
  );
});

module.exports = router;
