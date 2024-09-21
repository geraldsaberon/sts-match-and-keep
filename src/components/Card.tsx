import { Dispatch, MutableRefObject, useEffect, useRef } from "react";
import { Character } from "../types";

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
  const cardBackRef = useRef<HTMLImageElement|null>(null)
  const cardFrontRef = useRef<HTMLImageElement|null>(null)
  const isFlipped = useRef<boolean>(false)
  const isMatched = useRef<boolean>(false)

  const faceDownMs = 500

  const faceUp = () => {
    cardBackRef.current?.classList.add("flipped")
    cardFrontRef.current?.classList.add("flipped")
    isFlipped.current = true
  }

  const faceDown = () => {
    cardBackRef.current?.classList.remove("flipped")
    cardFrontRef.current?.classList.remove("flipped")
    cardFrontRef.current?.classList.remove("matched")
    isFlipped.current = false
    isMatched.current = false
  }

  const handleClick = () => {
    if (!isFlipped.current &&
        cardsFlipped.length < 2 &&
        triesLeftRef.current > 0) {
      faceUp()
      setCardsFlipped(cardsFlipped.concat(cardName))
      if (cardsFlipped.length == 1)
        setTimeout(() => triesLeftRef.current -= 1, faceDownMs)
    }
  }

  useEffect(() => {
    if (isFlipped.current) {
      faceDown()
    }
    cardBackRef.current?.classList.remove("reset-anim")
    cardBackRef.current?.classList.add("reset-anim")
  }, [character, asc15, restart])

  useEffect(() => {
    if (cardsFlipped.length == 2) {
      if (cardsFlipped[0] === cardsFlipped[1]) {
        if (isFlipped.current && cardName === cardsFlipped[0]) {
          isMatched.current = true
          setTimeout(() => {
            cardFrontRef.current?.classList.replace("flipped", "matched")
            setCardsFlipped([])
          }, faceDownMs)
        }
      } else {
        if (!isMatched.current) {
          setTimeout(() => {
            faceDown()
            setCardsFlipped([])
          }, faceDownMs)
        }
      }
    }
  }, [cardsFlipped, setCardsFlipped, cardName])

  return (
    <div
      className="card text-xs"
      onClick={ handleClick }
    >
      <img
        src="/assets/cardback.png"
        alt="Card Back"
        width={ 128 }
        className="card card-back w-full"
        ref={ cardBackRef }
      />
      <img
        src={ `/assets/${cardName}` }
        alt={ cardName }
        width={ 128 }
        className="card card-front w-full"
        ref={ cardFrontRef }
      />
    </div>
  )
}

export default Card;
