import React from "react"
import styled from "styled-components"
import {motion, useMotionValue} from "framer-motion"
import {findIndex} from "./findIndex"
import { useState, useEffect, useRef } from "react"

function move(array, index, targetIndex){
  const newArray = [...array]
  const item1 = array[index]
  const item2 = array[targetIndex]
  newArray[index] = item2
  newArray[targetIndex] = item1
  return newArray;
}

const initialColors = [
  'red',
  'green',
  'blue',
]

function Sortable({className}){
  const [colors, setColors] = useState(initialColors);

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later use that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef([]).current;
  const setPosition = (i, offset) => (positions[i] = offset);
  
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setColors(move(colors, i, targetIndex));
  };
  return (
    <div className={className}>
      {colors.map((color, i) => (
        <ColorBar
          key={color}
          i={i}
          color={color}
          setPosition={setPosition}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};


function ColorBar({color, setPosition, moveItem, i}){
  const [isDragging, setDragging] = useState(false);

  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return <motion.div 
    style={{
      background:color,
      color:`white`,
      textAlign:`center`,
      marginBottom:`8px`,
      padding:`16px 0`,
      borderRadius:8,
    }}
    ref={ref}
    initial={false}
    //
    whileHover={{ rotateX:`-10deg` }}
    whileTap={{ scale: 1.05, rotateX:`-10deg` }}
    //
    drag="y"
    //
    dragConstraints={{ top: 0, bottom: 0 }}
    dragElastic={1}
    //
    animate={isDragging ? onTop : flat}
    //
    onDragStart={() => setDragging(true)}
    onDrag={(e, stuff) => moveItem(i, stuff.point.y)}
    onDragEnd={() => setDragging(false)}
    //
    dragOriginY={dragOriginY}
    positionTransition={({delta}) => {
      if (isDragging) {
        // If we're dragging, we want to "undo" the items movement within the list
        // by manipulating its dragOriginY. This will keep the item under the cursor,
        // even though it's jumping around the DOM.
        dragOriginY.set(dragOriginY.get() + delta.y);
      }

      // If `positionTransition` is a function and returns `false`, it's telling
      // Motion not to animate from its old position into its new one. If we're
      // dragging, we don't want any animation to occur.
      return isDragging ? false : true;
    }}
  >
    {color}
  </motion.div>
}

const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

export default styled(Sortable)`
  position:relative;
  font-family: 'Montserrat', sans-serif;
  padding:0 10px;
  perspective:900;
  > div {
    position: relative;
    perspective:900;
    transform-style:preserve-3d;
  }
`
