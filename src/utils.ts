import {
  blueCards,
  colorlessUncommons,
  curses,
  greenCards,
  purpleCards,
  redCards
} from "./cards";
import { Character } from "./types";

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function pickRandomItem<Type>(array: Type[]): Type {
  return array[randInt(0, array.length-1)]
}

export function prepareCards(character: Character, asc15: boolean = false) {
  const cards: string[] = []

  const cardPool =
    character === "ironclad" ? redCards :
    character === "silent" ? greenCards :
    character === "defect" ? blueCards :
    purpleCards

  cards.push(
    pickRandomItem(cardPool.basics),
    pickRandomItem(cardPool.commons),
    pickRandomItem(cardPool.uncommons),
    pickRandomItem(cardPool.rares),
  )

  if (asc15) cards.push(pickRandomItem(curses), pickRandomItem(curses))
  else       cards.push(pickRandomItem(curses), pickRandomItem(colorlessUncommons))

  return shuffle(cards.concat(...cards))
}
