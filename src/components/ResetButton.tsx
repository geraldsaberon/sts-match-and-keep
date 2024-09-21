interface ResetButtonProps {
  text: string;
  handleReset: () => void;
}

const ResetButton = ({ text, handleReset }: ResetButtonProps) => {
  return (
    <button
      onClick={ handleReset }
      className="text-slate-50 px-4 py-1 bg-[#477447] rounded-lg shadow-md hover:scale-105 transition-transform"
    >
      { text }
    </button>
  )
}

export default ResetButton
