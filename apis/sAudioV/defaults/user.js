const db = require("../models/index");
const bcrypt = require("bcryptjs");
const Encargados = db.Encargados;

async function initial() {
  

  Encargados.sync().then(function(){
    Encargados.count({ where: {cedulaEncargado: 11223344} }).then(async function(count){
      if (count != 0) {
        console.log('Author already exists')
      } else {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        Encargados.create({
          cedulaEncargado: 11223344,
          nombres: "Admin",
          cargo: "Admin",
          clave: await bcrypt.hash("123", salt)
        });
      }
    })
})
}
module.exports = initial;