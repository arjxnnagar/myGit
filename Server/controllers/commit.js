import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import console from "console";

const commitRepo = async (message) => {
  const commitID = randomUUID();
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const stagingPath = path.join(repoPath, "staging");
  const commitspath = path.join(repoPath, "commits");
  const commitIDPath = path.join(commitspath, commitID);

  try {
    await fs.mkdir(commitspath, { recursive: true });
    await fs.mkdir(commitIDPath, { recursive: true });

    const files = await fs.readdir(stagingPath);

    for (const file of files) {
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitIDPath, file),
      );
    }

    await fs.writeFile(
      path.join(commitIDPath, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitID} created with message :${message}`);
  } catch (err) {
    console.log("Cannot Commit ", err);
  }
};

export default commitRepo;
