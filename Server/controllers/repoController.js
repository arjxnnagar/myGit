import express from "express";

const createRepository = (req, res) => {
  res.send("Repo created");
};

const getAllRepositories = (req, res) => {
  res.send("All repos");
};

const fetchRepositoryById = (req, res) => {
  res.send("fetch repo");
};

const fetchRepositoryByName = (req, res) => {
  res.send("fetch repo");
};


const fetchRepositoryForCurrentUser = (req, res) => {
  res.send("fetch repofor current user");
};

const updateRepositoryById = (req, res) => {
  res.send("update Repo");
};
const toggleVisibilityById = (req, res) => {
  res.send("Visibility tiggle");
};
const deleteRepositoryById = (req, res) => {
  res.send("Delete Repository");
};

export {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
