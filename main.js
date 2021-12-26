const fs = require('fs');
const aggregator = require('./aggregator');
const {Worker} = require("worker_threads");

fileDivider();

function fileDivider(){
  const commonEnglishNames = ['James','John','Robert','Michael','William','David','Richard','Charles','Joseph','Thomas','Christopher','Daniel','Paul','Mark','Donald','George','Kenneth','Steven','Edward','Brian','Ronald','Anthony','Kevin','Jason','Matthew','Gary','Timothy','Jose','Larry','Jeffrey','Frank','Scott','Eric','Stephen','Andrew','Raymond','Gregory','Joshua','Jerry','Dennis','Walter','Patrick','Peter','Harold','Douglas','Henry','Carl','Arthur','Ryan','Roger'];
  fs.readFile('big.txt', 'utf8' , (err, text) => {
    
    if (err) {
      console.error(err)
        return
    }
   
    const textArr = text.split('\n');
    let chunk = [];
    let chunkFirstLineNum = 0;//TODO: move to config file
    let chunkLastLineNum = 1000;//TODO: check optimized division
    while(chunkLastLineNum <= textArr.length){
      for (let i = chunkFirstLineNum; i < chunkLastLineNum; i++) {
        chunk.push(textArr[i]);
      }
      
      const worker = new Worker("./matcher.js", {workerData: [chunk,commonEnglishNames,chunkFirstLineNum]});

      worker.once("message", result => {
        aggregator.collect(result)
        console.log(`Thread Id- ${worker.threadId}`);
      });

      worker.on("error", error => {
          console.log(error);
      });

      worker.on("exit", exitCode => {
          console.log(`It exited with code ${exitCode}`);
      });

      chunkLastLineNum += 1000;
      chunkFirstLineNum += 1000;
      chunk = [];
    }
  });
}
                                                 