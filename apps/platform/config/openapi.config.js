const { generateService } = require('@umijs/openapi');
const fs = require('fs');
const path = require('path');

const SWAGGER_JSON_PATH = 'https://petstore.swagger.io/v2/swagger.json';

const DIR_PATH = path.resolve(__dirname, '../', 'src', 'services');
generateService({
  schemaPath: SWAGGER_JSON_PATH,
  serversPath: DIR_PATH,

  requestLibPath: "import request from 'umi-request';",
}).then(() => {
  const not_rename_files = ['index.ts', 'typings.d.ts'];

  const generatedFiles = fs.readdirSync(DIR_PATH);

  generatedFiles.forEach((fileName) => {
    if (not_rename_files.indexOf(fileName) < 0) {
      fs.renameSync(
        path.resolve(DIR_PATH, fileName),
        path.resolve(DIR_PATH, fileName.charAt(0).toUpperCase() + fileName.slice(1)),
      );
    }
  });
});
