import React,{useState,useEffect} from 'react'


type Props = {}

function Speech({}: Props) {
  
  const text = "Hello, my love"
  // const [synRef,setSynRef] = useState(new SpeechSynthesis);
  // useEffect(() => {
    //   setSynRef(window.speechSynthesis)
    // },[])
    const [isSpeaking,setIsSpeaking] = useState(false)
    
    const speak = () => {
      const synRef = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance("HELLO THOMAS SHELBY")
      synRef.speak(utterance)
    }
  
  return (
    <div>
      {/* <h1>{text}</h1> */}
      
      <button onClick={() => speak()}>
          Speak
        </button>
        {isSpeaking ? "Speaking" : "NOT"}

        {/* <button onClick={pause}>
          pause
        </button>
        {isPaused ? "Paused" : ""}
        <button onClick={resume}>
          resume
        </button>
        {isResumed ? "Resumed" : ""} */}
        {/* <button onClick={cancel}>
          cancel
        </button> */}
        {/* {isEnded ? "Canceled" : ""} */}
    </div>
  )
}

export default Speech