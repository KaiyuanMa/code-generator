import JSZip from 'jszip'
import saveAs from 'file-saver'

export const zipFiles = () => {
  const zip = new JSZip();
  
  const dbName = 'code_generator'
  const modelNames = [
    'User',
    'Entry',
    'Validation',
    'DataSet',
  ]
  
  const modelImports =  modelNames.map(modelName => {
    return `const ${modelName} = require('${modelName}')\n`
  })

  const modelExports = modelNames.map(modelName => `  ${modelName},\n`)

  const indexBlob = new Blob([
    'const conn = require("./conn");\n',    
    ...modelImports,
    // `\nUser.hasMany(DataSet);\nDataSet.hasMany(Model);\nModel.hasMany(Entry);\nEntry.hasMany(Validation);\n\n`,
    `\nmodule.exports = {\n  conn,\n`,
    ...modelExports,
    `};\n`,
  ])
  
  const connBlob = new Blob([
    'const Sequelize = require("sequelize");\n',
    "require('dotenv').config(); \n\n",
    'const conn = new Sequelize(\n',
    `  process.env.DATABASE_URL || "postgres://localhost/${dbName}"\n`,
    ');\n\n',
    'module.exports = conn;\n'
  ])
  
  zip.file("index.js", indexBlob);
  
  const img = zip.folder("db");
  img.file("conn.js", connBlob, {base64: true});
  
  zip.generateAsync({type:"blob"}).then(function(content) {
      // see FileSaver.js
      saveAs(content, "example.zip");
  });
}
