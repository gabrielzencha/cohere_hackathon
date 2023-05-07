import React from "react";

import { logo } from "../assets";

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
      <div>
      <h1 className="text-4xl font-bold mb-4" >Robosherlock</h1>
    </div>
        <button
          type='button'
          onClick={() =>
            window.open("https://github.com/TidbitsJS/Summize", "_blank")
          }
          className='black_btn'
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Teaching Made Easy With<br className='max-md:hidden' />
        <span className='orange_gradient '>Cohere AI</span>
      </h1>
      <h2 className='desc'>
        Simplify your text, and prepare questions for students and personal studying using Cohere AI
      </h2>
    </header>
  );
};

export default Hero;
