// app.get("/bhavya",(req,res)=>{
//     pool.query(`select * from supplier`,(err,op)=>{
//         if(err)
//         console.log(err.message);
//         else{
//             let ans=op.rows;
//             res.render('im',{ans});
//         }
//     });
// });
// app.get('/tirth',(req,res)=>{
//     res.sendFile('pages/signup.html',{root:__dirname});
// });

// app.get('/minank',(req,res)=>{
//     pool.query(`select * from supplier`,(err,op)=>{
//         if(err)
//         console.log(err.message);
//         else{
//             let canteen=op.rows;
//             res.render('login_signup',{canteen});
//         }
//     });
// });

// app.get("/",(req,res)=>{
//     res.render('select',{title:"My name is Minank"});
// });

// app.post("/select",async(req,res)=>{
//     // try{
//     //     const op=await pool.query("select * from supplier where name = 'Krunal'");
//     //     const ans=op.rows;
//     //     res.render('output',{name:req.body.search,ans});
//     // }
//     // catch{
//     //     res.send("error");
//     // }
//     pool.query(`select * from supplier where name = '${req.body.search}'`,(err,op)=>{
//         if(err)
//         console.log(err.message);
//         else{
//             let ans=op.rows;
//             res.render('output',{name:req.body.search,ans,no_name:req.body.search});
//         }
//     });
// });

// app.post('/',async(req,res)=>{
//     // pool.query("insert values($1,$2,$3) into supplier",[req.body.name,req.body.email,req.body.password]);
//     pool.query(`insert into supplier values (${req.body.email},${req.body.name},${req.body.password})`,(err,ans)=>{
//         if(err)
//         console.log(err.message);
//     });
// });

// pool.query("select * from supplier where name = 'Krunal'",(err,ans)=>{
//     if(err)
//     console.log(err.message);
//     else{
//         console.log(ans.rows);
//     }
// });








// app.get('/',(req,res)=>{
//     res.render('index');
// });
// app.get('/index.pug',(req,res)=>{
//     res.render('index');
// });
// app.get('/login_signup.pug',(req,res)=>{
//     res.render('login_signup');
// });



// app.post('/signup',async(req,res)=>{
//     // console.log(req.body);
//     pool.query(`insert into ${req.body.role} values($1,$2,$3)`,[req.body.email,req.body.name,req.body.pass1]);
//     const ans = await pool.query("select * from Supplier");
//     console.log(ans.rows);
//     // let ValueOfSignInForm=`Name is ${req.body.name} and his/her password is ${req.body.pass}`;
//     // fs.writeFileSync('Output.txt',ValueOfSignInForm);
//     // res.render('index.pug');
// });

// // pool.query("SELECT * FROM Supplier",(err,msg)=>{
// //     if (err) {
// //         console.error(err);
// //         return;
// //     }
// //     console.log(msg.rows);
// //     pool.end();
// // });
// // pool.query("SELECT * FROM Supplier where name= $1",['Krunal'],(err,msg)=>{
// //     if (err) {
// //         console.error(err);
// //         return;
// //     }    
// //     console.log(msg.rows);
// // });

// // pool.query('SELECT * FROM Supplier',(err,ans)=>{
// //     console.log(ans.rows);
// // });