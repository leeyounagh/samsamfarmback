require("dotenv").config();

const mysql = require("mysql2");
const express = require("express");
const cron = require("cron");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Samsamfarm API with Swagger",
      version: "1.0.0",
      description: "Samsamfarm API with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Samsamfam server",
      },
    ],
    tags: [
      {
        name: "article",
        description: "About Article, Comment",
      },
      {
        name: "auth",
        description: "About User",
      },
      {
        name: "device",
        description: "About Actuator, Device",
      },
      {
        name: "plant",
        description: "About Plant, Guest_book,Plant log",
      },
    ],
  },
  apis: [
    "./src/controllers/*.js",
    "./src/services/*.js",
    "./src/errors/*.js",
    "./src/controllers/articleController/*.js",
    "./src/controllers/plantController/*.js",
  ],
};

const specs = swaggerJsdoc(options);

const {
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
  NotFound,
} = require("./errors");

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PW,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error("Error connectiong to database", err);
      } else {
        console.log("Connectd to Database!");
      }
    });

    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandlers();
    this.startServer();
    this.scheduleJobs();
  }

  registerMiddleware() {
    // Middlewares 등록
    this.app.use(cors()); // cors 미들웨어 등록
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  registerRoutes() {
    // Routes 등록
    // this.app.use("/api/users", usersRouter);
    // this.app.use("/posts", postsRouter);

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use(
      "/api/article",
      require("./controllers/articleController/article")(this.connection)
    );
    this.app.use("/api/auth", require("./controllers/auth")(this.connection));
    this.app.use(
      "/api/device",
      require("./controllers/device")(this.connection)
    );
    this.app.use(
      "/api/plant",
      require("./controllers/plantController/plant")(this.connection)
    );
  }

  registerErrorHandlers() {
    // 에러 핸들러 등록
    this.app.use((err, req, res, next) => {
      if (err instanceof BadRequest) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof Unauthorized) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof Forbidden) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof InternalServerError) {
        res.status(err.code).send({ message: err.message, errors: err.data });
        return;
      } else if (err instanceof NotFound) {
        res.status(err.code).send();
        return;
      } else {
        console.error(err);
        res.status(500).send({ message: "INTERNAL_SERVER_ERROR" });
        return;
      }
    });
  }

  startServer() {
    // 서버 시작
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }

  scheduleJobs() {
    // cron 스케줄 등록
    const job = new cron.CronJob("*/1 * * * *", () => {
      console.log(`The time is now ${new Date()}`);
    });
    job.start();
  }
}

new App();
