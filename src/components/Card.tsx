import { Dispatch, MutableRefObject, useEffect, useState } from "react";
import { Character } from "../types";
import clsx from "clsx";

interface CardProps {
  cardName: string;
  character: Character;
  asc15: boolean;
  cardsFlipped: string[];
  setCardsFlipped: Dispatch<string[]>;
  triesLeftRef: MutableRefObject<number>;
  restart: boolean;
}

const Card = ({
  cardName,
  character,
  asc15,
  cardsFlipped,
  setCardsFlipped,
  triesLeftRef,
  restart
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [isMatched, setIsMatched] = useState<boolean>(false)

  const faceDownMs = 500

  const handleClick = () => {
    if (!isFlipped &&
        cardsFlipped.length < 2 &&
        triesLeftRef.current > 0)
    {
      setIsFlipped(true)
      setCardsFlipped(cardsFlipped.concat(cardName))
      if (cardsFlipped.length == 1)
        setTimeout(() => triesLeftRef.current -= 1, faceDownMs)
    }
  }

  useEffect(() => {
    setIsFlipped(false)
    setIsMatched(false)
  }, [character, asc15, restart])

  useEffect(() => {
    if (cardsFlipped.length == 2) {
      if (isFlipped &&
          cardsFlipped[0] === cardsFlipped[1] &&
          cardName === cardsFlipped[0]) 
      {
        setTimeout(() => {
          setIsMatched(true)
          setCardsFlipped([])
        }, faceDownMs)
      }

      else if (!isMatched) {
        setTimeout(() => {
          setIsFlipped(false)
          setCardsFlipped([])
        }, faceDownMs)
      }
    }
  }, [cardsFlipped, setCardsFlipped, cardName, isMatched, isFlipped])

  return (
    <div
      className="card text-xs"
      onClick={ handleClick }
    >
      <img
        src="/assets/cardback.png"
        alt="Card Back"
        width={ 128 }
        className={ clsx(
          "card card-back w-full reset-anim",
          isFlipped && "flipped",
          isMatched && "matched")
        }
      />
      <img
        src={ `/assets/${cardName}` }
        alt={ cardName }
        width={ 128 }
        className={ clsx(
          "card card-front w-full",
          isFlipped && "flipped",
          isMatched && "matched")
        }
      />
    </div>
  )
}

export default Card;
