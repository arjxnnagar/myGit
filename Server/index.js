import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initRepo from "./controllers/init.js";
import addRepo from "./controllers/add.js";
import commitRepo from "./controllers/commit.js";
import pushRepo from "./controllers/push.js";
import pullRepo from "./controllers/pull.js";
import revertRepo from "./controllers/revert.js";

yargs(hideBin(process.argv))
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
