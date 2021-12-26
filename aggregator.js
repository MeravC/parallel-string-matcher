const fs = require('fs')

function collect(result){
    if(!fs.existsSync('theResult.json')){
        fs.writeFileSync('theResult.json', '{}');
    }else{
        let data = fs.readFileSync('theResult.json');
        data = JSON.parse(data);
        Object.keys(result).forEach(name => {
            result[name].forEach(offsets => {
                if(data[name]){
                    data[name].push(offsets);
                }else{
                    data[name] = [offsets];
                }
            });
        });
        
        fs.writeFileSync('theResult.json',JSON.stringify(data,null,2));
    } 
}


module.exports = {
    collect,
}