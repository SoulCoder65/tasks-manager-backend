const express = require("express");
const { signup, login, googleLogin } = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token_here
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: user_id_here
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: john.doe@example.com
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to sign up user
 */
router.post("/signup", signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token_here
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: user_id_here
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: john.doe@example.com
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to log in user
 */
router.post("/login", login);

/**
 * @swagger
 * /google-login:
 *   post:
 *     summary: Login or create a new user using Google ID token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google ID token for authentication
 *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwNTc5ZGE4ZTIzNGE3OTZhNzBlYzM0MzFhYzU3OTMxMjZkZDk5YjYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDAwMTI0NjI5IiwiYXVkIjoiMTIzNDVjNTMwN2ZkZWU0ZGI3OTQ4NjIiLCJhdXRoX3RpbWUiOiIxNTk5ODI3NzEwIiwic3ViX2NsaWVudF9hdXRoX3RpbWUiOiIxNTk5ODI3NzEwIiwiYXVkX3N0b3JhbGxpbmciOiJodHRwOi8vZG9tYWluLmNvbSIsImVtYWlsIjoibWVAdGVzdC5jb20iLCJ1c2VyX2lkIjoiMTAwMDEyNDYyOSIsImlhdCI6MTU5OTgyNzcyNywiZXhwIjoxNTk5ODMwMzI3fQ.N0X0zgNHTazvFgS1-bHt4J4D_rXy2ZJxhxX-7wgiNUIvZ3Ths80-Vw3aT2a1THx53A2rbXK-zFPnnSzZJzxS5m3uO0GKOBykgfDL6_XXFscvTzAa_6vOM__-RmXntr9r3XpsPbIorRQdD2O-OWb7P4ZJXWmT8eYkxro2KbtPHn5J5uZk9S4xv4r8bNQ"
 *     responses:
 *       200:
 *         description: Successful login or account creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwMTI0NjI5IiwiYXVkIjoiMTIzNDVjNTMwN2ZkZWU0ZGI3OTQ4NjIiLCJhdXRoX3RpbWUiOiIxNTk5ODI3NzEwIiwic3ViX2NsaWVudF9hdXRoX3RpbWUiOiIxNTk5ODI3NzEwIiwiYXVkX3N0b3JhbGxpbmciOiJodHRwOi8vZG9tYWluLmNvbSIsImVtYWlsIjoibWVAdGVzdC5jb20iLCJ1c2VyX2lkIjoiMTAwMDEyNDYyOSIsImlhdCI6MTU5OTgyNzcyNywiZXhwIjoxNTk5ODMwMzI3fQ.AB7EpjWJ9s6yqPq2P3t3T-S9QirWJzo6jLKphbdQ7BQ8z9LhU96VJChg4YXkS_XA0g-cQxX2wtrzQp7bb8G7w"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                       example: "user_id_here"
 *                     firstName:
 *                       type: string
 *                       description: User's first name
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       description: User's last name
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: "user@example.com"
 *       500:
 *         description: Failed to login or create account for user
 */
router.post("/google-login", googleLogin);

module.exports = router;
