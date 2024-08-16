const express = require("express");
const app = express();
const multer = require("multer");
const port = 3000;
const path = require("path");
const dbpsql = require("./assets/js/queries");
const db = require("./src/db");
const { QueryTypes } = require("sequelize");
const session = require("express-session");
const flash = require("express-flash");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// to access static files
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "views/uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let imagePath = "";

app.use(
  session({
    secret: "johndoesession",
    cookie: { maxAge: 3600000, secure: false, httpOnly: true },
    saveUninitialized: true,
    resave: false,
    store: new session.MemoryStore(),
  })
);

app.use(flash());

// routing
app.get("/", renderHome);
app.get("/add-hero", renderHero);
app.get("/add-type", renderType);
app.get("/testimonial", renderTestimonial);
app.get("/contact", renderContact);
app.get("/detail/:blog_id", renderDetail);
app.get("/edit-project/:blog_id", renderEdit);
app.post("/edit-project/:blog_id", editProject);
app.get("/delete-project/:blog_id", deleteProject);
app.post("/create-hero", upload.single("image_uploaded"), postHero);
app.post("/create-type", postType);
app.get("/login", renderLogin);
app.post("/login", login);
app.get("/register", renderRegister);
app.post("/register", register);
app.get("/logout", logout);

async function renderHome(req, res) {
  const loggedIn = req.session.loggedIn;

  const project = `SELECT h.*, t.name as type_name FROM heroes_tb h JOIN type_tb t ON h.type_id = t.id ORDER BY id ASC`;
  const results = await db.query(project, { type: QueryTypes.SELECT });

  res.render("index", {
    data: results,
    loggedIn: loggedIn,
  });
}

async function renderHero(req, res) {
  try {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
      const project = `SELECT h.*, t.name as type_name FROM heroes_tb h JOIN type_tb t ON h.type_id = t.id ORDER BY id ASC`;
      const typeHero = `SELECT * FROM type_tb`;

      const results = await db.query(project, { type: QueryTypes.SELECT });
      const resultsType = await db.query(typeHero, { type: QueryTypes.SELECT });

      res.render("add-hero", {
        data: results,
        loggedIn: loggedIn,
        typeResult: resultsType,
      });
      return;
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error in render process :", error);
    res.status(500).send("Error retrieving projects");
  }
}

function renderType(req, res) {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    res.render("add-type");
    return;
  }

  res.redirect("/");
}

async function renderDetail(req, res) {
  // req.params.blog_id => blog_id retrieved from app.get params
  try {
    const loggedIn = req.session.loggedIn;
    const id = parseInt(req.params.blog_id);
    const project = `SELECT h.*, t.name as type_name FROM heroes_tb h JOIN type_tb t ON h.type_id = t.id WHERE h.id =$1`;
    const result = await db.query(project, {
      type: QueryTypes.SELECT,
      bind: [id],
    });

    res.render("detail", {
      data: result[0],
      loggedIn: loggedIn,
    });
  } catch (error) {
    console.error("Error in render detail process :", error);
    res.status(500).send("Error retrieving detail");
  }
}

async function renderEdit(req, res) {
  try {
    const id = parseInt(req.params.blog_id);

    const typeHero = `SELECT * FROM type_tb`;
    const project = `SELECT * FROM heroes_tb WHERE id =$1`;

    const result = await db.query(project, {
      type: QueryTypes.SELECT,
      bind: [id],
    });
    const resultsType = await db.query(typeHero, { type: QueryTypes.SELECT });

    res.render("edit-project", {
      data: result[0],
      typeResult: resultsType,
    });
  } catch (error) {
    console.error("Error in render detail process :", error);
    res.status(500).send("Error retrieving detail");
  }
}

async function postHero(req, res) {
  try {
    imagePath = req.file.path.replace("views\\", "");
    const image = req.file ? imagePath : null;

    const blog = [req.body.hero_name, req.body.hero_tipe, image];

    const newProject = `INSERT INTO heroes_tb (name, type_id, photo) VALUES ($1, $2, $3)`;

    await db.query(newProject, { type: QueryTypes.INSERT, bind: blog });
    res.redirect("/");
  } catch (e) {
    res.send(`<script>alert("Error! ${e.message}")</script>`);
  }
}

async function postType(req, res) {
  try {
    const blog = [req.body.type_name];
    const newType = `INSERT INTO type_tb (name) VALUES ($1)`;

    await db.query(newType, { type: QueryTypes.INSERT, bind: blog });
    res.redirect("/");
  } catch (e) {
    res.send(`<script>alert("Error! ${e.message}")</script>`);
  }
}

async function editProject(req, res) {
  try {
    const blog = [req.body.hero_name, req.body.hero_type, req.params.blog_id];

    const updateProject = `UPDATE heroes_tb SET name = $1, type_id = $2 WHERE id = $3`;

    await db.query(updateProject, { bind: blog });
    res.redirect("/");
  } catch (e) {
    res.send(`<script>alert("Error! ${e.message}")</script>`);
  }
}

async function deleteProject(req, res) {
  try {
    const id = parseInt(req.params.blog_id);
    const deleteProject = `DELETE FROM heroes_tb WHERE id = $1`;

    await db.query(deleteProject, { bind: [id] });
    res.redirect("/");
  } catch (error) {
    res.send(`<script>alert("Error! ${e.message}")</script>`);
  }
}

function renderTestimonial(req, res) {
  const loggedIn = req.session.loggedIn;
  res.render("testimonial", { loggedIn: loggedIn });
}

function renderContact(req, res) {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    res.render("contact", { loggedIn: loggedIn });
    return;
  }
  res.redirect("/");
}

function renderLogin(req, res) {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
}

async function login(req, res) {
  try {
    const user = [req.body.username, req.body.password];

    const loginUser = `SELECT * FROM users_tb WHERE username = $1 AND password = $2`;
    const result = await db.query(loginUser, {
      type: QueryTypes.SELECT,
      bind: user,
    });

    if (result.length == 0) {
      req.flash("error", "login gagal");
      res.redirect("/login");
      return;
    }

    req.session.user = result[0];
    req.session.loggedIn = true;

    req.flash("succes", "login sukses");
    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.redirect("/login");
  }
}

function renderRegister(req, res) {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("register");
}

async function register(req, res) {
  try {
    const user = [req.body.email, req.body.username, req.body.password];

    const newUser = `INSERT INTO users_tb (email, username, password) VALUES ($1, $2, $3)`;
    await db.query(newUser, {
      type: QueryTypes.INSERT,
      bind: user,
    });

    req.flash("succes", "register berjalan");
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
