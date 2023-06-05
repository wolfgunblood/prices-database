const fs = require('fs').promises;

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());

const filePaths = [];
const filesObject = {};
const result = {};




async function main() {
    const path = "../assets";
    // const files = await fs.readdir(path);
    // console.log(files)



    // console.log(filesObject)

    await findCSVFiles(path);

    // files.forEach(file => {
    //     console.log(file)
    // })

    const datesArray = await fs.readdir(path);



    datesArray.forEach((date) => {
        result[date] = filePaths.filter((filePath) => {
            return filePath && filePath.includes(date);
        });
    });

    // console.log(result);

}

main();

async function findCSVFiles(path) {


    const items = await fs.readdir(path, { withFileTypes: true });



    for (const item of items) {
        if (item.isDirectory()) {
            filePaths.push(await findCSVFiles(path + "/" + item.name));
        } else if (item.name.endsWith(".csv")) {
            // console.log(path)
            filePaths.push(path + "/" + item.name);
        }
        // console.log(item)
    }

    // console.log(files)
}

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(result))
// })


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    
})

app.get('/api', (request, response) => {
    response.json(result)
})

// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
//   }));

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})