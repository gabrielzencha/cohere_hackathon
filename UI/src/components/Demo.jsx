import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import axios from 'axios'
const Demo = () => {
  const [input_text, set_text] = useState('')
  
  const [summary, setSummary] = useState('')
  // RTK lazy query
  const [isFetching, setIsFetching] = useState(false);
  const [isDefining, setIsDefining] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState('')
  // Load data from localStorage on mount
  const [textValue, setTextValue] = useState('');
  const [skipped, setSkipped] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [definitions, setDefinition] = useState('')
  const [another_definition, setAnotherDefinition] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    const params = {'prompt': input_text}
    axios.get('http://127.0.0.1:5000/summarize', { params})
    .then(response => {
      setIsFetching(false);
      setSummary(response.data['response'])
      console.log(summary)
      // Do something with the response data
    })
    .catch(error => {
      
      setIsFetching(false);
      // Handle any errors
    });
    
  };

 

  const handleKeyDown = (e) => {
    
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };
  
  const handleGenerate = (event) => {
    event.preventDefault();
    setIsGenerating(true);
    const params = {'text': input_text,}
    axios.get('http://127.0.0.1:5000/gen_questions', { params})
    .then(response => {
      
      setQuestions(response.data['response'].split(/\d+\./).slice(1).map(q => q.trim()))
      console.log(response.data['response']);

    })
    .catch(error => {
      // Handle any errors
    }).
    finally(()=>{
      setIsGenerating(false);
    });

  }

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSkipClick = () => {
    // Handle Skip button click
    setSkipped(true);
  };

  const handleDefineClick = (e) => {
    e.preventDefault();
    setIsDefining(true);
    const params = {'text': input_text,'words':textValue}
    axios.get('http://127.0.0.1:5000/define_words', { params})
    .then(response => {
      
      setDefinition(response.data['response'])
      console.log(response.data['response']);

    })
    .catch(error => {
      // Handle any errors
    }).
    finally(()=>{
      setIsDefining(false);
      handleLanguage();
    });

    
  };
  const handleLanguage = () =>{
    setIsDefining(true);
    
    const params = {'words': textValue,'language':String(selectedOption)}
    axios.get('http://127.0.0.1:5000/define_words_language', { params})
    .then(response => {
      setAnotherDefinition(response.data['response'])
      console.log(response.data['response']);
    })
    .catch(error => {
      // Handle any errors
    }).
    finally(()=>{
      setIsDefining(false)
    });
    
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <textarea
            type='text'
            rows={7}
            placeholder='Enter text and press the enter key when done'
            value={input_text}
            onChange={(e) => set_text(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"// When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='submit_btn '
           
          >
            <p>↵</p>
          </button>
        </form>

      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) :  (<div>
          <h1 className="text-4xl font-bold text-center text-gray-800">Summary of entered text</h1>
          <h2 className='desc'>
        {summary}
      </h2>
          </div>)
        }
      </div>

      {/* Define words in other languages */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {summary ? (
          
          <form>
      <label>
        Enter words to define separated by comma ","
      </label>
        <input type="text" value={textValue} onChange={handleTextChange} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"// When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element

        />
      
      <br />
      <label>
        Select Another language:
        </label>
        <select value={selectedOption} onChange={handleOptionChange} className="block w-full py-2 px-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" >
          <option value="Swahili">Swahili</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      
      <br />
      <div className="flex">
        <button type="button" onClick={handleSkipClick} className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded-lg mr-2">Skip</button>
        <button type="button" onClick={handleDefineClick} className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded-lg mr-2">Define</button>
      </div>
    </form>
    ) :  (<div>
          </div>)
        }
      </div>
      {
        isDefining ?
          (<div> <img src={loader} alt='loader' className='w-20 h-20 object-contain' /></div>):(<div></div>)
      }
      {skipped || definitions ? (<div>
        {definitions ? (<div> 
          <h1 className="text-4xl font-bold text-center text-gray-800">Translations of words</h1>
          <h2 className='desc'>
        {another_definition}
      </h2>
      <h1 className="text-4xl font-bold text-center text-gray-800">Definitions of words</h1>
          <h2 className='desc'>
        {definitions}
      </h2>
        </div>):(<div/>)}
        <button type="button" onClick={handleGenerate} className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded-lg mr-2">Generate Questions</button>

      </div>):(<div/>)}
      {isGenerating ?(<div><img src={loader} alt='loader' className='w-20 h-20 object-contain' /></div>):
      (<div>{questions ? (<div>
    <h1 className="text-4xl font-bold text-center text-gray-800">Sample Questions</h1>
              <h2 className='desc'>
              <ul>
              {questions.map((question, index) => (
                <li key={index}>{index + 1}. {question}</li>
              ))}
            </ul>
          </h2>

      </div>):(<div/>)}</div>)}
    </section>
  );
};

export default Demo;
