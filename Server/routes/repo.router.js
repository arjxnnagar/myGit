import express from "express";
import {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
} from "../controllers/repoController.js";

const repoRouter = express.Router();

repoRouter.post("/create",createRepository);
repoRouter.get("/all",getAllRepositories);
repoRouter.get("/id/:id",fetchRepositoryById);
repoRouter.get("/name/:name",fetchRepositoryByName);
repoRouter.get("/user/:userID",fetchRepositoryForCurrentUser);
repoRouter.put("/update/:id",updateRepositoryById);
repoRouter.patch("/toggle/:id",toggleVisibilityById);
repoRouter.delete("/delete/:id",deleteRepositoryById);


export default repoRouter;
