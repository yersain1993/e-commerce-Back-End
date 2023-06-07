const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');


const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT,getAll)
    .post(create);

userRouter.route('/login')
    .post(login);

userRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = userRouter;