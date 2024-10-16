import SearateParser from "./searate-parser.js";
import { readFile } from "fs";

readFile('16.10.2024 15-40-26-raw.json', "utf-8", (err, data) => {

    /** File Reading Validation */
    if (err)
        throw new Error("File Not Loaded");


    const parser = new SearateParser();
    const result = parser.loadRawResponse(data)
        .toJson()
        .validate()
        .prepareDataStructure();

    console.log(result);
})