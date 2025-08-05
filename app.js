//express material
const exp = require('express');
const app = exp();
const port = 38;

//cookie-parser
const cookieParser = require('cookie-parser');

//jwt
const jwt = require('jsonwebtoken');
const JWT_KEY = 'wsdfghju87trfghj';

//for use database
const pool = require('./database/db');

//for path
const path = require('path');

//for session
const session = require("express-session");

//for serving static files
app.use('/static', exp.static('static'));

app.use(cookieParser());

//pug related stuff
app.set('view engine', 'pug');//set the template engine as pug
app.set('views', path.join(__dirname, 'pages'));//set the views directory
app.use(exp.urlencoded());
// app.use(exp.json());//alternative of above

const indexRouter = exp.Router();
let check = false;
let chek = true;
let chk0 = false;

app.use(session({
    secret: JWT_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 10, httpOnly: true }
}));

app.use('/', indexRouter);


//signup
indexRouter
    .route('/admin_su')
    .post(admin_su)
indexRouter
    .route('/user_su')
    .post(user_su)
indexRouter
    .route('/staff_su')
    .post(staff_su)
indexRouter
    .route('/supplier_su')
    .post(supplier_su)
indexRouter
    .route('/canteen_su')
    .post(canteen_su)


//login
indexRouter
    .route('/login')
    .get(loginPage)
    .post(postLogin)



//user

//canteen 
indexRouter
    .route('/canteenchoice')
    .get(protectRoute, canteenChoice)
    .post(protectRoute, postCanteenChoice)

//home page
indexRouter
    .route('/')
    .get(protectRoute, protectRoute2, homePage)

//about us-learn more
indexRouter
    .route('/about_us')
    .get(protectRoute, aboutPage)
indexRouter
    .route('/learn_more')
    .get(protectRoute, learnPage)

//menu-category page
indexRouter
    .route('/menu')
    .get(protectRoute, protectRoute2, menuPage)
indexRouter
    .route('/category')
    .get(protectRoute, protectRoute2, categoryPage)

//history page
indexRouter
    .route('/history')
    .get(protectRoute, protectRoute2, historyPage)

//add to cart page
indexRouter
    .route('/addtocart')
    .get(protectRoute, protectRoute2, addtocart)

//review page and algo
indexRouter
    .route('/reviews')
    .get(protectRoute, protectRoute2, feedbackPage)
    .post(protectRoute, protectRoute2, reviews)

//order status page
indexRouter
    .route('/vieworder')
    .get(protectRoute, protectRoute2, viewOrder)

//add to cart-order algo
indexRouter
    .route('/add')
    .get(protectRoute, protectRoute2, addFood)
indexRouter
    .route('/rem')
    .get(protectRoute, protectRoute2, remFood)
indexRouter
    .route('/addsolo')
    .get(protectRoute, protectRoute2, addSolo)
indexRouter
    .route('/remsolo')
    .get(protectRoute, protectRoute2, remSolo)
indexRouter
    .route('/allorder')
    .get(protectRoute, protectRoute2, allFood)
indexRouter
    .route('/alldel')
    .get(protectRoute, protectRoute2, allDel)

//search algo menu,category
indexRouter
    .route('/search')
    .post(protectRoute, protectRoute2, menuSearch)
indexRouter
    .route('/search1')
    .post(protectRoute, protectRoute2, categorySearch)

//rating algo
indexRouter
    .route('/rating')
    .post(protectRoute, protectRoute2, rating)
indexRouter
    .route('/nointerested')
    .post(protectRoute, protectRoute2, nothing_gives_rating)

//cart-order algo
indexRouter
    .route('/order')
    .get(protectRoute, protectRoute2, order)
indexRouter
    .route('/cart')
    .get(protectRoute, protectRoute2, cart)

//handle category algo
indexRouter
    .route('/category_handle/:name')
    .get(protectRoute, protectRoute2, handleCategory)



//canteen
indexRouter   //showing order
    .route('/order_show')
    .get(protectRoute4, can)
indexRouter   //showing staff
    .route('/staff_approval')
    .get(protectRoute4, can1)
indexRouter   //showing menu
    .route('/foodhandling')
    .get(protectRoute4, can2)
indexRouter   //add menu
    .route('/add100')
    .get(protectRoute4, can3)
indexRouter   //remove menu
    .route('/rem100')
    .get(protectRoute4, can4)
