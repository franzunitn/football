const fs = require('fs');

var path_data_source_bk = 'src/db/data/data_source_bk.json';
var path_data_source = 'src/db/data/data_source.json';
var data = fs.readFileSync(path_data_source_bk, 'utf8');     
fs.writeFileSync(path_data_source, data, 'utf-8');

console.log('Restore successfully done!');