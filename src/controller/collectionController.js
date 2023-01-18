const mongoose= require("mongoose")
const collectionModel = require("../model/collectionModel");


const isValid = (value) => {
    if (typeof value === "undefined" || value === null || typeof value === "boolean" || typeof value === "number") return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
  
    return true;
  };


const createCategory = async function (req, res) {
    try {
       let data = req.body;
       const {category , subcategory} = data

   
       if (!isValid(category)) {
        return res.status(400).send({ status: false, message: "category is required" })

    }

    if (!isValid(subcategory)) {
        return res.status(400).send({ status: false, message: "subcategory is required" })
    }

        let createdCategory = await collectionModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: createdCategory })
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}



const updateCategory = async function (req, res) {
    try {
       let data = req.body;
       const {category , subcategory, Id} = data

       if(!Id){
        res.status(400).send({ status: false, message: "Id is required" })
       }
    
       if (!mongoose.Types.ObjectId.isValid(Id)) {
        return res.status(400).send({ status: false, message: "this Id is not a valid Id" })
    }
    
    let toUpdateDetailFind= await collectionModel.findOne({"_id":Id})
    if(!toUpdateDetailFind){
        res.status(404).send({ status: false, message: "Data not found" })
        
    }
    
   if(category){
       if( !isValid(category)) {
        return res.status(400).send({ status: false, message: "category is required" })

    }
   }

   if(subcategory){
    if (!isValid(subcategory)) {
        return res.status(400).send({ status: false, message: "subcategory is required" })
    }
data.subcategory=toUpdateDetailFind.subcategory.push(subcategory)

   }

  

        let updatedCategory = await collectionModel.findOneAndUpdate({"_id":Id},data,{new: true})
        res.status(201).send({ status: true, message: "Success", data: updatedCategory })
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}



const deleteCategory = async function (req, res) {
    try {

        let {Id} = req.body;
        if(!Id){
            res.status(400).send({ status: false, message: "Id is required" })
           }
        
           if (!mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).send({ status: false, message: "this Id is not a valid Id" })
        }
        
        let toDeleteDetailFind= await collectionModel.findOne({"_id":Id})
        if(!toDeleteDetailFind){
            res.status(404).send({ status: false, message: "Data not found" })
            
        }

         await collectionModel.deleteOne({"_id": Id})
         res.status(201).send({ status: true, message: "category deleted successfully" })
            

  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };


  
const getCategory = async function (req, res) {
    try {
        const {category,page,limit}= req.query

        const categoryData = await collectionModel.find({"category":category}).limit(limit * 1).skip((page - 1) * limit).exec();
  
        // get total documents in the Posts collection 
    const count = await collectionModel.countDocuments();


        return res.status(200).send({ status: true, message: "successful", data: categoryData,totalPages: Math.ceil(count / limit),
        currentPage: page });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports= {createCategory,updateCategory,deleteCategory,getCategory}
