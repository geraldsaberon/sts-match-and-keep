import { useRef, useState } from "react"
import Card from "./components/Card"
import { dupeItems, sampleCards, shuffle } from "./utils"

function App() {
  const [cardsFlipped, setCardsFlipped] = useState<string[]>([])
  const triesLeftRef = useRef<number>(Infinity)

  const cards = useRef<string[]>([])
  if (!cards.current.length) {
    cards.current = shuffle(dupeItems(sampleCards))
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      <div className="card-grid">
        {cards.current.map((cardName, i) => (
          <Card
            key={ i }
            cardName={ cardName }
            cardsFlipped={ cardsFlipped }
            setCardsFlipped={ setCardsFlipped }
            triesLeft={ triesLeftRef }
          />
        ))}
      </div>
      <div className="text-slate-200 text-lg">Remaining Attempts: <span className="text-yellow-500">{ triesLeftRef.current }</span></div>
    </div>
  )
}

export default App
