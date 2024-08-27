const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');
const authMiddleware = require('../middleware/authMiddleware'); 

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Task Title
 *               description:
 *                 type: string
 *                 example: Task Description
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *                 example: todo
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: task_id_here
 *                     title:
 *                       type: string
 *                       example: Task Title
 *                     description:
 *                       type: string
 *                       example: Task Description
 *                     status:
 *                       type: string
 *                       example: todo
 *       500:
 *         description: Error creating task
 */
router.post('/tasks', authMiddleware, taskController.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks of the user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search tasks by title
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort tasks by creation date
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, in-progress, done]
 *         description: Filter tasks by status
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: task_id_here
 *                       title:
 *                         type: string
 *                         example: Task Title
 *                       description:
 *                         type: string
 *                         example: Task Description
 *                       status:
 *                         type: string
 *                         example: todo
 *       500:
 *         description: Error fetching tasks
 */
router.get('/tasks', authMiddleware, taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: task_id_here
 *                     title:
 *                       type: string
 *                       example: Task Title
 *                     description:
 *                       type: string
 *                       example: Task Description
 *                     status:
 *                       type: string
 *                       example: todo
 *       400:
 *         description: Task not found
 *       500:
 *         description: Error fetching task
 */
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task Title
 *               description:
 *                 type: string
 *                 example: Updated Task Description
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *                 example: in-progress
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: task_id_here
 *                     title:
 *                       type: string
 *                       example: Updated Task Title
 *                     description:
 *                       type: string
 *                       example: Updated Task Description
 *                     status:
 *                       type: string
 *                       example: in-progress
 *       400:
 *         description: Task not found
 *       500:
 *         description: Error updating task
 */
router.put('/tasks/:id', authMiddleware, taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Task not found
 *       500:
 *         description: Error deleting task
 */
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
