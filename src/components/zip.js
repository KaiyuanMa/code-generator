import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import saveAs from "file-saver";
import { useSelector } from "react-redux";
import { getDataSetNode } from "../api/node";
import { getDataSetEdges } from "../api/edge";
import { getDataSetModels } from '../api/dataSet'


const zipFiles = async(models, databaseName) => {
  console.log('models' , models)

  const getName = (model) =>
    models.filter((m) => m.id === model.modelId)[0].name;
  
  const getModelRelations = () => {
    return new Promise( async(res)=> {
      const datatsetId = models[0].dataSetId
      const [edges, nodes, datasetModels ] = await Promise.all ([
        (await getDataSetEdges(datatsetId)).data,
        (await getDataSetNode(datatsetId)).data,
        (await getDataSetModels(datatsetId)).data
      ])
  
      const getModelName = (id) => {
        const model = datasetModels.filter( model => model.id === id)[0]
        return model.name
      }
      
      const getModelId = (id) => {
        const node = nodes.filter( node => id === node.id)[0]
        return getModelName(node.modelId)
      }
  
      const modelRelations = edges.map( edge => `\n${getModelId(edge.source)}.${edge.label}(${getModelId(edge.target)})` )
      console.log('model relations ', modelRelations)

      if(modelRelations) return res(modelRelations)

    }).then((modelRelations)=> {
      console.log('promise success return modelrelations', modelRelations)
      return modelRelations
    })
  }

  const printModelEntries = model => {
    const defaultEntries = ['id', 'modelId', 'createdAt', 'updatedAt', 'validations']
    const entries = model.entries.map(entry => {
      const toup = Object.entries(entry)
      const filterEntries = toup.filter( key_val => key_val[1] && !defaultEntries.includes(key_val[0]))
      const printableEntries = filterEntries.map( e => `\n  ${e[0]}: ${e[1]}`)
      return printableEntries
    })
    return entries
  }

  const modelRelations = async() => await getModelRelations()

  const dbName = databaseName;
  const modelNames = models.map((model) => model.name);

  // Auto generate content for index.js
  const modelImports = modelNames.map(
    (modelName) => `const ${modelName} = require('${modelName}')\n`
  );
  const modelExports = modelNames.map((modelName) => `  ${modelName},\n`);
  const exportModelRelations = await modelRelations()

  // Blobs
  const indexBlob = new Blob([
    'const conn = require("./conn");\n',
    ...modelImports,
    ...exportModelRelations,
    `\n\nmodule.exports = {\n  conn,\n`,
    ...modelExports,
    `};\n`,
  ]);

  const connBlob = new Blob([
    'const Sequelize = require("sequelize");\n',
    "require('dotenv').config(); \n\n",
    "const conn = new Sequelize(\n",
    `  process.env.DATABASE_URL || "postgres://localhost/${dbName}"\n`,
    ");\n\n",
    "module.exports = conn;\n",
  ]);

  const modelsBlob = models.map((model) => {
    const modelEntries = printModelEntries(model)
    return {
      name: model.name,
      blob: new Blob([
        'const conn = require("./conn");\n',
        "const { Sequelize } = conn;\n\n",
        `const ${model.name} = conn.define("${model.name}", {`,
        ...modelEntries,
        "\n});\n",
      ]),
    };
  });

  //create the zip file then return the zip
  const zip = new JSZip();
  const db = zip.folder("db");
  zip.file("index.js", indexBlob);
  db.file("conn.js", connBlob, { base64: true });
  modelsBlob.map((model) =>
    db.file(`${model.name}.js`, model.blob, { base64: true })
  );
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "example.zip");
  });
};

export function ZipButton() {

  const { dataSet } = useSelector(state => state.dataSet)
  const { models } = useSelector(state => state.models);
  const [ popUp, setPopUp ] = useState(false);
  const [ dbName, setDbName ] = useState(dataSet.name);

  const closePopUp = () => setPopUp(false);

  const downloadZip = (ev) => {
    ev.preventDefault();
    setDbName(dataSet.name);
    return zipFiles(models, dbName);
  };

  return (
    <>
      <button
        onClick={() => {
          setPopUp((prev) => !prev);
        }}
      >
        Export
      </button>
      { popUp && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgb(0,0,0, .5)",
            zIndex: "500",
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            action=""
            style={{
              postition: "relative",
              backgroundColor: "#bccdfb",
              display: "flex",
              flexDirection: "column",
              height: "50%",
              width: "50%",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <button onClick={closePopUp} style={{ alignSelf: "flex-end" }}>
              X
            </button>
            <label htmlFor="">Name of your Database</label>
            <input
              type="text"
              value={dbName}
              onChange={(ev) => setDbName(ev.target.value)}
            />
            <button onClick={downloadZip}>DOWNLOAD</button>
          </form>
        </div>
      )}
    </>
  );
}
