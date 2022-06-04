const bcrypt = require('bcryptjs');
const { response } = require('express');
const { appError } = require('../helpers/appError');
const { catchAsync } = require('../helpers/catchAsync');
const Order = require('../Models/orderModel');
const User = require('../Models/users');
const jwt = require('jsonwebtoken');

const existEmail = catchAsync(async (req, res = Response, next) => {
  const { name, email, password, role = 'normal' } = req.body;

  const existE = await User.findOne({
    where: {
      email,
      status: true,
    },
  });
  if (existE) {
    return next(new appError('There is already a user whith that email', 400));
  }

  req.user = { name, email, password, role };

  next();
});

const inValidRole = catchAsync(async (req, res = response, next) => {
  const { role = 'normal' } = req.body;

  if (role !== 'admin' && role !== 'normal') {
    return next(new appError('The role is not allowed', 400));
  }
  next();
});

const existUser = catchAsync(async (req, res = response, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });

  if (!user) {
    return next(new appError('The user is not registerd, 400'));
  }
  req.user = user;
  next();
});

const validPassword = catchAsync(async (req, res = response, next) => {
  const { user } = req;
  const { password } = req.body;
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new appError('Invalid credential', 401));
  }
  next();
});

const protectToken = catchAsync(async (req, res = response, next) => {
  let token;

  //extract token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new appError('Session invalid', 403));
  }

  //validate token
  const decoded = await jwt.verify(token, process.env.SECRET_JWT_SEED);

  const user = await User.findOne({ where: { id: decoded.id, status: true } });

  if (!user) {
    return next(
      new appError('The owner of this token is not longer available', 403)
    );
  }

  req.sessionUser = user;

  next();
});

const existUserPerId = catchAsync(async (req, res = response, next) => {
  const { id } = req.params;
  const user = await user.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!user) {
    return next(new appError('The user is not registered', 400));
  }
  req.user = user;
});

const protectAdmin = catchAsync(async (req, res = response, next) => {
  if (req.sessionUser.role !== 'admin') {
    return next(new appError('Access no granted', 403));
  }

  next();
});

const protectAccountOwner = catchAsync(async (req, res = response, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new appError('You do not own this account', 403));
  }

  next();
});

const existOrderForUser = catchAsync(async (req, res = response, next) => {
  const { id } = req.params;

  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id,
    },
  });

  if (!order) {
    return next(new appError('Order not found', 404));
  }

  req.order = order;
  next();
});

module.exports = {
  existEmail,
  inValidRole,
  existUser,
  validPassword,
  protectToken,
  protectAdmin,
  protectAccountOwner,
  existOrderForUser,
  existUserPerId,
};
