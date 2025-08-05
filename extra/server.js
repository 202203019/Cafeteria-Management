// const http=require('http');

// const server=http.createServer((req,res)=>{
//     console.log('request has been made from browser to server');
// });

// server.listen(3000, 'localhost',()=>{
//     console.log('server is listening on port 3000');    
// });

const exp=require('express');
const app=exp();

app.listen(3000,()=>{
    console.log("Server is start on http://localhost:3000/");
});

app.get('/general.css',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('general.css',{root:__dirname});
});

app.get('/',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('index.html',{root:__dirname});
});

app.get('/index.html',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('index.html',{root:__dirname});
});

app.get('/admin.html',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('admin.html',{root:__dirname});
});

app.get('/order.html',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('order.html',{root:__dirname});
});

app.get('/food.html',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('food.html',{root:__dirname});
});

app.get('/category.html',(req,res)=>{
    console.log("Aya request...");
    res.sendFile('category.html',{root:__dirname});
});