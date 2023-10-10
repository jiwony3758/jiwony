import path from "path";
import fs from "fs";
import { exit } from "process";

const fileName = process.argv[3];
const category = process.argv[2] ? process.argv[2] : "";

const directoryPath = path.join(process.cwd(), `/src/content/posts/${category}/`);
const filePath = path.join(directoryPath, fileName);

const content = `---
title: ""
description: ""
category: ""
date: "2023-10-03"
tags: ""
---
`

if(category !== "") {
  const isExistDirectory = fs.existsSync(directoryPath);
  if(!isExistDirectory) fs.mkdirSync(directoryPath);
}

try{
  const isExistFile = fs.existsSync(filePath);
  if(isExistFile) throw new Error("Already exist file...");
  else{
    fs.writeFileSync(filePath, content);

    console.info(`Success make Contents!!`);
    console.info(`Directory: ${category}`);
    console.info(`File: ${fileName}`);
  }
}catch(e){
  console.log(filePath);
  console.info(`Failed make Contents!!`);
  console.info(e);
  exit();
}

