let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String,
});

let ArticleModel = mongoose.model('articles', articleSchema);

module.exports = {articleSchema, ArticleModel};