import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import saveAs from "file-saver";
import { useSelector } from "react-redux";
import { getDataSetNode } from "../api/node";
import { getDataSetEdges } from "../api/edge";

const zipFiles = (models, databaseName) => {

  const getName = (model) =>
    models.filter((m) => m.id === model.modelId)[0].name;

  const printModelEntries = model => {
    const defaultEntries = ['id', 'modelId', 'createdAt', 'updatedAt', 'validations']
    const entries = model.entries.map(entry => {
      const toup = Object.entries(entry)

      const filterEntries = toup.filter( key_val => key_val[1] && !defaultEntries.includes(key_val[0]))
      const printableEntries = filterEntries.map( e => `\n  ${e[0]}: ${e[1]}`)
      return printableEntries
    })
    console.log(entries)
    return entries
  }

  const dbName = databaseName;
  const modelNames = models.map((model) => model.name);

  // Auto generate content for index.js
  const modelImports = modelNames.map(
    (modelName) => `const ${modelName} = require('${modelName}')\n`
  );
  const modelConnections = models.filter((model) => model.modelId);
  const printConnections = modelConnections.map(
    (model) => `\n${model.name}.${model.connectionType}(${getName(model)})`
  );
  const modelExports = modelNames.map((modelName) => `  ${modelName},\n`);

  // Blobs
  const indexBlob = new Blob([
    'const conn = require("./conn");\n',
    ...modelImports,
    ...printConnections,
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
  console.log('le state', dataSet)

  const fetchDataSet = async() => {
    const edges = await getDataSetEdges(dataSet.id)
    const nodes = await getDataSetNode(dataSet.id)

    

    console.log('edges: ', edges.data)
    console.log('nodes: ', nodes.data)
  }
  fetchDataSet()

  const { models } = useSelector(state => state.models);
  const [ popUp, setPopUp ] = useState(false);
  const [ dbName, setDbName ] = useState("");

  const closePopUp = () => setPopUp(false);

  const downloadZip = (ev) => {
    ev.preventDefault();
    setDbName("");
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
