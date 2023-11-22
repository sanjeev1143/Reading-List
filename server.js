const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const schema = require('./schema/schema');
const { graphqlHTTP } = require('express-graphql') 

const db = "mongodb+srv://Sanjeev:Sanju266@cluster0.erlocnt.mongodb.net/FullStack?retryWrites=true&w=majority"

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("success");
}).catch((err) => {
    console.log(err)
});




app.use('/graphql',graphqlHTTP({
schema,
graphiql:true

}));





app.listen(8000,()=>{
console.log("Listening to the port number 8000");

})