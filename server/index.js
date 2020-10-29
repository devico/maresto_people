const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

const app = express();

const RouterOSClient = require('routeros-client').RouterOSClient;
 
const api = new RouterOSClient({
  host: "192.168.58.253",
  user: "cld-admin",
  password: "VUJcLaLR"
});

const db = require("./models");
db.sequelize.sync();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://people.maresto.ua');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev")); // configire morgan

// app.use(cors());
// app.use((req, res, next)=>{
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// define first route
app.get("/", (req, res) => {
  
  console.log("Hello MEVN Soldier");
});

app.get("/ppp_secret", (req, res) => {
  api.connect().then((client) => {
    
    client.menu("/ppp secret").get().then((result) => {
        res.send(JSON.stringify(result));        
    }).catch((err) => {
        console.log(err);
    });  
  }).catch((err) => {
    // Connection error
    console.log(err);
  });
  
});

// app.get("/ppp_active", (req, res) => {
//   api.connect().then((client) => {
//     client.menu("/ppp active").get().then((result) => {
//       res.send(JSON.stringify(result));
//       api.close();
//     }).catch((err) => {
//         console.log(err); 
//     });
  
//   }).catch((err) => {
//     // Connection error
//     console.log(err); 
//   });
  
// });

const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);

require("./routes/vpn_users.routes.js")(app);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
