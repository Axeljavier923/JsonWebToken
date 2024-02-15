import {app, port} from "./server.js"
import {sequelize} from "./src/database/db.js"

import {routes_auth} from './src/routes/routes_user.js';


// Routes

app.use("/", routes_auth);

  // Listen
  app.listen(port, () => {
    console.log(`La app está escuchando en http://localhost:${process.env.PORT}` );
  });

// Conexion a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log("Nos hemos conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Se ha producido un error", error);
  });
