import fs from "fs";
import path from "path";
import {s3,S3_BUCKET} from "../config/aws-config.js";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

const revertRepo = async (commitID)=>{

    const repoPath = path.resolve(process.cwd(),".myGit");
    const commitPath = path.join(repoPath,"commit");
    const parentDir = path.join(repoPath,"..");

    try {
        const commitDir = path.join(commitPath,commitID);
        const files = await readdir(commitDir);
        
        for(const file of files){
            await copyFile(path.join(commitDir,file),path.join(parentDir,file));
        }

        console.log("Reverted back")
    } catch (err) {
        console.error("Cannot revert Back",err);
    }
}
export default revertRepo;