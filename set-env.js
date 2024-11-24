// set-env.ts
const { writeFile } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  GITHUB_TOKEN: '${process.env['GITHUB_TOKEN']}'
};
`;

writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Erro ao escrever o arquivo de ambiente:', err);
  } else {
    console.log(`Arquivo de ambiente gerado em ${targetPath}`);
  }
});
