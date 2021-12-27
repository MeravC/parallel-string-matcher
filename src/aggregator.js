const fs = require("fs");

function collect(resultFromMatcher) {
  if (!fs.existsSync("../output/theResult.json")) {
    fs.writeFileSync("../output/theResult.json", "{}");
  } else {
    let data = fs.readFileSync("../output/theResult.json");
    data = JSON.parse(data);
    Object.keys(resultFromMatcher).forEach((name) => {
      resultFromMatcher[name].forEach((offsets) => {
        if (data[name]) {
          data[name].push(offsets);
        } else {
          data[name] = [offsets];
        }
      });
    });
    fs.writeFileSync("../output/theResult.json", JSON.stringify(data, null, 2));
  }
}

module.exports = {
  collect,
};
