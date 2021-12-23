const express = require('express');
const fs = require('fs');
// const matcher = require('./matcher');
const aggregator = require('./aggregator');
const {Worker} = require("worker_threads");

fileDivider();

function fileDivider(){
  const commonEnglishNames = ['James','John','Robert','Michael','William','David','Richard','Charles','Joseph','Thomas','Christopher','Daniel','Paul','Mark','Donald','George','Kenneth','Steven','Edward','Brian','Ronald','Anthony','Kevin','Jason','Matthew','Gary','Timothy','Jose','Larry','Jeffrey','Frank','Scott','Eric','Stephen','Andrew','Raymond','Gregory','Joshua','Jerry','Dennis','Walter','Patrick','Peter','Harold','Douglas','Henry','Carl','Arthur','Ryan','Roger'];
  fs.readFile('big.txt', 'utf8' , (err, data) => {
    let totalLines = 0;
    if (err) {
      console.error(err)
        return
    }
    
   
    const dataArr = data.split('\n');
    let linesForMatcher = [];
    let cntEnd = 1000;
    let cntStart = 0;
    while(cntEnd <= dataArr.length ){
      for (let i = cntStart; i < cntEnd ; i++) {
        linesForMatcher.push(dataArr[i]);
      }
      // console.log("linesForMatcher " + linesForMatcher);
      // const result = matcher.match(linesForMatcher,commonEnglishNames,cntStart);
      const worker = new Worker("./matcher.js", {workerData: [linesForMatcher,commonEnglishNames,cntStart]});

      worker.once("message", result => {
        aggregator.collect(result)
        
        console.log(`${cntStart}th Fibonacci No: ${result}`);
      });

      worker.on("error", error => {
          console.log(error);
      });

      worker.on("exit", exitCode => {
          console.log(`It exited with code ${exitCode}`);
      })

      // console.log("Execution in main thread");
      cntEnd += 1000;
      cntStart += 1000;
      linesForMatcher = [];
      //if(result !== undefined) ;
    }
  });
}
                                                 