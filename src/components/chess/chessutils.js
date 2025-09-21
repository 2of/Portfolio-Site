
export function isValidPGN(pgn) {
  if (typeof pgn !== "string") return false;

  // Simple 
  // 1. PGN usually starts with [Event "..."] or other tags
  // 2. Move text should have at least one move in algebraic notation
  const tagPattern = /\[\w+\s+"[^"]*"\]/g;
  const movePattern = /([KQRNB]?[a-h]?[1-8]?x?[a-h][1-8](=[QRNB])?|O-O(-O)?)[+#]?/g;

  const tags = pgn.match(tagPattern);
  const moves = pgn.match(movePattern);

return moves !== null && moves.length > 0;

}



export function convertPGNtoFullAlgebraicNotation(pgn) { 


}
export function parsePGNtoRawMoves(pgn, asStr = false) {
  if (typeof pgn !== "string") return [];
  if (!isValidPGN(pgn)) return "invalid PGN";

  // 1. Remove PGN tags
  const noTags = pgn.replace(/\[\w+\s+"[^"]*"\]/g, "");

  // 2. Remove move numbers (e.g., "1.", "23.")
  const noMoveNumbers = noTags.replace(/\d+\.+/g, "");

  // 3. Remove game result notation like "1-0", "0-1", "1/2-1/2"
  const cleaned = noMoveNumbers.replace(/\b(1-0|0-1|1\/2-1\/2)\b/g, "");

  if (asStr) return cleaned.trim();

  // 4. Return as an array of individual moves
  const movesArray = cleaned
    .trim()
    .split(/\s+/)       // split on spaces
    .filter(m => m);    // remove empty strings

  return movesArray;
}

export const samplePGN = `[Event "Live Chess"]
[Site "Chess.com"]
[Date "2019.09.28"]
[Round "?"]
[White "MburakGinting"]
[Black "Komodo1"]
[Result "1-0"]
[ECO "A00"]
[WhiteElo "819"]
[BlackElo "724"]
[TimeControl "3600"]
[EndTime "8:26:40 PDT"]
[Termination "MburakGinting won by checkmate"]
[Link "https://www.chess.com/forum/view/general/looking-for-pgn-examples-to-teach-beginners-chess-fundamentals"]

1. Nc3 Nh6 2. b4 b6 3. Ba3 Nc6 4. g3 Ne5 5. Bg2 g6 6. Nf3 Neg4 7. h3 Nf6 8. e4
Nfg8 9. d3 Rb8 10. Rb1 Bg7 11. Qe2 e6 12. Qe3 a6 13. h4 Qe7 14. h5 d6 15. hxg6
Qf6 16. gxh7 Rxh7 17. Nd4 Kd7 18. Bh3 Rh8 19. b5 a5 20. Rb3 Bf8 21. e5 dxe5 22.
Nf3 Ra8 23. Bxf8 a4 24. Nxa4 Rxa4 25. Kd2 Ra5 26. Nxe5+ Ke8 27. Bb4 Rxb5 28. Kc3
c5 29. Kc4 Qg7 30. Kxb5 Rh7 31. Kxb6 f5 32. Bg2 Qa7+ 33. Kb5 Ba6+ 34. Ka4 Bxd3+
35. Ba5 Bxc2 36. Rc1 Rg7 37. Rxc2 Rc7 38. Bf3 Kf8 39. Be2 Ke7 40. Nc4 Qa6 41.
Ne5 Qa7 42. Bc4 Qa8 43. Rb6 Kf8 44. Qd3 Kg7 45. Bxe6 f4 46. Qc3 Nf6 47. gxf4 Qf8
48. Ra6 Qe8+ 49. Kb3 Qb5+ 50. Ka3 Rb7 51. Nd3 Kg6 52. Nxc5 Rb8 53. Bc4 Rf8 54.
Bxb5 Nf5 55. Ra7 Nd5 56. Qc4 Nfe7 57. Re2 Rxf4 58. Qxd5 Nxd5 59. Rd7 Nf6 60. Rd6
Kf7 61. Ne4 Nh7 62. f3 Kg8 63. Re3 Kg7 64. Bc7 Rh4 65. f4 Rh2 66. Rf3 Kf8 67.
Re6 Rg2 68. f5 Rc2 69. Bd6+ Kg8 70. Kb3 Nf6 71. Rxf6 Rc8 72. Rg6+ Kh8 73. f6 Kh7
74. Rg4 Rc3+ 75. Kxc3 Kh6 76. Rh3# 1-0`
