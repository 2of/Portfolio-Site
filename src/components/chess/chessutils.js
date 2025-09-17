
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