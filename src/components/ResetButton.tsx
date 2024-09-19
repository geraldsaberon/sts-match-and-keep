import { Dispatch, MutableRefObject } from "react";
import { TRIES } from "../variables";

interface ResetButtonProps {
  text: string;
  setRestart: Dispatch<boolean>;
  triesLeftRef: MutableRefObject<number>;
}

const ResetButton = ({ text, setRestart, triesLeftRef }: ResetButtonProps) => {
  const handleClick = () => {
    if (!triesLeftRef.current) {
      triesLeftRef.current = TRIES
      setRestart(true)
    }
  }

  return (
    <button
      onClick={ handleClick }
      className="text-slate-50 px-4 py-1 bg-[#477447] rounded-lg shadow-md hover:scale-105 transition-transform"
    >
      { text }
    </button>
  )
}

export default ResetButton
