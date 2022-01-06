const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//this is used to connect to database in mongoose



const sample=(array)=>{
   return array[Math.floor(Math.random()*array.length)];
}
//this is a function which is used to access random element of array

const seedDb=async()=>{
// this is done to ensure database is completely cleae 
    await Campground.deleteMany({});
    for(let i=0;i<20;i++)
    {
    //we run loop 50 times
// const price100=Math.floor(Math.random()*20)+10;
// const priceca = Math.floor(Math.random() * 20) + 10;
        const random1000=Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        //get  a random index
        const camp=new Campground({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, eligendi distinctiohddfgdf ',
            price
        })

        // we insert data corresponding to the random element inside our camp model 
        await camp.save();

//we are saving it 



    }
}
seedDb().then(()=>{
    mongoose.connection.close();
}
///this is running our databasr

)