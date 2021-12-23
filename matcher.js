const {parentPort, workerData} = require("worker_threads");
parentPort.postMessage(match(workerData[0],workerData[1],workerData[2]))

function match(chunk,commonEnglishNames,lineCnt){
    let ans = {};
    
    chunk.forEach(line => {
        let charAtLine = '';
        lineCnt ++;
        line = line.replace(/[.*+?^${'",:_}()|[\]\\]/g, '').split(' ');
        line.forEach(word => {
            for (const i in commonEnglishNames) {
                let myReg = new RegExp(commonEnglishNames[i]);
                if(line.toString().match(myReg) !== null) {
                    charAtLine = line.toString().match(myReg).index;
                }
                if(word === commonEnglishNames[i]){
                    if(ans[commonEnglishNames[i]]){
                        ans[commonEnglishNames[i]].push({"lineOffset":lineCnt,"charOffset":charAtLine});
                    }else{
                        ans[commonEnglishNames[i]] = [{"lineOffset":lineCnt,"charOffset":charAtLine}];
                    }
                }
            }
        });
    });
    return ans;
}

module.exports = {
    match,
}