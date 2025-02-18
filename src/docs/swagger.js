import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Fast Food",
      version: "1.0.0",
      description: "Documentação das APIs Tech challenger",
    },
  },
  apis: ["./src/docs/swaggerRoutes.yaml"], // Aponta para as rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
