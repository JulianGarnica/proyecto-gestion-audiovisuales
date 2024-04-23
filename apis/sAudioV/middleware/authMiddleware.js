//Const of module required
const jwt = require("jsonwebtoken");
const config = require("../../../config.json")["development"];
const db = require("../models/index");
const Encargados = db.Encargados;

const SECRET_KEY = config.secret_key;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err || !user.name) {
      return res.status(403).json({ error: "Token inválido" });
    }

    Encargados.sync().then(function () {
      Encargados.findOne({ where: { cedulaEncargado: user.userId }, attributes: { exclude: ['createdAt', 'updatedAt', 'clave'] } }).then(async function (data) {
        if(data){
          req.user = data;
          next();
        }else{
          return res.status(403).json({ error: "Token inválido" });
        }
      });
    });
    
  });
}

module.exports = authenticateToken;
