
const express = require('express');
const morgan = require('morgan');
const mongoose  = require('mongoose');
const Blog = require('./models/blog'); // importing Blog 
const { render } = require('ejs');



//Express app
const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://dalsalahy:Alrahman81$@cluster0.6hcbgea.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})//the second argument is to resolve the deprication pronlem and it is not imortant
//.then((result)=> console.log('connected to DB'))// fires when the connection is complete after it is v=connected to the db

.then( result => app.listen(3000))//starting the server after the connection is established and listening for requists.

.catch( err => console.log(err));

//register view engine
app.set ('view engine', 'ejs'); //set lets us set some settings it looks into views folder for ejs files





//Middleware and static files

app.use(express.static('public')); // here we are telling that anything in the public folder is public and the browser can accesss
app.use(express.urlencoded({ extended: true }));// this guy takes what comes in the url and encoded in a way that can be sent to the DB // extended :true is an extra option

app.use(morgan('dev'));  // this is what we get on consol from this function (GET / 304 11.549 ms - -)
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

/*app.use((req, res, next) => {
   console.log('new request made:');
   console.log('host: ', req.hostname);
   console.log('path: ', req.path);
   console.log('method: ', req.method);
   next(); // we have to include that so the browser keep moving and execute the next line.
 });

 app.use((req, res, next) => { // added this to test the next from the previous function
   console.log('in the next middleware');
   next();
 });
*/
 


//mongooose and mongo sandbox routes
/*app.get('/add-blog' , (req,res)=>{
       const blog = new Blog({
         title: 'new blog 2',
         snippet: 'about my new blog',
         body: 'more about my new blog'
       });
       
       blog.save() //saving this document to cluster
       .then((result)=>{
         res.send(result)
       })
       .catch((err)=>{
         console.log(err);
       });
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});



app.get('/single-blog', (req, res) => {
  Blog.findById('65132360b5b6eed58ab01886')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
*/


//ROUTES

// here app responds to get command it has 2 arguments (what app listens to , function(req,res))  req like get or post , res is what the server responds with
app.get ('/' , (req, res) => {
   res.redirect('blogs');  
});                                       


app.get ('/about' , (req, res) => {  
   res.render('about' , { title : 'About'}); 
});

//all blogs routes

app.get('/blogs', (req,res) => {
  Blog.find().sort({createdAt: -1})
  .then(result => {
    res.render('index', { title: 'All Blogs', blogs : result});
  })
  .catch(err => {
    console.log(err);
  });
})

app.get ('/blogs/create' , (req, res) => {   
   res.render('create' , { title : 'Create a new blog'}); 
});

//post to DB new blog from creat blog page
app.post('/blogs', (req, res) => {
  //console.log(req.body);
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs'); // send the page back to the blogs page
    })
    .catch(err => {
      console.log(err);
    });
});


// retrieving one blog with certain id

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});


 // 404 page
 app.use((req, res) => { 
   // res.sendFile('./views/404.html', {root: __dirname});
   res.status(404).render('404' , { title : '404'}); 
});
