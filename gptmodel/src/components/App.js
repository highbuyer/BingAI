import React, { useState,useEffect } from 'react';
import '../App.css';
import Checkbox from '@mui/material/Checkbox';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send input text to API and get response here...
    try {
      const response = await fetch("https://api.openai.com/v1/engine/davinci-codex/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `${inputText}\nGPT:`,
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      setResponseText(data.choices[0].text);
    } catch (error) {
      console.log(error);
    }

    setInputText("");
  };

return (
   <div className="App">
     {/* Add class name to apply styles */}
     <h1 className="app-title">Chat with GPT</h1>

     {/* Input form */}
     <form onSubmit={handleSubmit}>
       {/* Add class name to style checkbox container */}
       <div className="checkbox-container">
         <label htmlFor="remember-me">
           <Checkbox id="remember-me" />
           Remember me
         </label>
       </div>

       {/* Add class name and wrapper div for stepper container */}
       <div className="stepper-wrapper">
         <Stepper activeStep={0} alternativeLabel>
           {/* Add class names to style steps and labels */}
           <Step className="step-item completed-step">
             <StepLabel>Step One</StepLabel>
           </Step>
           {/* ... more steps here ...*/}
         </Stepper>

         {/* Custom button styles applied via class name */}
       	<button type='submit' className='button-nextstep'>Next step</button>
     	</div>

     	{/* Response display */}
	   {responseText && (
	    <>
	      { /* Use CSS grid layout */ }
	      	<hr />
	       	<div className='chat-box'>
		       	<p className='user-message'><strong>You:</strong> {inputText}</p>
		       	<p className='gpt-message'><strong>GPT:</strong> {responseText}</p>
	       </div>
	     </>
	   )}

		 {/* Dialog input and send button elements  */ }
		 <div className = 'dialog-container'>

			     // Input field
			    <input
			    	type= 'text'
			    	placeholder= 'Type your message...'
			    	value= {inputText}
			    		onChange={(e) => setInputText(e.target.value)}
			      	style={{
				        padding: "10px",
				        borderRadius: "5px",
				        border: "none",
				        outline: "none",
				        width: "100%",
				        background: "#f2f2f2",
				      }}
			    />

			      // Send message button
			    <button
			    	type= 'submit'
				   	className='send-button'
			      	style={{
			        	padding: "10px 20px",
			        	borderRadius: "5px",
			        	backgroundColor: "#4CAF50",
			        	color:"#fff"
			       }}>
			        Send
			   </button>

		 </div>

     </form>
   </div>
 );
}

export default App;