import React, {useState, useEffect, useRef, useMemo} from 'react'
import * as Tone from 'tone'
import styled from 'styled-components'

const KICK_WAV = '/sounds/kick.wav'
const CLAP_WAV = '/sounds/clap.wav'
const HAT_WAV = '/sounds/hat.wav'

const tracks  = ['kick', 'clap', 'hat', 'synth']





function generateSteps(){
  const steps = [];
  for (let i=0; i <16; i++){
    steps.push(0)
  }
  return steps
}
const initialSteps = tracks.map(track =>({
  name:track,
  steps:generateSteps()
}))

const trackIndex = ['c0', 'e0', 'd0']

function BeatSequencer({className, kickTrack = KICK_WAV, clapTrack = CLAP_WAV, hatTrack = HAT_WAV}) {
  const [playing, setPlaying] = useState(false)
  const [steps, setSteps] = useState(initialSteps)
  const stepIndex = useRef(0)
  
  
  const drums = useMemo(()=>{
    if(typeof window === 'undefined') return null
    return  new Tone.Sampler({
      c0: kickTrack,
      d0: hatTrack,
      e0: clapTrack,
    }).toMaster() 
  }
  ,[])
  const synth = useMemo(()=>{
    if(typeof window === 'undefined') return null
    return new Tone.PolySynth().toDestination()
  },[])
  
  
  useEffect(() => {
    if(typeof window !== 'undefined') {

      if (playing) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
    }
  }, [playing]);

  useEffect(() => {
    if(typeof window !== 'undefined'){

      Tone.Transport.cancel();
      Tone.Transport.scheduleRepeat(function (time) {
        steps.forEach((track, index) => {
          let step = track.steps[stepIndex.current];
          if (step === 1) {
            if (index === 3) {
              let chord =
              stepIndex.current < 7 ? ["c4", "d#4", "g4"] : ["a#3", "d4", "g4"];
              synth.triggerAttackRelease(chord, 0.5);
            } else {
              drums.triggerAttack(trackIndex[index]);
            }
          }
        });
        
        stepIndex.current = stepIndex.current > 14 ? 0 : stepIndex.current + 1;
      }, "18n");
    }
  }, [tracks]);

  function toggleTrack(){
    setPlaying(prev=>!prev)
  }
  function updateStep(trackIndex, stepIndex){

    setSteps((tracks)=>{
      const newTracks = [...tracks]
      
      newTracks[trackIndex].steps[stepIndex] = newTracks[trackIndex].steps[stepIndex] === 0 ? 1 : 0
      return newTracks
    })
  }
  return (
    <div className={className}>
      <button onClick={toggleTrack}>{playing?`stop`:`play`}</button>
      {
        steps.map((track, trackIndex) => <div key={track.name} className="track">
          <div className="track-name">
          {track.name}
          </div>
          <div className="row">
            {track.steps.map((step, stepIndex)=> 
              <div 
                onClick={()=>{
                  updateStep(trackIndex, stepIndex)
                }}
                key={`${track}-${stepIndex}`} 
                className="step"
                style={{background: step === 1 ? `var(--pink)` : `#efefef`}}
              >
            </div>
            )}
          </div>
        </div>)
      }
    </div>
  )
}
export default styled(BeatSequencer)`
.track{
  display: flex;
  margin-bottom:5px;
  align-items: center;
}
.track-name{
  width: 50px;
}
.row{
  width:100%;
  display:flex;
  justify-content:space-between;
  gap:5px;
}
.step{
  cursor:pointer;
  width:100%;
  height:50px;
  border-radius:8px;
  background:#efefef;
}
button{
  padding:10px 20px;
  border-radius:4px;
  text-transform: uppercase;
  letter-spacing:.5px;
  margin-bottom:10px;
}

`