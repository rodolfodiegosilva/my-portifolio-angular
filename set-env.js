const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file if present
dotenv.config();

console.log("Starting set-env.js script...");
console.log("GITHUB_TOKEN from environment: ", process.env.GITHUB_TOKEN);

const envFilePath = './src/environments/environment.prod.ts';
const placeholder = 'PLACEHOLDER_GITHUB_TOKEN';

fs.readFile(envFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file from disk: ${err}`);
    process.exit(1);
  } else {
    console.log("Original environment.prod.ts content:");
    console.log(data);

    const result = data.replace(placeholder, process.env.GITHUB_TOKEN);

    fs.writeFile(envFilePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file to disk: ${err}`);
        process.exit(1);
      } else {
        console.log('Environment variable injected successfully!');
        console.log("Updated environment.prod.ts content:");
        console.log(result);
        process.exit(0);
      }
    });
  }
});
