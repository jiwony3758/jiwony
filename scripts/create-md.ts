import path from "path";
import fs from "fs";
import { exit } from "process";

const fileName = process.argv[3];
const category = process.argv[2] ? process.argv[2] : "";

const fullPath = path.join(process.cwd(), `/src/content/posts/${category}/`);

const content = `---
title: ""
description: ""
category: ""
date: "2023-10-03"
tags: ""
---
`

if(category !== "") {
  const isExistDirectory = fs.existsSync(fullPath);
  if(!isExistDirectory) fs.mkdirSync(fullPath);
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