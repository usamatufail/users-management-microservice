import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger-doc.json' assert {type: 'json'};

// Converting File to Path
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swagger = (app) => {
  const options = {
    swaggerDefinition: swaggerDoc,
    apis: [`${__dirname}/docs/**/*.yaml`],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none; } .swagger-ui section.models { display: none; } .swagger-ui .renderedMarkdown p { margin-top: 0px; }',
    customSiteTitle: "Users Microservice",
    defaultModelsExpandDepth: -1,
  }));
}
