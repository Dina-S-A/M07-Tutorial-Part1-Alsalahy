const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema =  new Schema({
    title: {
        type : String,
        required: true
    },

    snippet: {
        type : String,
        required: true
    },

    body:{
        type : String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema); // here we are storing the model into const Blog with capital letter in the beginning // and we give it the name Blog which is a singluar of the collection name and this is the name it is going to use to communicate with our collection in the DB 
// we also pass the schema we created earlier as the second argument.

module.exports = Blog ; // we exported Blog so we can use it everywhere else

