import React, {useState, useEffect, useRef} from "react"
import styled from "styled-components"
import {motion, useMotion, useMotionValue} from 'framer-motion'
import {findIndex} from './findIndex'

function MySortable({ className, initialLetters}){
  const [letters, setLetters] = useState(initialLetters||[])
  const positions = useRef([]).current
  function setPosition(index,position){
    positions[index] = position
  }

  function moveLetter(point, index){
    const targetIndex = findIndex(index, point, positions)
    setLetters(moveArray(index, targetIndex, letters))
  }
  return <div className={className}>
    <h3>Rearrange Letters To spell Words</h3>
    <motion.ul>
      {letters.map(({letter, id}, index)=>{
        return <DraggableLetter key={id} letter={letter} index={index} setPosition={setPosition} moveLetter={moveLetter} />
      })}
    </motion.ul>
  </div>
};

export default styled(MySortable)`
  ul{
    display:flex;
    list-style:none;
    li{
      background:tan;
      display:grid;
      place-items:center;
      width:3em;
      height:4em;
      margin-right:10px;
    }
  }
`

function DraggableLetter({letter, index, moveLetter, setPosition}){
  const ref=useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragOriginX = useMotionValue(0)
  useEffect(()=>{
   setPosition(index,{
     left:ref.current.offsetLeft,
     width:ref.current.offsetWidth
   }) 
  })
  return (
  <motion.li
    drag="x"
    ref={ref}
    initial={false}
    
    dragConstraints={{left:0, right:0}}
    dragElastic={1}

    onDragStart={()=>setIsDragging(true)}
    onDrag={(e,{point})=> moveLetter(point.x, index)}
    dragOriginX={dragOriginX}
    onDragEnd={()=>setIsDragging(false)}

    positionTransition={({delta})=>{
      if(isDragging){
        dragOriginX.set(dragOriginX.get() + delta.x )
      }
      return !isDragging
    }}
    >
    {letter}
  </motion.li>
  )
}

function moveArray(currentIndex, targetIndex, array){
  const newArray = [...array]
  const item1 = array[targetIndex]
  const item2 = array[currentIndex]
  newArray[targetIndex] = item2
  newArray[currentIndex] = item1
  return newArray
}