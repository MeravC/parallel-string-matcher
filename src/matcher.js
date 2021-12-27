const { parentPort, workerData } = require("worker_threads");
parentPort.postMessage(
  match(workerData[0], workerData[1], workerData[2], workerData[3])
);

function match(chunk, commonEnglishNames, lineCnt, charCnt) {
  const ans = {};
  let charAtLine = charCnt;
  chunk.forEach((line) => {
    lineCnt++;
    line = line.replace(/[.*+?^$!{'",:_}()|[\]\\]|-/g, "").split(" ");
    line.forEach((word) => {
      for (const i in commonEnglishNames) {
        if (word === commonEnglishNames[i]) {
          const lastCharAt = charAtLine;
          charAtLine = chunk.toString().indexOf(word, lastCharAt + 1);
          if (charAtLine === -1) {
            charAtLine = lastCharAt;
          }
          if (ans[commonEnglishNames[i]]) {
            ans[commonEnglishNames[i]].push({
              lineOffset: lineCnt,
              charOffset: charAtLine,
            });
          } else {
            ans[commonEnglishNames[i]] = [
              { lineOffset: lineCnt, charOffset: charAtLine },
            ];
          }
        }
      }
    });
  });
  return ans;
}

module.exports = {
  match,
};
