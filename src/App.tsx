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
  const [asc15, setAsc15] = useState<boolean>(false)
  const cards = useRef<string[]>([])
  const triesLeftRef = useRef<number>(TRIES)
  const [restart, setRestart] = useState<boolean>(false)

  useEffect(() => {
    cards.current = prepareCards(character, asc15)
    setCardsFlipped([])
    console.log("Prepared new cards for", character)
  }, [character, asc15])

  useEffect(() => {
    cards.current = prepareCards(character, asc15)
    setCardsFlipped([])
    setRestart(false)
    console.log("Restarting")
  }, [restart, character, asc15])

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
            triesLeft={ triesLeftRef }
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
              setRestart={ setRestart }
              triesLeftRef={ triesLeftRef }
            />
          </div>
        }
      </div>
    </div>
  )
}

export default App
