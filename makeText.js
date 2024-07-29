/** Command-line tool to generate Markov text. */

const fs = require("fs");
const { MarkovMachine } = require("./markov");
const axios  = require("axios");

let mode = process.argv[2];
let fileName = process.argv[3];
switch(mode){
    case 'file':
        fs.readFile(fileName, 'utf8', function(err, data) {
            if (err){
                console.error("File not found", err);
                return;
            }
            let mm = new MarkovMachine(data);
            console.log(`... generated text from file ${fileName}\n`);
            console.log(mm.makeText());
        })
        break;
    case 'url':
        let res = axios.get(fileName).then(data => {
            let mm = new MarkovMachine(data.data);
            console.log(`... generated text from url ${fileName}\n`)
            console.log(mm.makeText());
        }).catch(err => {
            console.error(err);
        });
        break;
    default:
        console.log("Please choose a mode. (file or url)");
        console.log("Example:\n node makeText.js url https://www.gutenberg.org/files/11/11-0.txt\n");
}