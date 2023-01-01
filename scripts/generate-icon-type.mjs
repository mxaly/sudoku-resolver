import fs from "fs";

const dir = "./src/assets/icons/";
const files = fs.readdirSync(dir);
const iconNames = files.map((f) => f.split(".")[0]);

const content = `/*
 * THIS IS AUTOMATICALLY GENERATED FILE
 * DO NOT CHANGE!!!
 *
 * To update the file, run:
 * npm run generate-icon-type
 */
export type Icon =${iconNames.map((icon) => `\n  | "${icon}"`).join("")};\n`;

fs.writeFileSync("./src/types/icons.ts", content);

console.log(content);
