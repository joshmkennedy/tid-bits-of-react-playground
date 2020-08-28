import React, {useRef, useLayoutEffect, useEffect, useState} from 'react'
import {Link} from 'gatsby'
import styled, {css} from 'styled-components'
import InvertedCarret from '../../assets/nav-inverted-carret'

function Navigation({links, className}) {
  const [activeLink, setActiveLink] = useState()
  const [activeLiRect, setActiveLiRect] = useState()
  const svgRef = useRef()
  const [activeRect, setActiveRect] = useState()
  
  const afterRef = useRef()
  const beforeRef = useRef()
    if(typeof window === 'undefined') return null

    const {href, origin} =  window.location
    const path = href.replace(origin, '')

  return (
    <nav 
    className={className}
    css={`
    position:relative;
      --bgColor:#efefef;
      width:100%;
    `}>
      <ul 
      css={`
        display:flex;
        list-style:none;
        margin:0;
        width:100%;
        padding:0;
        background-color:var(--bgColor);
        li{
          margin:0;
        }
      `} >
        <Links links={links} setActiveRect={setActiveRect} activeLink={path}/>
      </ul>
     <Sides activeRect={activeRect} beforeRef={beforeRef} afterRef={afterRef} className="sides"> <span ref={beforeRef} className="beforeActive"></span>
      <span ref={afterRef} className="afterActive"></span></Sides>
    </nav>
  )
}

const Links = ({links, activeLink, setActiveRect})=>{

useEffect(()=>{
  const activeNode = document.querySelector('[data-active="true"]')
  if(activeNode) {
   setActiveRect(activeNode.getBoundingClientRect())
  }
},[window.location])
  return <>
  {links.map(({name, link})=>{
           return activeLink === link ?
              (
                <ActiveNavLi key={link} data-active={'true'}>
                  <NavigationLink active to={link} >{name}</NavigationLink>
                  <InvertedCarret/>
                </ActiveNavLi>
              )
            
          : (
            <NavLi key={link}>
              <NavigationLink to={link} >{name}</NavigationLink>
            </NavLi>
          )
        })}
        </>
}

const NavigationLink = ({children, to, active})=>{
  return <Link to={to}  >
    {children}
  </Link>
}

const ActiveNavLi = styled.li`
  position:relative;
  padding:10px;
  background-color:var(--bgColor);
  svg{
    fill:var(--bgColor);
    width:100%;
    position:absolute;
    top:100%;
    left:0;
  }
    a {
      color:red;
    }
      

`
const NavLi = styled.li`
position:relative;
  padding:10px;
  background-color:var(--bgColor);
&:after{
  content:'';
  background-color:inherit;
 width:100%;
    position:absolute;
    top:100%;
    left:0;
    height:100%;
}
    a {
      color:inherit;
    }
`
export default styled(Navigation)`
.sides{
  
}


`
const Sides = styled.span`
height:10px;
  width:100%;
  position:absolute;
  bottom:-10px;
  overflow:hidden;
  .afterActive, .beforeActive{
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  display:block;
  background-color:var(--bgColor);
  
}
${({activeRect, beforeRef, afterRef})=>afterRef.current && css`
  
  .beforeActive{
    transform:translateX(${beforeRef.current.getBoundingClientRect().x - activeRect.x  }px);
  }
  .afterActive{
    transform:translateX(${
      ()=>{
        const afterRec = afterRef.current.getBoundingClientRect()
        return (afterRec.x + afterRec.width) - (activeRect.x+ activeRect.width)
      }
      }px);
  }
  `}
`