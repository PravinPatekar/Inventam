const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/routes")
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://pravin_patekar_21:0RAbS4H3ZcoKPe5f@cluster0.0oa41u7.mongodb.net/Inventam?retryWrites=true&w=majority",{
    useNewUrlParser: true
})

.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});