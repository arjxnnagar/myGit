import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const commitsPath = path.join(repoPath, "commits");
  const date = new Date().toISOString();

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath);
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({
        message: `initialising Git at ${date}`,
        bucket: process.env.S3_BUCKET,
      }),
    );
  } catch (err) {
    console.log("Error in initialising Repo", err);
  }
};

export default initRepo;
