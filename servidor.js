const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
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
  // Aguardar pelo jogador enviar o nome da sala
  socket.on("entrar-na-sala", (sala) => {
    socket.join(sala);
    var jogadores = {};
    if (io.sockets.adapter.rooms.get(sala).size === 1) { // 1 jogador
      jogadores = {
        primeiro: socket.id,
        segundo: undefined,
      };
    } else if (io.sockets.adapter.rooms.get(sala).size === 2) { // 2 jogadores
      let [primeiro] = io.sockets.adapter.rooms.get(sala);
      jogadores = {
        primeiro: primeiro,
        segundo: socket.id,
      };
    }
    console.log("Sala %s: %s", sala, jogadores);
    // Envia a todos a lista atual de jogadores (mesmo incompleta)
    io.to(sala).emit("jogadores", jogadores);
  });

  // Sinalização de áudio: oferta
  socket.on("offer", (sala, description) => {
    socket.broadcast.to(sala).emit("offer", socket.id, description);
  });

  // Sinalização de áudio: atendimento da oferta
  socket.on("answer", (sala, description) => {
    socket.broadcast.to(sala).emit("answer", description);
  });

  // Sinalização de áudio: envio dos candidatos de caminho
  socket.on("candidate", (sala, signal) => {
    socket.broadcast.to(sala).emit("candidate", signal);
  });

  // Disparar evento quando jogador sair da partida
  socket.on("disconnect", () => { });

  // Envio do estado do outro jogador
  socket.on("estadoDoJogador", (sala, estado) => {
    socket.broadcast.to(sala).emit("desenharOutroJogador", estado);
  });
});


app.use(express.static("./client"));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));

