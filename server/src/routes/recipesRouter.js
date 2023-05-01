import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./usersRouter.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipesModel.find({});
        return res.json(response);
    } catch (err) {
        return res.json(err);
    };
});

router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipesModel(req.body);
    try {
        const response = await recipe.save();
        return res.json(response);
    } catch (err) {
        return res.json(err);
    };
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipesModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        return res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        return res.json(err);
    };
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        return res.json({ savedRecipes: user?.savedRecipes })
    } catch(err) {
        return res.json(err)
    };
});

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes }
        });
        return res.json({ savedRecipes });
    } catch(err) {
        return res.json(err)
    };
});

export { router as recipesRouter };
