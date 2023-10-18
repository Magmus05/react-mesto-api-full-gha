const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const NOT_FOUND_ERROR = require("../errors/NotFoundError");
const BAD_REQUEST_ERROR = require("../errors/BadRequestError");
const CONFLICT_ERROR = require('../errors/ConflictError');
const SUCCESS = 200;
const CREATE = 201;
require('dotenv').config();

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      res.send(
        users.map((user) => {
          return user;
        })
      );
    })
    .catch(next);
}

function getUserByID(req, res, next) {
  User.findById(req.params.id)
    .orFail(() => next(new NOT_FOUND_ERROR("Такой ID не существует")))
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      next(err);
    });
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ ...req.body, password: hash })
      .then((user) => {
        res.status(CREATE).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        });
      })
      .catch((err) => {
        // console.log(err.name);
        // console.log(err.message);
        if (err.code === 11000)
          next(
            new CONFLICT_ERROR("Пользователь с данным email уже существует")
          );
        if (err.name === "ValidationError") {
          next(new BAD_REQUEST_ERROR(`${err.message}`));
        } else {
          next(err);
        }
      });
  }).catch(next)
}

function updateUserProfile(req, res, next) {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST_ERROR(`${err.message}`));
      } else {
        next(err);
      }
    });
}

function updateUserAvatar(req, res, next) {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST_ERROR(`${err.message}`));
      } else {
        next(err);
      }
    });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      console.log(user);
      // аутентификация успешна! пользователь в переменной user
      const token = JWT.sign({ _id: user._id.valueOf() }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // res.clearCookie("jwt")

      res.cookie("jwt", token);
      console.log('process.env.JWT_SECRET');
       console.log('token');
      console.log(token);
      return res
        .status(SUCCESS)
        .send({message: "Авторизация прошла успешно" });
    })
    .catch(next);
}

function currentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(new Error("NotValidId"))
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidId") {
        next(new NOT_FOUND_ERROR("Такой ID не существует"));
      } else {
        next(err);
      }
    })
}

function loginOutUser(req, res) {
res.clearCookie("jwt").status(SUCCESS).send({message: "Вы вышли из аккаунта" });
}


module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  currentUser,
  loginOutUser
};
