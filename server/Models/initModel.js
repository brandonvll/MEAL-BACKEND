const Meal = require('./mealModel');
const Order = require('./orderModel');
const Restaurant = require('./restaurantModel');
const Review = require('./rewiev');
const Users = require('./users');

const initModel = () => {
  //1 USER <--- ----> M ORDERS
  Users.hasMany(Order);
  Order.belongsTo(Users);

  //1 USER <--- ----> M REVIEWS
  Users.hasMany(Review);
  Review.belongsTo(Users);

  //1 RESTAURANT <--- ----> M REVIEWS
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  //1 RESTAURANT <--- ----> M MEAL
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  //1 MEALS <--- ----> 1 ORDER
  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
