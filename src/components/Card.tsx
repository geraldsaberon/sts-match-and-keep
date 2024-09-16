import { Dispatch, MutableRefObject, useEffect, useRef } from "react";

interface CardProps {
  cardName: string;
  cardsFlipped: string[];
  setCardsFlipped: Dispatch<string[]>;
  triesLeft: MutableRefObject<number>
}

const Card = ({ cardName, cardsFlipped, setCardsFlipped, triesLeft }: CardProps) => {
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
    isFlipped.current = false
  }

  const handleClick = () => {
    if (!isFlipped.current &&
        cardsFlipped.length < 2 &&
        triesLeft.current > 0) {
      faceUp()
      setCardsFlipped(cardsFlipped.concat(cardName))
      if (cardsFlipped.length == 1) triesLeft.current -= 1
    }

  }

  useEffect(() => {
    if (cardsFlipped.length == 2) {
      if (cardsFlipped[0] === cardsFlipped[1]) {
        if (cardName === cardsFlipped[0]) {
          isMatched.current = true
          setTimeout(() => {
            cardFrontRef.current?.classList.remove("flipped")
            cardFrontRef.current?.classList.add("matched")
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
  }, [cardsFlipped, setCardsFlipped, cardName, triesLeft])

  return (
    <div
      className="card"
      onClick={ handleClick }
    >
      <img
        src="/assets/cardback.png"
        className="card card-back"
        ref={ cardBackRef }
      />
      <img
        src={ `/assets/${cardName}` }
        className="card card-front"
        ref={ cardFrontRef }
      />
    </div>
  )
}

export default Card;
