const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io") (Server, {
    cors: {
        origins: [
            "https://mageknight.ifsc.cloud",
            "https://*gitpod.io"
        ],
    },
});

const PORT = process.env.PORT || 3000;
var jogadores = {
    primeiro: undefined,
    segundo: undefined, //indefinido pois ninguém está conectado
};

io.on("connection", (socket) => {
    if (jogadores.primeiro === undefined) {
      jogadores.primeiro = socket.id;
    } else if (jogadores.segundo === undefined) {
      jogadores.segundo = socket.id;
    }
    io.emit("jogadores", jogadores);
    console.log("+Lista de jogadores: %s", jogadores);

});  

socket.on("disconnect", () => {
    if (jogadores.primeiro === socket.id) {
      jogadores.primeiro = undefined;
    }
    if (jogadores.segundo === socket.id) {
      jogadores.segundo = undefined;
    }
    io.emit("jogadores", jogadores);
    console.log("-Lista de jogadores: %s", jogadores);
  });

app.use(express.static("./client"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));

