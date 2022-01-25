import React, { useState, useEffect } from 'react';
import '../styles/Cards.css';
import uniqid from 'uniqid';
import Mario from '../images/Mario.png';
import Luigi from '../images/Luigi.png';
import Yoshi from '../images/Yoshi.png';
import Birdo from '../images/Birdo.png';
import Rosalina from '../images/Rosalina.png';
import Peach from '../images/Peach.png';

export default function Cards (props) {

    const [wasClicked, setWasClicked] = useState({
        Mario: false,
        Luigi: false,
        Yoshi: false,
        Birdo: false,
        Rosalina: false,
        Peach: false
    })

    const cardInfo = [
        {source: Mario, title: 'Mario'},
        {source: Luigi, title: 'Luigi'},
        {source: Yoshi, title: 'Yoshi'},
        {source: Birdo, title: 'Birdo'},
        {source: Rosalina, title: 'Rosalina'},
        {source: Peach, title: 'Peach'},
    ]

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    const createCardArray = () => {
        // need the cards to be added randomly
        const cardInfoCopy = Array.from(cardInfo)
        const cardArray = [];
        for(let i = cardInfo.length; i > 0; i--) {
            // generate a random index value
            const index = getRndInteger(0, cardInfoCopy.length - 1);
            cardArray.push(cardInfoCopy[index]);
            cardInfoCopy.splice(index, 1);
        }
        return cardArray
    }

    const resetClickedStatus = () => {
        const clone = JSON.parse(JSON.stringify(wasClicked));
        for(let key in clone) {
            clone[key] = false
        }
        setWasClicked(clone);
    }

    const cardArray = createCardArray();

    const onCardClick = (e) => {
        let name = e.currentTarget.id
        if(wasClicked[name] === true) {
            props.updateScore('gameOver');
            // now reset clicked status for each card
            // if every card has been clicked then reset wasClicked to its initial state
            resetClickedStatus();
        }
        else if(wasClicked[name] === false) {
            // update the score
            props.updateScore('');
            // update that the card was clicked on
            const clone = JSON.parse(JSON.stringify(wasClicked));
            clone[name] = true;
            setWasClicked(clone);

        }
    }

    useEffect(() => {
        // check if every card has been clicked
        for(let key in wasClicked) {
            if(wasClicked[key] === false) {
                return
            }
        }
        // if every card has been clicked then reset wasClicked to its initial state
        resetClickedStatus();
    }, [wasClicked, resetClickedStatus])

    return (
        <div id='cards'>
          {cardArray.map((card) => {
              return <div className='card' id={card.title} key={uniqid()} onClick={onCardClick}>
                  <img src={card.source} alt={card.title} width='80%' height='80%' />
                  <p>{card.title}</p>
              </div>
          })}
        </div>
    )

}
