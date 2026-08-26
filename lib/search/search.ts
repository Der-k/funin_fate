import Fuse from "fuse.js"

import { documents } from "./searchIndex"

const fuse = new Fuse(documents,{
    includeScore:true,

    threshold:0.35,

    keys:[
        "title",
        "description",
        "keywords",
        "category",
        "tags",
        "location"
    ]
})

export function searchWebsite(query:string){

    return fuse.search(query)
}