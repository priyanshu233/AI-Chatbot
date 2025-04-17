import React, { use, useState } from 'react'
import axios from 'axios'
import { HashLoader } from 'react-spinners';
const Chatbot = () => {
  // THESE ALL ARE HOOKS
    const [inputData, setInputData] = useState("");
    const [qns, setQns] = useState("Hi");
    const [ans, setAns] = useState("Hello How can i help you !");
    const[loading,setLoading] = useState(false);
    const[qnsClass,setQnsClass] = useState("show-qns");

    // GEMINI API GENERATED FROM THEIR WEBSITE
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
    const API_KEY = "AIzaSyBOeh5JCj-46LA_qJSBudSjASw8NqK1TNc"
    const sendingData =  {
        "contents": [
          {
          "parts":[
            {"text": "Hi"}
          ]
          }
        ]
         }
   
         // FUNCTION TO FETCH THE DATA FROM API AND USE IT MEANINGFULLY
         const getData = () => {
          
          const newPayload = {
              contents: [
                  {
                      parts: [{ text: qns }]
                  }
              ]
          };
          setQnsClass("hide-qns")
          setLoading(true);
          setAns("")
          setQns("")
          axios.post(`${url}${API_KEY}`, newPayload)
              .then((res) => {
                  console.log("RES", res);
                  const reply = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
                  setAns(reply);
                  setLoading(false);
                  setQnsClass("show-qns");
              })
              .catch((err) => {
                  console.log(err);
                  setAns("Error fetching response");
                  setLoading(false);
              });
      };
      
    const handleInput = (event) =>{
      const inputValue = event.target.value;
      // setInputData(event.target.value);
      sendingData.contents[0].parts[0].text = inputValue;
      console.log(sendingData);
      setQns(inputValue);

  }
  return (
    //AIzaSyBOeh5JCj-46LA_qJSBudSjASw8NqK1TNc
    <div className='container'>
        <div className='data-container'>
            <p className={qnsClass}>{qns}</p>
            <p className='ans'>{ans}</p>
            <div className='loader'>
            <HashLoader  loading={loading}/>
            </div>
        </div>

        <div className='input-container'>
            <input type='text' placeholder='Ask with your AI friend !' onChange={handleInput}/>
            <button onClick={getData}>Submit</button>
            </div>        
    </div>
  )
}

export default Chatbot