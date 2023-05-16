import fs from "fs" // ES6
// const fs = require('fs'); - Common.js
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

function create(content: string) {
    //Salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content)
    return content;
}

// [SIMULATION]
console.log(create("Daqui a pouco vou almoçar!"));