var fs = require('fs');
var path = require('path');
// 读取当前系统中所有目录
var dir = fs.readdirSync('.');

var exportContent = {};
var importContent = [];
// 构建全部内容
function buildFolder(dirPath, folder) {
  var rootDir = fs.readdirSync(dirPath);
  var indexPath = __dirname + '\\' + folder + '\\index.js';

  var content = "";
  var importItemContent = "import {\n";
  // 1.目录下处理
  for (var idx = 0; idx < rootDir.length; idx++) {
    var rootPath = __dirname + '\\' + folder + '\\' + rootDir[idx];
    var rootItem = fs.lstatSync(rootPath);
    // 2.生成目录中的index.js文件内容
    if(rootItem.isDirectory()) {
      var component = rootDir[idx];
      if(0 > component.indexOf('_')) {
        importItemContent += "\t" + component + ",\n";
        var key = '$UCA$.' + folder + '.' + component;
        content += "export " + component + " from './" + component + "/Component'\n";
        exportContent[key] = component;
      }
    }
  }
  fs.writeFile(indexPath,content,function(){
    console.log("[INDEX] Success to create index.js for " + indexPath);
  });
  importItemContent += "} from './" + folder + "'\n\n"
  importContent.push(importItemContent);
}

// 读取所有根目录
for (var idx = 0; idx < dir.length; idx++) {
  var dirPath = __dirname + '\\' + dir[idx];
  var dirItem = fs.lstatSync(dirPath);
  if (dirItem.isDirectory() && 0 >= dirPath.indexOf('_')) {
    buildFolder(dirPath, dir[idx]);
  }
}

// Export Content
var content = "";
for(var idx = 0; idx < importContent.length; idx++ ){
  content += importContent[idx];
}
content += "export default {\n";
for(var key in exportContent){
  content += '\t"' + key + '":' + exportContent[key] + ",\n"
}
content += "}";
fs.writeFile("uca.js",content,function(){
  console.log("[UCA] Success to create uca.js");
});
