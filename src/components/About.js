import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useEffect } from 'react';

const About = () => {

const s1 = useContext(NoteContext);

useEffect(()=>{
    s1.update()
     // eslint-disable-next-line
}, [])

  return (
    <div>
      This is about {s1.state.name} and she is in {s1.state.class} class.
    </div>
  )
}

export default About
