const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const fs = require('fs');
const ejs = require("ejs");
const jsreportClient = require("@jsreport/nodejs-client")("https://playground.jsreport.net/w/Nadeemmkhann/6yrBobGu")
// const ObjectId = require()


const path = require('path');
var publicKey = "pk_test_51Lx5SJSDNZ9sJkGKb5qf05Csakv4wuOjY3keYrDrzkViGeVKWb6UeDOshfsKmX2VG1UP1BDzCa0d7LvgiVjZVTdx00tdnIx2xy"
var secretKey = "sk_test_51Lx5SJSDNZ9sJkGKh1QPRFsUT4nABCtcBy9blRh6hOVnftWRNS1ABVeN1BtPg9LrHXLvRqgsTjBXX64XUNvsQjbE00RpaRf617"
const stripe = require('stripe')(secretKey);


const port = process.env.port || 5000;
var w;
var f;
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

//payment
app.get('/gateway', function (req, res) {
  res.render('paymentGateway', {
    key: publicKey
  })
});


app.post('/payment', async function (req, res) {

  console.log(JSON.stringify(req.body, req.params))
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'gbp',
    payment_method: 'pm_card_visa',
  });
  console.log(paymentIntent)
  res.redirect('../login/user')

  // Moreover you can take more details from user
  // like Address, Name, etc from form
  // stripe.customers.create({
  //   email: paymentIntent.receipt_email,
  //   source: paymentIntent.id,
  //     name: 'Gourav Hammad',
  //     address: {
  //         line1: 'TC 9/4 Old MES colony',
  //         postal_code: '452331',
  //         city: 'Indore',
  //         state: 'Madhya Pradesh',
  //         country: 'India',
  //     }
  // })
  // .then((customer) => {

  //     return stripe.charges.create({
  //         amount: 470600,     // Charging Rs 25
  //         description: 'Web Development Product',
  //         currency: 'INR',
  //         customer: customer.id
  //     });
  // })
  // .then((charge) => {
  //     res.send("Success")  // If no error occurs
  // })
  // .catch((err) => {
  //     res.send(err)       // If some error occurs
  // });
})

const url =
  "mongodb+srv://admin:admin@cluster0.sl2xizd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect(() => {
  console.log("connected to Db");
});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

// app.get('/',(req,res) =>{
//   res.send()
// })
app.get("/signup", (req, res) => {
  // res.sendFile(__dirname + "/signup.html");
  res.render('signup')
});

app.get("/login", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  // console.log(req.body)
  res.render('index');
});

app.get("/about", (req, res) => {
  // res.sendFile(__dirname + "/aboutus.html");
  res.render('aboutus');
});

app.get("/feature", (req, res) => {
  // res.sendFile(__dirname + "/feature.html");
  res.render('feature');
});

let m = "";
app.get("/login/user", async (req, res) => {
  let a = "";
  let b = "";
  let c = "";
  let d = "";

  await client
    .db("ourGateDB")
    .collection("user")
    .findOne(req.body)
    .then((data) => {
      a = data.firstName;
      b = data.address;
      c = data.wing
      d = data.flat
      w = data.wing
      f = data.flat
      m = data.emailAddress
      // console.log(a, b);
    });
  // console.log(a, b);

  res.render("user", {
    name: a,
    add: b,
    wing: c,
    flat: d,
    mail: m
  });
});

app.get("/login/admin/views", async (req, res) => {
  await client.db("ourGateDB").collection("entry").find({}).toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      res.json(result);
    }
  });
});

app.get("/login/admin/billuser", async (req, res) => {
  await client.db("ourGateDB").collection("user").find({}).toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      res.json(result);
    }
  });
});

// app.get("/allUser",async(req,res)=>{
// await client.db("ourGateDB").collection("user").find({}).toArray(function (err, result) {
//     if (err) {
//       res.status(400).send("Error fetching listings!");
//    } else {
//       res.json(result);
//     }
//   });
// });

//generate Report

app.get("/login/user/views", async (req, res) => {
  await client.db("ourGateDB").collection("entry").find({ wing: w, flat: f }).toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching listings!");
    } else {
      console.log(w, f);
      res.json(result);
    }
  });
});

app.get("/login/user/updateDeliveryStatus", async (req, res) => {
  var myquery = { _id: ObjectId(req.query.id) };
  console.log(req.query, req.body.status)
  var newvalues = { $set: { status: req.query.status } };
  await client.db("ourGateDB").collection("entry")
    .updateOne(myquery, newvalues, function (err, result) {
      if (err) {
        res.status(400).send("Error updating Delivery Status");
      }
      else {
        console.log("1 document updated", result);
        res.json(result);
      }
    });
});


app.get("/login/admin", async (req, res) => {

  let a = "Admin ";
  let b = "bb";
  let list = [];

  await client
    .db("ourGateDB")
    .collection("user")
    .findOne(req.body)
    .then((data) => {
      // a = data.firstName;
      b = data.address;
      // console.log(a, b);
    });

  list = await client.db("ourGateDB").collection("entry").find();

  // console.log(list);

  res.render("admin", {
    name: a,
    add: b,
    l: list,

  });
});

app.post("/login/admin", (req, res) => {
  console.log(req.body);
  client
    .db("ourGateDB")
    .collection("entry")
    .insertOne(req.body)
    .then((id) => {
      console.log("user added ", id);
      res.redirect("../login/admin");
    });
});

app.post("/login", (req, res) => {
  client
    .db("ourGateDB")
    .collection("user")
    .findOne(req.body)
    .then((data) => {
      // console.log(
      //   req.body.emailAddress,
      //   data.emailAddress,
      //   req.body.password,
      //   data.password
      // );
      if (
        req.body.emailAddress == "ourgatesupervisor@gmail.com" &&
        req.body.password == "ourgateadmin"
      ) {
        console.log("admin success");
        res.redirect("../login/admin");
      } else if (
        req.body.emailAddress == data.emailAddress &&
        req.body.password == data.password
      ) {
        console.log("success");
        res.redirect("../login/user");
      } else {
        res.redirect("../login");
      }
    });
  console.log(req.body);
});

app.post("/signup", (req, res) => {
  console.log("body: ", req.body);
  client
    .db("ourGateDB")
    .collection("user")
    .insertOne(req.body)
    .then((id) => {
      console.log("user added ", id);
      res.redirect("../login");
      // res.sendStatus(200);
    });
});

app.post("/generateMaintainanceBill", async (req, res) => {
  console.log("Data recived is " + JSON.stringify(req.body));
  const response = await jsreportClient.render({
    template: { 'name': "MaintainanceBillTemplate" },
    data: req.body,
    options: { "reports": { "save": true } }
  })

  console.log(response.headers)
  const bodyBuffer = await response.body()
  //create directory if not exist
  fs.mkdir('./Bills/' + req.body.emailAddress, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  fs.writeFileSync('./Bills/' + req.body.emailAddress + '/' +
    req.body.day + '_' + req.body.month + '_' + req.body.year + '_Bill.docx', bodyBuffer);
});

// app.get('/download',(req,res)=>{
//   res.sendFile(__dirname + "/Bills/nadeem.khn3456@gmail.com/01_10_2022_Bill.docx");
//   console.log("after")
// })

app.get('/viewBill', (req, res) => {
  // const file = `${__dirname}/Bills/nadeem.khn3456@gmail.com/01_10_2022_Bill.docx`;
  // res.download(file);
  console.log('called')
  res.sendFile(__dirname + "/Bills/" + m + "/01_10_2022_Bill.docx");

  // res.redirect('/download')
  // // res.end()
});

app.listen(port, () => {
  console.log("server started.....");
});

