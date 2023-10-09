import path from "path";
import fs from "fs";
import { exit } from "process";

const fileName = process.argv[3];
const category = process.argv[2] ? process.argv[2] : "";

const content = `---
title: ""
description: ""
category: ""
date: "2023-10-03"
tags: ""
---
`

if(category !== "") {
  const isExistDirectory = fs.existsSync(path.join(process.cwd(), `/src/content/${category}/`));
  if(!isExistDirectory) fs.mkdirSync(path.join(process.cwd(), `/src/content/${category}/`));
}

const filePath = path.join(process.cwd(), `/src/content/${category}/${fileName}`);

if(fs.readFileSync(filePath)) {
  console.info(`Failed make Contents!!`);
  console.info(`Already exist file...`);
  exit();
}

fs.writeFileSync(filePath, content);

console.info(`Success make Contents!!`);
console.info(`Directory: ${category}`);
console.info(`File: ${fileName}`);