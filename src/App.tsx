import { useEffect, useRef, useState } from "react"
import Card from "./components/Card"
import TopBar from "./components/TopBar"
import ResetButton from "./components/ResetButton"
import { prepareCards } from "./utils"
import { Character } from "./types"
import { TRIES } from "./variables"

function App() {
  const [cardsFlipped, setCardsFlipped] = useState<string[]>([])
  const [character, setCharacter] = useState<Character>("ironclad")
  const [restart, setRestart] = useState<boolean>(false)
  const [asc15, setAsc15] = useState<boolean>(false)
  const triesLeftRef = useRef<number>(TRIES)
  const cards = useRef<string[]>([])

  useEffect(() => {
    cards.current = prepareCards(character, asc15)
    triesLeftRef.current = TRIES
    setCardsFlipped([])
    console.log("Prepared new cards for", character)
  }, [character, asc15, restart])

  const handleReset = () => {
    if (!triesLeftRef.current) {
      setRestart(x => !x)
      triesLeftRef.current = TRIES
    }
  }

  return (
    <div className="flex flex-col items-center space-y-16">
      <TopBar
        setCharacter={ setCharacter }
        asc15={ asc15 }
        setAsc15={ setAsc15 }
      />
      <div className="card-grid">
        {cards.current.map((cardName, i) => (
          <Card
            key={ `${cardName}-${i}` }
            cardName={ cardName }
            character={ character }
            asc15={ asc15 }
            cardsFlipped={ cardsFlipped }
            setCardsFlipped={ setCardsFlipped }
            triesLeftRef={ triesLeftRef }
            restart={ restart }
          />
        ))}
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="text-slate-200 text-lg text-shadow">Remaining Attempts: <span className="text-yellow-500">{ triesLeftRef.current }</span></div>
        {triesLeftRef.current === 0 &&
          <div>
            <ResetButton
              text="Again"
              handleReset={ handleReset }
            />
          </div>
        }
      </div>
    </div>
  )
}

export default App
