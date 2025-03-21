const Square = ({ value, onClick }) => {
    const playSound = () => {
      const sound = new Audio("/sounds/click.mp3"); // Đường dẫn file âm thanh
      sound.play();
    };
  
    return (
        <button
        className="w-24 h-24 flex items-center justify-center text-4xl border-2 border-gray-600 cursor-pointer transition-all hover:bg-gray-200"
        onClick={() => { playSound(); onClick(); }}
      >
        {value}
      </button>
    );
  };
  
  export default Square;
  