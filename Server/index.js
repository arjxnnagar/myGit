import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";


import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initRepo from "./controllers/init.js";
import addRepo from "./controllers/add.js";
import commitRepo from "./controllers/commit.js";
import pushRepo from "./controllers/push.js";
import pullRepo from "./controllers/pull.js";
import revertRepo from "./controllers/revert.js";
import console from "console";


const startServer = async ()=>{
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors({origin:"*"}));

  const mongoURI = process.env.MONGO_DB_URI;
  const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("DB connected");
    } 
    catch (err) {
        console.log("Connection failed");
        console.log(err);
    }
  };
  connectDB();

  app.get("/server",(req,res)=>{
    res.send("welcome to server");
  })

  const httpServer = http.createServer(app);
  const io = new Server(httpServer,{
    cors:{
      origin:"*",
      methods:["GET","POST"],
  }
  });

  io.on("connection",(socket)=>{
    socket.on("joinRoom",(userID)=>{
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    })
  })

  const db = mongoose.connection;
  db.once("open",async() =>{
    console.log("CRUD op");
  })

  httpServer.listen(port,()=>{
    console.log("Server is running on port :",port);
  })
}



yargs(hideBin(process.argv))
  .command("start","Starts our server",{},startServer)
  .command("init", "This initialises our repo", {}, initRepo)
  .command(
    "add <file>",
    "This adds file our repo",
    (y) => {
      y.positional("file", {
        describe: "File added to staging area",
        type: "string",
      });
    },
    (argv) =>{
      addRepo(argv.file);
    },
  )
  .command(
    "commit <message>",
    "This commits to our repo",
    (y) => {
      y.positional("message", {
        describe: "This is our message for commit",
        type: "string",
      });
    },
    (argv)=>{
      commitRepo(argv.message);
    },
  )
  .command("push", "This pushes to S3", {}, pushRepo)
  .command("pull", "This pulls from  S3", {}, pullRepo)
  .command("revert <commitID>", "This revert to specific commit", (y)=>{
    y.positional("commitID",{
        describe:"Commit Id to revert back to",
        type:"string"
    })
  }, (argv)=>{
    revertRepo(argv.commitID);
  })
  .demandCommand(1, "You need atleast 1 command")
  .help().argv;
