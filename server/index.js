import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let rooms = [];
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("room", (room) => {
    let newRoom = {
      room: room,
      socket: socket.id,
    };
    rooms = rooms.filter((room) => room.socket !== socket.id);
    rooms.push(newRoom);
    console.log(rooms);
  });
  socket.on("message", (message) => {
    let roomId = rooms.find((room) => room.socket === socket.id)?.room;
    let roomSocket = rooms.filter((room) => room.room === roomId);
    roomSocket.forEach((room) => {
      if (room.socket !== socket.id) {
        io.to(room.socket).emit("message", message);
      }
    });
  });
});

httpServer.listen(3000, "0.0.0.0", () => {
  console.log("listening on *:3000");
});
