const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({

    category : {
        type: String,
        required : true
    },

    subcategory:[{
        type: String,
        required : true
    }],
},

{timestamps: true})

module.exports =  mongoose.model("category", categorySchema)