import React from "react";

const Chessboardpagefortatics = ({
  boardData,
  contentData,
  highlightSquares = [],
  tacticgHeading,
  highlightPiece = null,
  hideLineAfter = false,
}) => {
  const isHighlighted = (row, col) =>
    highlightSquares.some(([r, c]) => r === row && c === col);
  const isPieceHighlighted = (row, col) =>
    highlightPiece && highlightPiece[0] === row && highlightPiece[1] === col;

  return (
    <div className="flex flex-row h-[700px]">
      <div className="flex flex-col mb-[0px] h-[700px]">
        <p className="text-center text-[20px] mt-[30px] mb-0 font-sans font-[700] text-[#F2F2F2]">
          {tacticgHeading}
        </p>
        <div className="grid border-[2px] rounded-[0px] border-[#B6B09F] grid-cols-8 w-[353px] h-[353px] mt-2 shadow-xl m-4 hover:-translate-y-1">
          {boardData.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const highlight = isHighlighted(rowIndex, colIndex);
              const pieceHighlightStyle = isPieceHighlighted(rowIndex, colIndex)
                ? "bg-green-400"
                : "";

              const bgColor = highlight
                ? "bg-red-400"
                : isDark
                ? "bg-[#b58863]"
                : "bg-[#f0d9b5]";
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex items-center justify-center text-2xl ${bgColor} ${pieceHighlightStyle}`}
                  style={{ width: "44px", height: "44px" }}
                >
                  {cell ? (
                    <img src={cell} alt="chess piece" className="w-10 h-10" />
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        <ul className="pt-[10px] pl-[19px]">
          {contentData.map((each, index) => (
            <li
              key={index}
              className="w-[334px] text-justify font-sans text-[#F2F2F2]/90 font-[600] break-words tracking-[0.7px]"
              style={{ listStyleType: "disc", wordSpacing: "6px" }}
            >
              {each}
            </li>
          ))}
        </ul>
      </div>

      {!hideLineAfter && (
        <div className="w-[2px] ml-[29px] mt-[50px] bg-gray-300 h-[600px]"></div>
      )}
    </div>
  );
};

export default Chessboardpagefortatics;
