import express from "express";

const PORT = 5000;

const app = express();

const logger = (req,res,next) => { 
    console.log(`${req.method} ${req.url}`)
    next();
};



const handleHome = (req, res) => { 
    return res.send("<h1>I still love you</h1>");
};
const handleLogin = (req,res) =>{ 
    return res.send("<h1>Login</h1>");
};



app.use(logger);


app.get("/", handleHome);
app.get("/login", handleLogin);


const handleListening = () => console.log(`Server listening on port http://loclahost:${PORT}🚀`);

app.listen(PORT, handleListening);