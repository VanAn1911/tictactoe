const Square = ({ value, onClick }) => {
  const playSound = () => {
    const sound = new Audio("/sounds/click.mp3");
    sound.play();
  };

  return (
    // Button đại diện cho từng ô cờ
    <button
      className={`w-30 h-30 flex items-center justify-center text-5xl font-bold border-2 border-black bg-white cursor-pointer transition-all ${
        value === "X" ? "text-red-500" : value === "O" ? "text-blue-500" : ""
      }`}
      onClick={() => {
        playSound();
        onClick();
      }}
    >
      {value}
    </button>
  );
};

export default Square;
