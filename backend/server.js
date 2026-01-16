const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const turnosRoutes = require("./routes/turnos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/turnos", turnosRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
app.use("/api/auth", authRoutes);
