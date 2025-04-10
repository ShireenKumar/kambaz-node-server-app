import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
    
  })
 );
 const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", 
      maxAge: 10 * 60 * 60 * 1000, // 10 hours
      sameSite: "None",
  }
};

  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN || "http://localhost:5173",
    };
  }
  app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
Lab5(app)
Hello(app)
ModuleRoutes(app);

app.listen(process.env.PORT || 4000)