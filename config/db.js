//cSpell: ignore MONGOURI

const mongoose = require("mongoose");

//string conexão no Mongo db
const MONGOURI = process.env.MONGODB_URL;

const InicializaMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true, // utiliza um novo parser do mongo
      useCreateIndex: true, // permite a criação de indices
      useFindAndModify: false, // por padrão utilizará o find one and update
      useUnifiedTopology: true, //Permite a descoberta de novos servidores
    });
    console.log("Conectado ao MongoDB");
    
  } catch (e) {
    console.error("Não foi possível conectar ao MongoDB");
    console.error(e);
    throw e;
  }
};
module.exports = InicializaMongoServer;
