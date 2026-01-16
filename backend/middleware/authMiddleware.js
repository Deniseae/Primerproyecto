const jwt = require("jsonwebtoken");
const SECRET = "clave_secreta_tp";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No hay token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
