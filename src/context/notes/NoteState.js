// import React from "react"
import { useState } from "react";
import NoteContext from "./NoteContext";
// import { useState } from "react";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "64313df3a6cb12f80ce03c23",
          "user": "6430e2586a64676c43bdf242",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personel",
          "date": "2023-04-08T10:12:03.801Z",
          "__v": 0
        },
        {
          "_id": "64313e53a6cb12f80ce03c25",
          "user": "6430e2586a64676c43bdf242",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personel",
          "date": "2023-04-08T10:13:39.088Z",
          "__v": 0
        },
        {
          "_id": "64313e53a6cb12f80ce03c25",
          "user": "6430e2586a64676c43bdf242",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personel",
          "date": "2023-04-08T10:13:39.088Z",
          "__v": 0
        },
        {
          "_id": "64313df3a6cb12f80ce03c23",
          "user": "6430e2586a64676c43bdf242",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personel",
          "date": "2023-04-08T10:12:03.801Z",
          "__v": 0
        },
        {
          "_id": "64313e53a6cb12f80ce03c25",
          "user": "6430e2586a64676c43bdf242",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personel",
          "date": "2023-04-08T10:13:39.088Z",
          "__v": 0
        }
      ]

      const[notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;