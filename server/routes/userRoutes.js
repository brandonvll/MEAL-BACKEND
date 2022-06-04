const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {
  signup,
  login,
  updateUser,
  getOrders,
  getOrderPerId,
  deleteUser,
} = require('../Controllers/userControllers');
const {
  existEmail,
  inValidRole,
  existUser,
  validPassword,
  protectToken,
  existUserPerId,
  protectAccountOwner,
  existOrderForUser,
} = require('../middlewares/userMiddlewares');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email does not have a correct format').isEmail(),
    check('password', 'the password must have at  last 8 characters').isLength({
      min: 8,
    }),
    validateFields,
    existEmail,
    inValidRole,
  ],
  signup
);

router.post(
  '/login',
  [
    check('email', 'the email does not have a correct format').isEmail(),
    check('password', 'The password must have at least 8 characters').isLength({
      min: 8,
    }),
    validateFields,
    existUser,
    validPassword,
  ],
  login
);

router.use(protectToken);

router.patch(
  '/:id',
  [
    check('name', 'the name is mandatory').not().isEmpty(),
    check('email', 'the email does not have a correct format').isEmail(),
    validateFields,
    existUserPerId,
    protectAccountOwner,
  ],
  updateUser
);

router.delete('/:id', existUserPerId, protectAccountOwner, deleteUser);

router.get('/orders', getOrders);

router.get('/orders/:id', existOrderForUser, getOrderPerId);

module.exports = { usersRouter: router };
