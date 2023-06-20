require("dotenv").config();

const cron = require("cron");
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const specs = require("./config/swaggerConfig");
const MqttHandler = require("./workers/mqtt/mqttWorker");
//const PlantService = require("./services/plantService");

//const plantService = new PlantService();

const {
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
  NotFound,
} = require("./errors");
const { verifyToken } = require("./middlewares");
const morgan = require("morgan");

class App {
  constructor() {
    this.app = express();
    this.mqttHandler = new MqttHandler();
    this.port = process.env?.API_PORT;
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandlers();
    this.startServer();
    this.scheduleJobs();
  }

  registerMiddleware() {
    // Middlewares 등록
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(morgan("combined"));
    this.app.set("trust proxy", "127.0.0.1");
  }

  registerRoutes() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use("/api/v1/auth", require("./controllers/authController"));

    this.app.use(verifyToken);
    this.app.use("/api/v1/article",require("./controllers/article/articleController"));
    this.app.use("/api/v1/device", require("./controllers/deviceController"));
    this.app.use("/api/v1/plant", require("./controllers/plant/plantController"));
    this.app.use("/api/v1/guestBook", require("./controllers/plant/guestBookController"));
    this.app.use("/api/v1/user", require("./controllers/userController"));
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
    this.mqttHandler.subscribeByDevicePlant();

    // cron 스케줄 등록
    new cron.CronJob("*/20 * * * * *", async () => {
      await this.mqttHandler.actuatorControlToDevice();
    }).start();

    // new cron.CronJob("0 14 * * *", async () => {
    //   await plantService.updateCurrentGrade();
    // }).start(); 
  }
}

new App();
