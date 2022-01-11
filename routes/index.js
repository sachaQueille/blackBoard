var express = require('express');
var router = express.Router();
let { articleSchema, ArticleModel } = require('../models/articles');
let { orderSchema, OrderModel } = require('../models/orders');
let UserModel = require('../models/users');

/* GET home page. */
router.get('/', async(req, res, next) => {
  let adminUser = await UserModel.findOne({status: 'admin'});
  let unreadMsg = adminUser.messages.filter(msg => msg.read === false);
  let articlesOutStock = await ArticleModel.find({stock: 0});
  console.log(articlesOutStock)
  res.render('index', {unreadMsg: unreadMsg.length, articlesOutStock: articlesOutStock.length});
});

/* GET tasks page. */
router.get('/tasks-page', async (req, res, next) => {
  let adminUser = await UserModel.findOne({status: 'admin'});
  res.render('tasks',{adminTasks: adminUser.tasks});
});

/* GET Messages page. */
router.get('/messages-page', async (req, res, next) => {
  let adminUser = await UserModel.findOne({status: 'admin'});
  res.render('messages', {adminMessages: adminUser.messages});
});

/* GET Users page. */
router.get('/users-page', async (req, res, next) => {
  let allUsers = await UserModel.find({status: 'customer'});
  res.render('users', {allUsers});
});

/* GET Catalog page. */
router.get('/catalog-page', async (req, res, next) => {
  let productList = await ArticleModel.find();
  res.render('catalog', {productList});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async (req, res, next) =>{
 let ordersList = await OrderModel.find();
 console.log(ordersList)
  res.render('orders-list', {ordersList});
});

/* GET Order detail page. */
router.get('/order-page', async (req, res, next) => {
  let orderProducts = await OrderModel.findById(req.query.orderItem)
  .populate('articles')
  .exec();
  console.log(orderProducts)
  res.render('order', {orderProducts});
});

/* GET chart page. */
router.get('/charts', async(req, res, next)  => {
  let aggregate = UserModel.aggregate();
  aggregate.group({ _id: "$gender",userCount: { $sum: 1 } });

let allUsers = await aggregate.exec();
console.log(allUsers)
let nbFemale = 0;
let nbMale = 0;

for(let i=0; i< allUsers.length; i++) {
  if(allUsers[i]._id === 'female') {
    nbFemale = allUsers[i].userCount;
  } else if(allUsers[i]._id === 'male') {
    nbMale = allUsers[i].userCount;
  }
};
console.log(nbFemale);
console.log(nbMale);

let adminUser = await UserModel.findOne({status: 'admin'});
let unreadMsg = adminUser.messages.filter(msg => msg.read === false);
let readMsg = adminUser.messages.filter(msg => msg.read === true);

let payedCmd = await OrderModel.find({status_payment: 'validated'});
let refusedCmd = await OrderModel.find({status_payment: 'refused'});
let waitingCmd = await OrderModel.find({status_payment: 'waiting'});

  res.render('charts', {nbMale, nbFemale, unreadMsg: unreadMsg.length, readMsg: readMsg.length, payedCmd: payedCmd.length, refusedCmd: refusedCmd.length, waitingCmd: waitingCmd.length});
});



module.exports = router;
