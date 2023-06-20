const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "http://43.202.43.17:8080/",
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
        description: "About User Register/Login",
      },
      {
        name: "device",
        description: "About Actuator, Device",
      },
      {
        name: "plant",
        description: "About Plant, Guest_book,Plant log",
      },
      {
        name: "user",
        description: "About User Info",
      },
    ],
  },
  security: [
    {
      BearerAuth: [], // BearerAuth 보안 정의를 사용할 수 있도록 추가
    },
  ],
  apis: [
    "./src/controllers/*.js",
    "./src/services/*.js",
    "./src/errors/*.js",
    "./src/controllers/article/*.js",
    "./src/controllers/plant/*.js",
    "./migrations/*.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
