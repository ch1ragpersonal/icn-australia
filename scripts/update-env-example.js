const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const examplePath = path.resolve(__dirname, '../.env.example');

if (!fs.existsSync(examplePath)) {
  console.error('.env.example file not found');
  process.exit(1);
}

const parseEnvKeys = (content) => {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split('=')[0]);
};

const exampleContent = fs.readFileSync(examplePath, 'utf-8');
const exampleKeys = parseEnvKeys(exampleContent);

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
}

const envKeys = parseEnvKeys(envContent);

const missingFromEnv = exampleKeys.filter((key) => !envKeys.includes(key));
console.log(exampleKeys,envKeys)
if (missingFromEnv.length > 0) {
  console.log('\n⚠️  Warning: These keys are in .env.example but missing from .env:');
  missingFromEnv.forEach((key) => console.log(` - ${key}`));
} else {
  console.log('.env is up to date with .env.example ✅');
}
