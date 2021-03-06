import React, { useState, useEffect } from 'react'
import './App.css';

const useFetch = url => {
  const [clicky, setClicky] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const clicky = await response.json()
    setClicky(clicky)
  }

  useEffect(() => { fetchData() }, [url]) // eslint-disable-line react-hooks/exhaustive-deps
  return [clicky, fetchData]
}

function App() {
  let years = new Date().getFullYear() - 2002
  const [clicky, fetchData] = useFetch('https://www.moogleapi.com/api/v1/blogs/8b9f84b7-502e-4174-bdcd-abf2624f5ffb')

  async function handleReactionUpdate (e) {
    e.preventDefault()
    fetch('https://www.moogleapi.com/api/v1/blogs/like/8b9f84b7-502e-4174-bdcd-abf2624f5ffb', {
    method: 'put'
    }).then(function(response) {
        if (response.status === 200) {
            fetchData('https://www.moogleapi.com/api/v1/blogs/8b9f84b7-502e-4174-bdcd-abf2624f5ffb')
        }
    })
  }

  if (clicky) {
    return (
      <div className="app">
        <header>
          <div className="header-container"></div>
        </header>
        <a href="https://opensea.io/collection/states-of-joi" target="_blank" rel="noreferrer"><div className="logo-container"></div></a>
        <h1>
          <a href="https://opensea.io/collection/states-of-joi" target="_blank" rel="noreferrer">States of Joi</a>
          <span className='pointer reaction' onClick={e => { handleReactionUpdate(e) }}>
            <i className="fas fa-thumbs-up"></i><small><span className='reaction-count'>{clicky[0].like}</span></small>
          </span>
        </h1>
        <hr/>
        <div className="content-container">
          <p>Joi is a character that I started about {years} years ago with the intention to bring her story to life in a cool way.</p>
          <br/>
          <p>Now I've found a way to share her story.</p>
          <br/>
          <p>I'm a software engineer and an artist. I like to stay up-to-date on technology trends and fads and dabble here and there. The more I dove into non-fungible tokens (<a href="https://en.wikipedia.org/wiki/Non-fungible_token" target="_blank" rel="noreferrer">NFTs</a>), the more curious I became. This was an opportunity to combine two of my passions: technology and art. I already had a hosted wallet (<a className="primary" href="https://www.coinbase.com" target="_blank" rel="noreferrer">Coinbase</a>) to play around with some cryptocurrencies. Next, I selected a marketplace (<a className="primary" href="https://opensea.io" target="_blank" rel="noreferrer">OpenSea</a>) and setup a software wallet (<a href="https://www.coinbase.com/wallet" target="_blank" rel="noreferrer">Coinbase Wallet</a>). Now I am minting and listing my NFTs for sale.<sup><small><i>1</i></small></sup></p>
          <br/>
          <p>Joi didn't have a name until I started this project. The concept for the character began with her not having a face. You see, Joi is from another planet and has the ability to change the appearance of her face, hair, and skin. Over her lifetime, she has taken on different states of being as her travels expose her to different emotions in different environments, even in different galaxies.</p>
          <br/>
          <p>Joi's collection is nearing an end at 333 tokens. Currently there are 327 unique tokens, and I only have 6 more in the works that are not yet minted. So, go <a href="https://opensea.io/collection/states-of-joi" target="_blank" rel="noreferrer">explore the states of Joi</a> and check back often for more!</p>
          <br/>
          <p>You can also follow the project on <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> <a href="https://twitter.com/statesofjoi" target="_blank" rel="noreferrer">@statesofjoi</a>.</p>
        </div>
        <footer>
        <p><sup><small><i>1</i></small></sup><i>This is a super brief explanation of the process I went through. If you're interested in doing something similar I suggest doing your own research; I'm no expert</i>.</p>
        <p>&copy; <a href="https://github.com/jackfperryjr" target="_blank" rel="noreferrer">@jackfperryjr</a> <a href="https://twitter.com/statesofjoi" target="_blank" rel="noreferrer">@statesofjoi</a></p>
        </footer>
      </div>
    );
  } else {
    return (
      <div className="no-state-yet">
        <span>Watching a movie...</span>
      </div>
    )
  }
  
}

export default App;
