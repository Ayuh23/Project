import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// for database connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port:3307,
  url:"http://127.0.0.1/",
  database: "aayush_db",
});

// middleware for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// middleware upload
const upload = multer({
  storage: storage,
});

con.connect(function (err) {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connected");
  }
});


// get api for restaurant
app.get("/getrestaurant", (req, res) => {
  const sql = "SELECT * FROM restaurant";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get restaurant error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

// get api for single restaurant 
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM restaurant where id =?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get restaurant error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});


// Upate Restaurant Details update api

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE restaurant set name=?,email=?,location=?,phone= ? WHERE id = ?";
  con.query(sql, [req.body.name,req.body.email,req.body.location,req.body.phone, id], (err, result) => {
    if (err) return res.json({ Error: "Update restaurant error in sql" });
    return res.json({ Status: "Success" });
  });
});

// delete restaurant delete api
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM restaurant WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Delete restaurant error in sql" });
    return res.json({ Status: "Success" });
  });
});


// middleware for authentication
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authorized" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};


// api for dashboard
app.use("/dashboard", cors(), verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});


// get api for admin count
app.get("/adminCount", (req, res) => {
  const sql = "SELECT count(id) as admin from users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

//get api for restaurant count 
app.get("/restaurantCount", (req, res) => {
  const sql = "SELECT count(id) as restaurant from restaurant";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

// get api for phone number count
app.get("/phone", (req, res) => {
  const sql = "SELECT sum(phone) as sumOfphone from restaurant";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});


// api for admin login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND password= ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});


// api for restaurant login
app.post("/restaurantlogin", (req, res) => {
  const sql = "SELECT * FROM restaurant Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in running query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password error" });
          if (response) {
            const token = jwt.sign(
              { role: "restaurant", id: result[0].id },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success", id: result[0].id });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});


// api for logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});


// api for create restaurnat
app.post("/create", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO restaurant (`name`, `email`, `password`, `location`, `phone`, `image`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.location,
      req.body.phone,
      req.file.filename,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inside signup query" });
      return res.json({ Status: "Success" });
    });
  });
});


// server listing 
app.listen(4000, () => {
  console.log("Running");
});
