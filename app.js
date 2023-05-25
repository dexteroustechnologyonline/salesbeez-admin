const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
// var session = require("express-session");

const errorMiddleware = require("./middleware/error");

// const PORT = process.env.PORT || 4000;

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });

}



app.use(express.json());
app.use(cookieParser());
app.use(compression({
  level:9,
  threshold:100 * 10,
  filter:(req,res)=>{
    if(req.headers["x-no-compression"]){
      return false
    }
    return compression.filter(req,res)
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


//Rotes Imports

const superCategory = require("./routes/superCategoryRoute");
app.use("/api/v1/supercategory",superCategory);

const category = require("./routes/categoryRoute");
app.use("/api/v1/category" ,category);

const subCategory = require("./routes/subCategoryRoute");
app.use("/api/v1/subcategory" ,subCategory); 


const brand = require("./routes/brandRoute");
app.use("/api/v1/brand" ,brand);

const grocery = require("./routes/groceryRoute");
app.use("/api/v1/grocery" ,grocery);

const groceryorder = require("./routes/grocerOrderRoute");
app.use("/api/v1/groceryorder" ,groceryorder);

const generalorder = require("./routes/generalOrderRoute");
app.use("/api/v1/generalorder" ,generalorder);

const electronic = require("./routes/electronicRoute");
app.use("/api/v1/electronic" ,electronic);

const cloths = require("./routes/clothsRoute");
app.use("/api/v1/cloths" ,cloths);

const pinAmount = require("./routes/pinAmountRoute");
app.use("/api/v1/pinamount" ,pinAmount);

const universalTag = require("./routes/universalTagRoute");
app.use("/api/v1/universaltag" ,universalTag);

const superCatTag = require("./routes/superCatTagRoute");
app.use("/api/v1/supercattag" ,superCatTag);

const categoryTag = require("./routes/categoryTagRoute");
app.use("/api/v1/categorytag" ,categoryTag);

const subCategoryTag = require("./routes/subCategoryTagRoute");
app.use("/api/v1/subcategorytag" ,subCategoryTag);

const user = require('./routes/userRoute');
app.use("/api/v1/user", user);

const agent = require('./routes/agentRoute');
app.use("/api/v1/agent", agent);
const admin = require('./routes/adminRoute');
app.use("/api/v1/admin", admin);

const client = require('./routes/clientRoute');
app.use("/api/v1/client", client);

const address = require('./routes/addressRoute');
app.use("/api/v1/address", address);

const sliderbanner = require('./routes/sliderBannerRoute');
app.use("/api/v1/sliderbanner", sliderbanner);

const banner = require('./routes/bannerRoute');
app.use("/api/v1/banner", banner);

const bigbanner = require('./routes/bigBannerRoute');
app.use("/api/v1/bigbanner", bigbanner);

const smallbanner = require('./routes/smallBannerRoute');
app.use("/api/v1/smallbanner", smallbanner);

const bulkgroceryupload = require('./routes/bulkgroceryuploadRoute');
app.use("/api/v1/bulkgroceryupload", bulkgroceryupload);

const commission = require('./routes/commissiondRoute');
app.use("/api/v1/commission", commission);

const bankwithdraw = require('./routes/bankwithdrawRoute');
app.use("/api/v1/bankwithdraw", bankwithdraw);

const achivers = require('./routes/achieversRoute');
app.use("/api/v1/achivers", achivers);

const ourteams = require('./routes/ourTeamRoute');
app.use("/api/v1/ourteams", ourteams);

const wishlist = require('./routes/wishlistRoute');
app.use("/api/v1/wishlist", wishlist);

const categorybanner = require('./routes/categoryBannerRoute');
app.use("/api/v1/categorybanner", categorybanner);

const productbanner = require('./routes/productBannerRoute');
app.use("/api/v1/productbanner", productbanner);

const subcatbanner = require('./routes/subCatBannerRoute');
app.use("/api/v1/subcatbanner", subcatbanner);


app.use(errorMiddleware);

module.exports = app;
