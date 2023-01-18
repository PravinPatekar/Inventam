const express = require("express")
const router = express.Router()
const collectionController = require("../controller/collectionController")


router.post("/createCategory", collectionController.createCategory)

router.put("/updateCategory", collectionController.updateCategory)

router.delete("/deleteCategory", collectionController.deleteCategory)

router.get("/ListCategories",collectionController.getCategory)


router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Endpoint is not correct"
    })
})


module.exports= router;