indexRouter   //update order status
    .route('/accept2')
    .get(protectRoute4, can5)
indexRouter   //accept staff
    .route('/accept3/:name')
    .get(protectRoute4, can6)
indexRouter   //reject staff
    .route('/reject3/:name')
    .get(protectRoute4, can7)



//admin
indexRouter
    .route('/admin')
    .get(protectRoute3, op)
indexRouter
    .route('/approval')
    .get(protectRoute3, op1)
indexRouter
    .route('/canteen_req')
    .get(protectRoute3, op2)
indexRouter
    .route('/accept/:id')
    .get(protectRoute3, op3)
indexRouter
    .route('/reject/:id')
    .get(protectRoute3, op4)
indexRouter
    .route('/accept1/:id')
    .get(protectRoute3, op5)
indexRouter
    .route('/reject1/:id')
    .get(protectRoute3, op6)



//logout
indexRouter
    .route('/logout')
    .get(protectRoute, logoutPage)



//code...........



//signup page
async function admin_su(req, res) {
    try {
        const ans = await pool.query(`select a_id,password from admin where name='${req.body.username}'`);
        // console.log(ans.rows)
        if (ans.rows.length == 0) {
            await pool.query("insert into admin(name,email,password) values($1,$2,$3)", [req.body.username, req.body.email, req.body.password]);
            const ans1 = await pool.query(`select a_id from admin where name='${req.body.username}'`);
            const aid = ans1.rows[0].a_id;
            // console.log(aid);
            await pool.query("insert into admin_contact(aid,acontact) values($1,$2)", [aid, req.body.contact]);
            check = false;
            chk0 = true;
            // username = req.body.username;
            res.send(`<h1>SignUp successfully</h1>`);
            // res.redirect('/login');
        }
        else {
            check = true;
            chk0 = false;
            res.send(`<h1>Username already exists</h1>`);
            // res.redirect('/login');
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function user_su(req, res) {
    try {
        const ans = await pool.query(`select password from student where username='${req.body.username}'`);
        // console.log(ans.rows);
        const status = true;
        if (ans.rows.length == 0) {
            await pool.query(`insert into student(username,email,password,contact,firstname,status) values('${req.body.username}','${req.body.email}','${req.body.password}','${req.body.contact}','${req.body.name}',true)`);
            check = false;
            // username = req.body.username;
            res.redirect('/canteenchoice');
        }
        else {
            check = true;
            chk0 = false;
            res.redirect('/login');
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function supplier_su(req, res) {
    try {
        const ans = await pool.query(`select password from supplier where email= '${req.body.email}'`);
        // console.log(ans.rows)
        if (ans.rows.length == 0) {
            await pool.query("insert into supplier(name,email,password) values($1,$2,$3)", [req.body.username, req.body.email, req.body.password]);
            await pool.query("insert into supplier_contact(semail,scontact) values($1,$2)", [req.body.email, req.body.contact]);
            await pool.query("insert into supplier_address(semail,saddress) values($1,$2)", [req.body.email, req.body.address]);
            check = false;
            // username = req.body.username;
            res.redirect('/supplier');
        }
        else {
            check = true;
            res.redirect('/login');
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function staff_su(req, res) {
    try {
        const ans = await pool.query(`select password from staff where name='${req.body.name}'`);
        // console.log(ans.rows)
        if (ans.rows.length == 0) {
            let x = '';
            for (let i = 1; i < req.body.canteenno.length - 1; i++) {
                x += req.body.canteenno[i];
            }
            let ansss = Number(x);
            // console.log(ansss);
            await pool.query("insert into staff(name,canteennumber,contact,password) values($1,$2,$3,$4)", [req.body.name, ansss, req.body.contact, req.body.password]);
            check = false;
            chk0 = true;
            // await pool.query(`UPDATE canteen SET number_of_staff = (select count(name) from staff where canteennumber= ${ansss}) WHERE canteennumber= ${ansss}`);
            // username = req.body.name;
            res.redirect('/login');
        }
        else {
            check = true;
            chk0 = false;
            res.redirect('/login');
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function canteen_su(req, res) {
    try {
        const ans = await pool.query(`select password from canteen where canteenname='${req.body.name}'`);
        // console.log(ans.rows)
        if (ans.rows.length == 0) {
            await pool.query("insert into canteen(canteenname,canteentype,description,ownername,password,number_of_staff) values($1,$2,$3,$4,$5,0)", [req.body.name, req.body.type, req.body.description, req.body.ownername, req.body.password]);
            // const aree=await pool.query("select canteennumber from canteen where canteenname=$1",[req.body.name]);
            // console.log(aree.rows[0].canteennumber);
            // await pool.query(`alter table menu add canteen${aree.rows[0].canteennumber} bool default false`);
            check = false;
            chk0 = true;
            res.redirect('/login');
        }
        else {
            check = true;
            chk0 = false;
            res.redirect('/login');
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//login page
async function loginPage(req, res) {
    try {
        const op = await pool.query(`select * from canteen where status=true`);
        const canteen = op.rows;
        // console.log(canteen);
        res.render('login_signup', { canteen, check, chk0 });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function postLogin(req, res) {
    try {
        let role = req.body.role;
        let name = req.body.name;
        let password = req.body.pass;
        // console.log(role);
        // console.log(name);
        // console.log(password);

        if (role == "Admin") {
            const admin = await pool.query(`select password,name,status from admin where name='${name}'`);
            if (admin.rows.length != 0) {
                // console.log(admin.rows);
                // console.log(admin.rows[0].status);
                if (admin.rows[0].password == password && admin.rows[0].status) {
                    let u_id = admin.rows[0].name;
                    // let token=jwt.sign({payload:u_id},JWT_KEY);
                    // res.cookie("login",token,{maxAge:1000*60,secure:true,httpOnly:true});
                    req.session.adminName = u_id;
                    // req.session.canteenName= "xyz";
                    // console.log(req.session.userName);
                    res.redirect('/admin');
                    // res.render('index',{"check":"true"});
                }
                else {
                    if(admin.rows[0].password != password)
                    res.send(`<h1>Password was wrong! try again</h1>`);
                    else if(!admin.rows[0].status)
                    res.send(`<h1>Please ask admin to approve your profile</h1>`);
                    // res.redirect('/login');
                }
            }
            else {
                res.send(`<h1>Please signUp first</h1>`);
                // res.redirect('/login');
            }
        }
        else if (role == "Student") {
            const student = await pool.query(`select password,username from student where username=$1`, [name]);
            if (student.rows.length != 0) {
                const student1 = student.rows[0].password;
                // console.log(student1);
                if (student1 != password)
                    res.redirect('/canteenchoice');
                else {
                    req.session.userName = student.rows[0].username;
                    res.redirect('/canteenchoice');
                    // res.render('index',{"check":"true"});
                }
            }
            else {
                res.redirect('/login');
            }
        }
        else if (role == "Staff") {
            const staff = await pool.query(`select password,name,status from staff where name='${name}'`);
            if (staff.rows.length != 0) {
                const staff1 = staff.rows[0].password;
                // console.log(staff1);
                if (staff1 == password && staff.rows[0].status) {
                    // res.render('admin',{"check":"true"});
                    req.session.staffName = staff.rows[0].name;
                    res.redirect('/staff');
                }
                else {
                    res.redirect('/login');
                    // res.render('login_signup');
                }
            }
            else {
                res.redirect('/login');
            }
        }
        else if (role == "Supplier") {
            const supplier = await pool.query(`select password,name from supplier where name='${name}'`);
            if (supplier.rows.length != 0) {
                const supplier1 = supplier.rows[0].password;
                if (supplier1 != password)
                    res.redirect('/login');
                else {
                    // res.render('admin',{"check":"true"});
                    req.session.supplierName = supplier.rows[0].name;
                    res.redirect('/');
                }
            }
            else {
                res.redirect('/login');
            }
        }
        else {
            const canteen = await pool.query(`select password,canteennumber,canteenname,status from canteen where canteenname='${name}'`);
            if (canteen.rows.length != 0) {
                const canteen1 = canteen.rows[0].password;
                if (canteen1 == password && canteen.rows[0].status) {
                    // res.render('admin',{"check":"true"});
                    req.session.canteenName = canteen.rows[0].canteenname;
                    req.session.canteenNumber = canteen.rows[0].canteennumber;
                    res.redirect('/order_show');
                }
                else {
                    res.redirect('/login');
                }
            }
            else {
                res.redirect('/login');
            }
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}


//user

//user protectroute session
function protectRoute(req, res, next) {
    if (req.session.userName)
        next();
    else {
        // res.send("Session was expired, please login again");
        res.redirect('/login');
    }
}
function protectRoute2(req, res, next) {
    if (req.session.canteenNumber)
        next();
    else {
        // res.send("Session was expired, please login again");
        res.redirect('/canteenchoice');
    }
}

//canteen choice
async function canteenChoice(req, res) {
    try {
        const op = await pool.query(`select * from canteen where status=true`);
        const canteen = op.rows;
        res.render('canteenchoice', { canteen, name: req.session.userName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function postCanteenChoice(req, res) {
    try {
        let x = '';
        for (let i = 1; i < req.body.canteenno.length - 1; i++) {
            x += req.body.canteenno[i];
        }
        let ansss = Number(x);
        // console.log(ansss);
        req.session.canteenNumber = ansss;
        const op4 = await pool.query("select canteenname from canteen where canteennumber=$1", [req.session.canteenNumber]);
        req.session.canteenName = op4.rows[0].canteenname;
        res.redirect('/');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//home page
async function homePage(req, res) {
    try {
        // if(req.cookies.login){
        // let verified=jwt.verify(req.cookies.login,JWT_KEY);
        // console.log(verified);
        // if(verified){
        const op = await pool.query(`select distinct * from Menu where (FoodTitle,FoodType) in (select FoodTitle,FoodType from OrderHistory where (UserName,canteennumber)=($1,$2))`, [req.session.userName,req.session.canteenNumber]);
        const rec = op.rows;
        const op1 = await pool.query("select * from Category");
        const category = op1.rows;
        const op2 = await pool.query(`select * from Menu where (canteen${req.session.canteenNumber})=true`);
        const menu = op2.rows;
        const op3 = await pool.query("select count(*) as c from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const count = op3.rows[0].c;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        // res.cookie("isLoggedIn",true,{maxAge:1000*3600*24,secure:true,httpOnly:true});
        res.render('index', { rec, category, menu, "name": req.session.userName, count, "name1": req.session.canteenName });
        // console.log(req.cookies.isLoggedIn);
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//menu-category page
async function menuPage(req, res) {
    try {
        const op3 = await pool.query("select count(*) as c from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const count = op3.rows[0].c;
        const op2 = await pool.query(`select * from Menu where (canteen${req.session.canteenNumber})=true`);
        const menu = op2.rows;
        // const op4=await pool.query("select * from canteen");
        // const canteen=op4.rows;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('menu', { menu, "name": req.session.userName, count, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function categoryPage(req, res) {
    try {
        const op2 = await pool.query("select * from category");
        const category = op2.rows;
        const op3 = await pool.query("select count(*) as c from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const count = op3.rows[0].c;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('category', { category, "name": req.session.userName, count, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//about-learn more page
async function aboutPage(req, res) {
    try {
        let oppp=req.session.userName;
        req.session.userName = oppp;
        res.render('about_us', { "name1": req.session.canteenName });
    }
    catch (err) {
        console.log(err.message);
    }
}
async function learnPage(req, res) {
    try {
        let oppp=req.session.userName;
        req.session.userName = oppp;
        res.render('learn_more', { "name1": req.session.canteenName });
    }
    catch (err) {
        console.log(err.message);
    }
}

//order-history page
async function historyPage(req, res) {
    try {
        const ans = await pool.query("select * from orderhistory where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const orderhistory = ans.rows;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('order_history', { orderhistory, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//feedback page
async function feedbackPage(req, res) {
    try {
        const ans = await pool.query(`select * from Menu where (canteen${req.session.canteenNumber})=true`);
        const foodtitle = ans.rows;
        const ans2 = await pool.query("select * from canteen,reviews where reviews.canteennumber=canteen.canteennumber");
        const rev = ans2.rows;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('feedback', { foodtitle, rev, "name1": req.session.canteenName });
        //     console.log(req.session.userName);
        //     console.log(req.session.canteenName);
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
// ama food title change karvana...
async function reviews(req, res) {
    try {
        let y = '';
        let i;
        for (i = 1; i < req.body.title.length - 1; i++) {
            if (req.body.title[i] == '_')
                break;
            y += req.body.title[i];
        }
        let z = '';
        for (let j = i + 3; j < req.body.title.length - 1; j++) {
            z += req.body.title[j];
        }
        console.log(req.body.title,y,z);
        await pool.query("insert into reviews values($1,$2,$3,$4,$5)", [req.session.userName, y, z, req.session.canteenNumber, req.body.description]);
        res.redirect('/reviews');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//add to cart page and its algo
async function addtocart(req, res) {
    const op2 = await pool.query("select * from addtocart where (username,canteennumber)=($1,$2) order by id", [req.session.userName, req.session.canteenNumber]);
    const menu = op2.rows;
    let oppp=req.session.userName;
    req.session.userName = oppp;
    let ansss=req.session.canteenNumber;
    req.session.canteenNumber = ansss;
    res.render('addtocart', { menu, "name1": req.session.canteenName });
}
async function addFood(req, res) {
    try {
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        const ans1 = await pool.query(("select * from menu where (foodtitle,foodtype)=($1,$2)"), [foodtitle, foodtype]);
        const ans2 = await pool.query("select * from addtocart where(username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
        let ans100 = Number(ans1.rows[0].price);
        await pool.query("update addtocart set (totalprice,quantity)=($1,$2) where(username,foodtitle,foodtype,canteennumber)=($3,$4,$5,$6)", [(ans100 + ans2.rows[0].totalprice), ans2.rows[0].quantity + 1, req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
        res.redirect('/addtocart');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function remFood(req, res) {
    try {
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        const ans1 = await pool.query(("select * from menu where (foodtitle,foodtype)=($1,$2)"), [foodtitle, foodtype]);
        const ans2 = await pool.query("select * from addtocart where(username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
        let ans100 = Number(ans1.rows[0].price);
        if (ans2.rows[0].quantity == 1) {
            await pool.query("delete from addtocart where(username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
        }
        else {
            await pool.query("update addtocart set (totalprice,quantity)=($1,$2) where(username,foodtitle,foodtype,canteennumber)=($3,$4,$5,$6)", [(ans2.rows[0].totalprice - ans100), ans2.rows[0].quantity - 1, req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
        }
        res.redirect('/addtocart');
    }
    catch (err) {
        res.send(`<h1>Only positive quantity allowed</h1>`);
    }
}
async function allFood(req, res) {
    try {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let db_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        // console.log(db_date);
        const ans0 = await pool.query("select * from addtocart where(username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        // console.log(ans0.rows);
        for (let i = 0; i < ans0.rows.length; i++) {
            const ans2 = await pool.query("select * from orders where (username,canteennumber,foodtitle,foodtype,status)=($1,$2,$3,$4,false)", [req.session.userName, req.session.canteenNumber, ans0.rows[i].foodtitle, ans0.rows[i].foodtype]);
            // console.log(ans2.rows);
            if (ans2.rows.length != 0) {
                await pool.query("update orders set (totalprice,quantity,ordertime)=($1,$2,$3) where(username,canteennumber,foodtitle,foodtype,status)=($4,$5,$6,$7,false)", [(ans0.rows[i].totalprice + ans2.rows[0].totalprice), ans2.rows[0].quantity + ans0.rows[0].quantity, db_date, req.session.userName, req.session.canteenNumber, ans0.rows[i].foodtitle, ans0.rows[i].foodtype]);
            }
            else {
                await pool.query("insert into orders(username,canteennumber,foodtitle,foodtype,totalprice,quantity,ordertime) values($1,$2,$3,$4,$5,$6,$7)", [req.session.userName, req.session.canteenNumber, ans0.rows[i].foodtitle, ans0.rows[i].foodtype, ans0.rows[i].totalprice, ans0.rows[i].quantity, db_date]);
            }
        }
        // const ans1 = pool.query("select * from orders");
        res.redirect('/vieworder');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function allDel(req, res) {
    try {
        await pool.query("delete from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        res.redirect('/addtocart');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function addSolo(req, res) {
    try {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const db_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        const ans2 = await pool.query("select * from addtocart where(username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [req.session.userName, foodtitle, foodtype, req.session.canteenNumber]);
        const ans3 = await pool.query("select * from orders where (username,canteennumber,foodtitle,foodtype,status)=($1,$2,$3,$4,false)", [req.session.userName, req.session.canteenNumber, foodtitle, foodtype]);
        if (ans3.rows.length != 0) {
            await pool.query("update orders set (totalprice,quantity,ordertime)=($1,$2,$3) where(username,canteennumber,foodtitle,foodtype,status)=($4,$5,$6,$7,false)", [(ans3.rows[0].totalprice + ans2.rows[0].totalprice), ans2.rows[0].quantity + ans3.rows[0].quantity, db_date, req.session.userName, req.session.canteenNumber, foodtitle, foodtype]);
        }
        else {
            await pool.query("insert into orders(username,canteennumber,foodtitle,foodtype,totalprice,quantity,ordertime) values($1,$2,$3,$4,$5,$6,$7)", [req.session.userName, req.session.canteenNumber, ans2.rows[0].foodtitle, ans2.rows[0].foodtype, ans2.rows[0].totalprice, ans2.rows[0].quantity, db_date]);
        }
        res.redirect('/vieworder');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function remSolo(req, res) {
    try {
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        await pool.query("delete from addtocart where(username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [req.session.userName, foodtitle, foodtype, req.session.canteenNumber]);
        res.redirect('/addtocart');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//order status page-raing algo
async function viewOrder(req, res) {
    try {
        const ans1 = await pool.query("select * from orders where(username,canteennumber,status)=($1,$2,false)", [req.session.userName, req.session.canteenNumber]);
        const orders = ans1.rows;
        const ans2 = await pool.query("select * from orders where(username,canteennumber,status)=($1,$2,true)", [req.session.userName, req.session.canteenNumber]);
        const orders1 = ans2.rows;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('view_order', { orders1, orders, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function rating(req, res) {
    try {
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        const rat = req.body.rating;
        let ansss = Number(rat);
        // const ans = await pool.query("select * from menu where (foodtitle,foodtype)=($1,$2)", [foodtitle, foodtype]);
        await pool.query("insert into rating_history values($1,$2,$3,$4)",[req.session.userName,ansss,foodtitle,foodtype]);
        const ans2=await pool.query("select sum(rating) as s from rating_history where(foodtitle,foodtype)=($1,$2)",[foodtitle,foodtype]);
        const ans3=await pool.query("select count(rating) as c from rating_history where(foodtitle,foodtype)=($1,$2)",[foodtitle,foodtype]);
        // console.log(Number(ans2.rows[0].s),Number(ans3.rows[0].c),(Number(ans2.rows[0].s)) / (Number(ans3.rows[0].c)))
        await pool.query("update menu set foodrating=$1 where (foodtitle,foodtype)=($2,$3)", [((Number(ans2.rows[0].s)) / (Number(ans3.rows[0].c))), foodtitle, foodtype]);
        await pool.query("delete from orders where (username,foodtitle,foodtype,canteennumber,status)=($1,$2,$3,$4,true)", [req.session.userName, foodtitle, foodtype, req.session.canteenNumber]);
        res.redirect('/vieworder');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function nothing_gives_rating(req, res) {
    try {
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        await pool.query("delete from orders where (username,foodtitle,foodtype,canteennumber,status)=($1,$2,$3,$4,true)", [req.session.userName, foodtitle, foodtype, req.session.canteenNumber]);
        res.redirect('/vieworder');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//order-cart algo
async function order(req, res) {
    try {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const db_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        // console.log(db_date);
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        // console.log(foodtitle, foodtype);
        const ans1 = await pool.query(("select * from menu where (foodtitle,foodtype)=($1,$2)"), [foodtitle, foodtype]);
        const ans2 = await pool.query(("select * from orders where (username,canteennumber,foodtitle,foodtype,status)=($1,$2,$3,$4,false)"), [req.session.userName, req.session.canteenNumber, foodtitle, foodtype]);
        if (ans2.rows.length != 0) {
            let ans100 = Number(ans1.rows[0].price);
            await pool.query("update orders set (totalprice,quantity,ordertime)=($1,$2,$3) where(username,canteennumber,foodtitle,foodtype,status)=($4,$5,$6,$7,false)", [(ans100 + ans2.rows[0].totalprice), ans2.rows[0].quantity + 1, db_date, req.session.userName, req.session.canteenNumber, foodtitle, foodtype]);
        }
        else {
            const ans = await pool.query("insert into orders(username,canteennumber,foodtitle,foodtype,totalprice,quantity,ordertime) values($1,$2,$3,$4,$5,1,$6)", [req.session.userName, req.session.canteenNumber, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, (ans1.rows[0].price * 1), db_date]);
        }
        res.redirect('/vieworder');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function cart(req, res) {
    try {
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        // console.log(foodtitle,foodtype);
        const ans1 = await pool.query(("select * from menu where (foodtitle,foodtype)=($1,$2)"), [foodtitle, foodtype]);
        // console.log(ans1.rows);
        const ans2 = await pool.query("select * from addtocart where(username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
        if (ans2.rows.length != 0) {
            let ans100 = Number(ans1.rows[0].price);
            await pool.query("update addtocart set (totalprice,quantity)=($1,$2) where (username,foodtitle,foodtype,canteennumber)=($3,$4,$5,$6)", [(ans100 + ans2.rows[0].totalprice), ans2.rows[0].quantity + 1, req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, req.session.canteenNumber]);
            res.redirect('/');
        }
        else {
            const ans = pool.query("insert into addtocart(username,foodtitle,foodtype,totalprice,quantity,canteennumber) values($1,$2,$3,$4,$5,$6)", [req.session.userName, ans1.rows[0].foodtitle, ans1.rows[0].foodtype, (ans1.rows[0].price * 1), 1, req.session.canteenNumber]);
            res.redirect('/');
        }
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//menu-category search algo
async function menuSearch(req, res) {
    try {
        const op3 = await pool.query("select count(*) as c from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const count = op3.rows[0].c;
        const op2 = await pool.query(`select * from Menu where (foodtitle,canteen${req.session.canteenNumber})=('${req.body.name}',true)`);
        const menu = op2.rows;
        // const op4=await pool.query("select * from canteen");
        // const canteen=op4.rows;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('menu', { menu, "name": req.session.userName, count, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function categorySearch(req, res) {
    try {
        const op2 = await pool.query("select * from category where categoryname=$1", [req.body.name]);
        const category = op2.rows;
        const op3 = await pool.query("select count(*) as c from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const count = op3.rows[0].c;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('category', { category, "name": req.session.userName, count, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//handle category algo
async function handleCategory(req, res) {
    try {
        const name = req.params.name;
        // console.log(name);
        const op3 = await pool.query("select count(*) as c from addtocart where (username,canteennumber)=($1,$2)", [req.session.userName, req.session.canteenNumber]);
        const count = op3.rows[0].c;
        const op2 = await pool.query(`select * from Menu where (categoryname,canteen${req.session.canteenNumber})=('${name}',true)`);
        const menu = op2.rows;
        // const op4=await pool.query("select * from canteen");
        // const canteen=op4.rows;
        let oppp=req.session.userName;
        req.session.userName = oppp;
        let ansss=req.session.canteenNumber;
        req.session.canteenNumber = ansss;
        res.render('menu', { menu, "name": req.session.userName, count, "name1": req.session.canteenName });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}




//admin


//protect route session
function protectRoute3(req, res, next) {
    if (req.session.adminName)
        next();
    else {
        // res.send("Session was expired, please login again");
        res.redirect('/login');
    }
}

async function op(req, res) {
    try {
        const op1 = await pool.query("select * from admin where name=$1", [req.session.adminName]);
        const admin1 = op1.rows[0];
        // console.log(admin1);
        let oppp=req.session.adminName;
        req.session.adminName=oppp;
        res.render('admin', { admin1 });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function op1(req, res) {
    try {
        const ans = await pool.query("select * from admin where status=false");
        const request = ans.rows;
        let oppp=req.session.adminName;
        req.session.adminName=oppp;
        res.render('approval', { chek: false, request });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function op2(req, res) {
    try {
        const ans = await pool.query("select * from canteen where status=false");
        const request = ans.rows;
        let oppp=req.session.adminName;
        req.session.adminName=oppp;
        res.render('approval', { chek: true, request });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function op3(req, res) {
    try {
        const aid = req.params.id;
        // console.log(aid);
        await pool.query("update admin SET status = true where a_id=$1", [aid]);
        const ans = await pool.query("select a_id from admin where name=$1", [req.session.adminName]);
        await pool.query("insert into accesses_adm values($1,$2)", [ans.rows[0].a_id, aid]);
        res.redirect('/approval');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function op4(req, res) {
    try {
        const aid = req.params.id;
        // console.log(aid);
        await pool.query("delete from admin_contact where aid=$1",[aid]);
        await pool.query("delete from admin where a_id=$1", [aid]);
        res.redirect('/approval');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function op5(req, res) {
    try {
        const aid = req.params.id;
        // console.log(aid);
        await pool.query("update canteen SET status = true where canteennumber=$1", [aid]);
        const ans = await pool.query("select a_id from admin where name=$1", [req.session.adminName]);
        await pool.query("insert into accesses_can values($1,$2)", [ans.rows[0].a_id, aid]);
        await pool.query(`alter table menu add canteen${aid} bool default false`);
        res.redirect('/canteen_req');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function op6(req, res) {
    try {
        const aid = req.params.id;
        // console.log(aid);
        await pool.query("delete from canteen where canteennumber=$1", [aid]);
        res.redirect('/canteen_req');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}



//canteen


//protect route session
function protectRoute4(req, res, next) {
    if (req.session.canteenName)
        next();
    else {
        // res.send("Session was expired, please login again");
        res.redirect('/login');
    }
}

async function can(req, res) {
    try {
        //edit kare toh elokoni priority last thay jay
        const ans0 = await pool.query("select * from orders where (canteennumber,status)=($1,false) order by ordertime", [req.session.canteenNumber]);
        //edit kare toh pn elokoni priority same j rahse
        // const ans0 = await pool.query("select * from orders where (canteennumber,status)=($1,false) order by id", [req.session.canteenNumber]);
        const orders = ans0.rows;
        chek = true;
        let ansss=req.session.canteenName;
        req.session.canteenName=ansss;
        res.render('canteen', { orders, chek })
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can1(req, res) {
    try {
        const ans0 = await pool.query("select * from staff where (canteennumber,status)=($1,false)", [req.session.canteenNumber]);
        const request = ans0.rows;
        chek = false;
        let ansss=req.session.canteenName;
        req.session.canteenName=ansss;
        res.render('canteen', { request, chek })
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can2(req, res) {
    try {
        const ans0 = await pool.query(`select * from menu where canteen${req.session.canteenNumber}=$1`,[false]);
        const update = ans0.rows;
        const ans1 = await pool.query(`select * from menu where canteen${req.session.canteenNumber}=$1`,[true]);
        const update1 = ans1.rows;
        let ansss=req.session.canteenName;
        req.session.canteenName=ansss;
        res.render('foodhandling', { update,update1 });
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can3(req, res) {
    try {
        const foodtitle=req.query.foodtitle;
        const foodtype=req.query.foodtype;
        await pool.query(`update menu set canteen${req.session.canteenNumber}=true where (foodtitle,foodtype)=($1,$2)`,[foodtitle,foodtype]);
        res.redirect('/foodhandling');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can4(req, res) {
    try {
        const foodtitle=req.query.foodtitle;
        const foodtype=req.query.foodtype;
        await pool.query(`update menu set canteen${req.session.canteenNumber}=false where (foodtitle,foodtype)=($1,$2)`,[foodtitle,foodtype]);
        res.redirect('/foodhandling');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can5(req, res) {
    try {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const db_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        const username = req.query.username;
        const foodtitle = req.query.foodtitle;
        const foodtype = req.query.foodtype;
        // console.log(username, foodtitle, foodtype);
        await pool.query("update orders set status=true where (username,foodtitle,foodtype,canteennumber)=($1,$2,$3,$4)", [username, foodtitle, foodtype, req.session.canteenNumber]);
        const ans1 = await pool.query("select * from orders where (username,foodtitle,foodtype,canteennumber,status)=($1,$2,$3,$4,true)", [username, foodtitle, foodtype, req.session.canteenNumber]);
        const op1 = ans1.rows[0];
        await pool.query("insert into orderhistory values($1,$2,$3,$4,$5,$6,$7,$8)", [op1.username, op1.foodtitle, op1.foodtype, req.session.canteenNumber, op1.ordertime, db_date, op1.totalprice, op1.quantity]);
        res.redirect('/order_show');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can6(req, res) {
    try {
        const name = req.params.name;
        console.log(name);
        await pool.query("update staff set status=true where (name,canteennumber)=($1,$2)", [name, req.session.canteenNumber]);
        await pool.query(`UPDATE canteen SET number_of_staff = (select count(name) from staff where (canteennumber,status)= (${req.session.canteenNumber},true)) WHERE canteennumber= ${req.session.canteenNumber}`);
        res.redirect('/staff_approval');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}
async function can7(req, res) {
    try {
        const name = req.params.name;
        await pool.query("delete from staff where(username,canteennumber)=($1,$2)", [username, req.session.canteenNumber]);
        res.redirect('/staff_approval');
    }
    catch (err) {
        res.send(`<h1>${err.message}</h1>`);
    }
}

//log out page 
async function logoutPage(req, res) {
    req.session.destroy(function (err) {
        if (err)
            res.send(err.message);
        // res.send("succefully logout");
        res.redirect('/login');
    });
}


app.listen(port, () => {
    console.log(`Website start on http://localhost:${port}/`);
});