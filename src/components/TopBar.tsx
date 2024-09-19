import { ChangeEvent, Dispatch } from "react"
import { Character } from "../types";

interface TopBarProps {
  setCharacter: Dispatch<Character>;
  asc15: boolean;
  setAsc15: Dispatch<boolean>;
}

const TopBar = ({ setCharacter, asc15, setAsc15 }: TopBarProps) => {

  const handleCharacterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCharacter(e.target.value as Character)
    console.log("Changed character to", e.target.value)
  }

  const handleAscChange = () => setAsc15(!asc15)

  return (
    <div className="w-full bg-[#394449] text-slate-200 h-14 px-4 drop-shadow-xl flex items-center justify-between text-shadow">
      <span className="flex space-x-8">
        <span className="flex items-center space-x-4">
          <span className="text-2xl select-none hidden sm:inline">🗝️</span>
          <span className="sm:text-2xl">STS Match-and-Keep</span>
          <span className="text-slate-400 hover:text-slate-50 select-none">
            the {" "}
            <select
              defaultValue="ironclad"
              className="bg-transparent cursor-pointer text-shadow"
              onChange={ handleCharacterSelect }
            >
              <option className="bg-slate-500 border-2 border-red-500 text-shadow-none" value="ironclad">ironclad</option>
              <option className="bg-slate-500 border-2 border-red-500 text-shadow-none" value="silent">silent</option>
              <option className="bg-slate-500 border-2 border-red-500 text-shadow-none" value="defect">defect</option>
              <option className="bg-slate-500 border-2 border-red-500 text-shadow-none" value="watcher">watcher</option>
            </select>
          </span>
        </span>

        <span className="space-x-4 hidden lg:flex items-center select-none justify-self-start">
          <span className="text-red-500">❤️ 1/64</span>
          <span className="text-yellow-500">💰 32</span>
          <span className="text-2xl">🫙🧪</span>
        </span>
      </span>
      <span className="space-x-4 select-none">
        <span className="hidden sm:inline">🪜 22</span>
        <span
          className="text-yellow-500 px-2 py-1 border-2 border-yellow-500 rounded-lg hover:bg-yellow-900 transition-colors cursor-pointer"
          onClick={ handleAscChange }>🔥 { asc15 ? "15":"1"}</span>
      </span>

      <span className="space-x-1 select-none hidden sm:inline">
        <span className="text-2xl">🗺️</span>
        <span className="text-2xl">🃏</span>
        <span className="text-2xl">⚙️</span>
      </span>
    </div>
  )
}

export default TopBar
