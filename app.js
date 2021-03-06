const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
   
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
});
app.get('/campgrounds',async (req,res)=>{
    const allData=await Campground.find({});
   
    res.render('campgrounds/view',{allData});
})
app.get('/campgrounds/new',(req,res)=>{

    res.render('campgrounds/new');
})
app.get('/campgrounds/:id',async (req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    res.render('campgrounds/show',{campground});
})

app.get('/campgrounds/:id/delete',async (req,res)=>{
    const{id}=req.params;
    res.render('campgrounds/delete',{id});
    
})
app.delete('/campgrounds/:id',async (req,res)=>{
    const{id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})
app.get('/campgrounds/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    res.render('campgrounds/edit',{campground});
})

// app.post('/products/:id',async(req,res)=>{
//     const {id}=req.params;
//     const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
//     res.redirect(`/products/${id}`);
// })
// app.put('/campgrounds/:id', async (req, res) => {
//     const { id } = req.params;
    
//     var title=req.body.title;
//     var location=req.body.location;
// const newCampground= {title:title,location:location};
//     const campground = await Campground.findByIdAndUpdate(id,newCampground);
//     res.redirect(`/campgrounds/${id}`);

   
   // const campground = await Campground.findByIdAndUpdate(id,{title:req.body.title,location:req.body.location});
 
    //res.redirect(`/campgrounds/${campground._id}`)
// });
// app.put('/campgrounds/:id',async(req,res)=>{
//     const{id}=req.params;
//     const campground=await Campground.findByIdAndUpdate(id,req.body)

//      res.redirect('/campgrounds')
// })
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
});

app.post('/campgrounds/new',async (req,res)=>{
    const newCampground= await Campground(req.body.campground);
    await newCampground.save();
    res.redirect('/campgrounds')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})