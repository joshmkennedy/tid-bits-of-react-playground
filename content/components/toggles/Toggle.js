import React, { useState, useRef } from 'react'
import styled from 'styled-components'

export default function Toggle({
  htmlId,
  size = 'medium',
  label,
  isOn,
  setIsOn,
}) {
  const checkBoxId = useRef(
    htmlId || `checkbox-${Math.floor(Math.random() * 100)}`
  )
  return (
    <ToggleEl size={size}>
      <label htmlFor={checkBoxId.current}>
        <span>{label}</span>
        <input
          type="checkbox"
          name=""
          id={checkBoxId.current}
          value={isOn}
          onChange={e => {
            
            setIsOn(!isOn)
          }}
        />
        <div class="toggle">
          <div className="bg"></div>
          <div className="switch"></div>
        </div>
      </label>
    </ToggleEl>
  )
}
const ToggleEl = styled.span`
  display: inline-block;
  font-size: ${({ size }) =>
    size === 'small' ? '10px' : size === 'medium' ? '16px' : '24px'};
  box-sizing: border-box;
  & * {
    box-sizing: inherit;
  }
  input {
    width: 0;
    height: 0;

    display: none;
  }
  label {
    display: inline-flex;
    align-items: center;
  }
  .toggle {
    margin-left: 1em;
    position: relative;
    height: 2em;
    width: 3.3em;
    overflow: visible;
    border-radius: 2.5em;
    box-shadow: 0 0 0 2px #dfdfdf;
  }
  .bg {
    overflow: hidden;
    position: absolute;
    z-index: 1;
    width: 100%;
    background: transparent;
    height: 100%;
    border-radius: 2.5em;
    transition: all 0s linear 0.2s;
    &:after {
      transition: all 0.2s linear;
      transition-property: transform, opacity;
      transition-delay: 0s, 0.02s;
      content: '';
      position: absolute;
      border-radius: inherit;
      width: 103%;
      height: 103%;
      background: #efeff9;
      top: 0;
      left: 0;
      z-index: 2;
      transform-origin: 50% 50%;
      opacity: 1;
    }
  }
  .switch {
    position: absolute;
    z-index: 2;
    border-radius: 50%;
    background: white;
    width: 2em;
    height: 100%;
    box-shadow: 0.5px 1px 2px #dedede;
    right: calc(100% - 2em);
    transition: all 0.15s cubic-bezier(0.5, 1, 0.5, 1);
  }
  input:checked + .toggle {
    .switch {
      right: 0;
    }
    box-shadow: 0 0 0 2px #44da60;
    .bg {
      border: 1px solid #44da60;
      transition: none;
      background: #44da60;
      &:after {
        transition-delay: 0.05s, 0s;
        opacity: 0;
        transform: scale(0);
      }
    }
  }
`
