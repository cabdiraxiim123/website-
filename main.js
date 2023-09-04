const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");
const App = express();
// const session=require("express-session")
App.set("view engine", "ejs");
App.use(express.static("public"));

App.use(bodyParser.urlencoded({ extended: false }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sugaal",
});
App.use(session({
  secret:'mysecret',
  resave:false,
  saveUninitialized:false
}))
con.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

// App.get('/', (req, res) => {
//   res.render('index');
// });

App.get('/',(req,res)=>{
  const hel="select * from sevice";
  con.query(hel,(err,data)=>{
     if(err) throw err;
     console.log(data)
     res.render('index',{data:data})
  })
           })
// App.get("/database", (req, res) => {
//   const db = "Create database Horngraphics";
//   con.query(db, (err, result) => {
//     if (err) throw err;
//     console.log("databse Created");
//   });
//   res.send("database Created");
// });
// App.get("/table", (req, res) => {
//   const tbl =
//      "create table Contact (firstname varchar(20),Lastname varchar(20), Email varchar(20), Message varchar (25)) ";

//   con.query(tbl, (err, result) => {
//     if (err) throw err;
//     console.log("table created");
//   });
//   res.send("table create");
// });

// App.post('/Contact', (req, res) => {
//   const { Fname, Lname,email, Message } = req.body;
//   const sql = "insert into Contact(firstname,Lastname,Email,Message) values(?,?,?,?";
//   con.query(sql, [Fname, Lname,email,Message ], (err, result) => {
//     if (err) throw err;
//     console.log("data inserted");
//     res.redirect('/Contact');
//   });
 
// });
// App.get('/index', (req, res) => {
//     res.render('index');
//   });
  App.get('/blog', (req, res) => {
    res.render('blog');
  });
  App.get('/contact', (req, res) => {
    res.render('contact');
  });
//   App.get('/Contac', (req, res) => {
//     res.render('Contac');
//   });
  App.get('/login', (req, res) => {
    res.render('login');
  });
  App.get('/registeration', (req, res) => {
    res.render('registeration');
  });


App.post('/contact',(req,res)=>{
    const {Firstname, Lastname, Email,Message}=req.body;
    const sql="insert into contact (name,email,service,nessage) values(?,?,?,?)";
    con.query(sql,[Firstname,Lastname,Email,Message],(err,result)=>{
    if(err) {
       console.log(err);
       return;
    }
    res.redirect('/contac')
    })
 })

// App.post('/login',(req,res)=>{ 
//   const name= req.body.name; 
//   const password= req.body.password; 
//   const hel="select * from login where name =? and password =?"; 
//   con.query(hel,[name , password],(err,result)=>{ 
//       if(err){ 
//    console.log("wrong password or username"); 
//    return 
//       } 
//       if(result.length >0                                                                                                          ){ 
//           res.redirect('/information') 
//       } 
//       else{ 
//  console.log("waa qalad passwordkaagau") 
// res.render('login') 
// } 
//  }) 
// })
App.post('/login',(req,res)=>{
  const name=req.body.name; 
  const password=req.body.password;

  const hel="select* from login where username= ? and  password=?";

  con.query(hel,[name,password],(err,result)=>{
      if(err){
          console.log("wrong username or password",err);
          res.redirect('login')
          return;
      }
      if(result.length >0){
          req.session.name=name;
          res.redirect('/registeration')
      }else{
          console.log("waa khalad passwordka iyo userku")
          res.render('login')
        }
    })
})

App.get('/Contact', (req, res) => {
  res.render('Contact');
});

// App.get('/',(req,res)=>{
//   const hel="select *from service"
//   con.query(hel,(err,data)=>{
//       if(err)throw err;
//       console.log(res)
//       res.render('index',{data:data})
//   })
// })
// App.get('/information',(req,res)=>{
//   if(req.session.name){
//    const name=req.session.name; 
//    const data='select *from contact';
//    con.query(data,(err,result)=>{
//       if(err){
//          console.log("err accured",err);
//          res.redirect('/login');
//          return;
//       }
//       res.render('information',{name,data:result});
//    });
//   }else{
//    res.redirect('/login')
//   }  

//          });
App.get('/registeration',(req,res)=>{
  if(req.session.name){
   const name=req.session.name; 
   const data='select *from contact';
   con.query(data,(err,result)=>{
      if(err){
         console.log("err accured",err);
         res.redirect('/login');
         return;
      }
      res.render('registeration',{name,data:result});
   });
  }else{
   res.redirect('/login')
  }  

         });
// App.get('/select',(req,res)=>{
//   const sel ="select * from contact";
//   con.query(sel,(err,result)=>{
//     if(err) throw err;
//     else {
//       res.render('information',{result:result})
//     }
//   })
// })


// App.get('/index', (req, res) => {
//   res.render('index');
// });
App.get('/lagout',(req,res)=>{
  req.session.destroy((err)=>{
      if(err){
          console.log("err happened",err)
      }
      res.redirect('/login')
    })
})




// App.get("/select", (req, res) => {
//   const hel = "select * from ";
//   con.query(hel, (err, result) => {
//     if (err){
//       res.render('list',{data:''})
//     }else{
//       res.render('list',{data:result} )

//     }
//   });
  
// });
// App.get('/in
// ',(req,res)=>{
//     const hel="select * from contacts";
//     con.query(hel,(err,data)=>{
//        if(err) throw err;
//        console.log(data)
//        res.render('information',{data:data})
//     })
//            })


App.listen(7000);
console.log("use 3000");
