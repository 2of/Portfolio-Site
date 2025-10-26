import { Chess } from "chess.js";

export class ChessTracker {
  constructor(moves = []) {
    this.chess = new Chess();
    this.boardHistory = [this._cloneBoard(this.chess.board())];
    this.moves = [];
    if (moves.length > 0) this.setMoves(moves);
  }
 getState() {
    return JSON.stringify({ moves: this.moves });
  }

  static fromState(serialized) {
    const { moves } = JSON.parse(serialized);
    return new ChessTracker(moves);
  }
  // Deep clone the chess.js board representation
  _cloneBoard(board) {
    return board.map(row => row.map(cell => cell ? { ...cell } : null));
  }

  // Convert a board to simple letter format like sampleBoard
  _boardToLetters(board) {
    return board.map(row =>
      row.map(cell => {
        if (!cell) return null;
        // Uppercase for white, lowercase for black
        return cell.color === "w" ? cell.type.toUpperCase() : cell.type.toLowerCase();
      })
    );
  }

  _applyMove(moveStr) {
    const move = this.chess.move(moveStr, { sloppy: true });
    if (!move) {
      console.warn("Invalid move skipped:", moveStr);
      return false;
    }
    this.boardHistory.push(this._cloneBoard(this.chess.board()));
    this.moves.push(move);
    return true;
  }

  setMoves(moveStrings) {
    this.chess.reset();
    this.boardHistory = [this._cloneBoard(this.chess.board())];
    this.moves = [];
    for (let moveStr of moveStrings) {
      this._applyMove(moveStr);
    }
  }

  // Return board in "letter" format for CHESS_Board
  getStateAtMove(moveNumber) {
    if (moveNumber < 0) moveNumber = 0;
    if (moveNumber >= this.boardHistory.length) moveNumber = this.boardHistory.length - 1;
    return this._boardToLetters(this.boardHistory[moveNumber]);
  }

  get totalMoves() {
    return this.moves.length;
  }

  getDetailedMoves() {
    return this.moves.map(m => ({
      from: m.from,
      to: m.to,
      san: m.san,
      promotion: m.promotion || null,
      flags: m.flags,
      piece: m.piece,
      captured: m.captured || null,
      color: m.color,
    }));
  }
}