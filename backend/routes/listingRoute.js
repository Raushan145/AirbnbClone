import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'
import { addListing, DeleteListing, findListing, getListing, getListingById, search, updateListing } from '../controllers/listingController.js'
import isValidate from '../middlewares/isValidate.js'
import { listingSchema } from '../Schema.js'

const listingRouter = express.Router()

listingRouter.post("/add",isAuth, isValidate(listingSchema), upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),addListing)

listingRouter.get("/get", getListing)
// listingRouter.get("/listing/:id",isAuth, findListing)
listingRouter.get("/listing/:id",isAuth, getListingById);
listingRouter.get("/search", search);
listingRouter.patch("/update/:id",isAuth, upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),updateListing)
listingRouter.delete("/delete/:id",isAuth, DeleteListing)



export default listingRouter