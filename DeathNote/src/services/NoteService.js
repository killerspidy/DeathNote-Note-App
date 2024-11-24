import { ref, push, set, remove, update } from "firebase/database";
import { database } from "./FirebaseConfig";

const COLORS = [
  "rgba(255, 215, 0, 0.5)",   // Gold
  "rgba(255, 127, 80, 0.5)",  // Coral
  "rgba(135, 206, 235, 0.5)", // Sky Blue
  "rgba(147, 112, 219, 0.5)", // Medium Purple
  "rgba(60, 179, 113, 0.5)",  // Medium Sea Green
  "rgba(255, 99, 71, 0.5)",   // Tomato
  "rgba(0, 206, 209, 0.5)",   // Dark Turquoise
  "rgba(255, 105, 180, 0.5)", // Hot Pink
  "rgba(218, 165, 32, 0.5)",  // Goldenrod
  "rgba(100, 149, 237, 0.5)", // Cornflower Blue
  "rgba(50, 205, 50, 0.5)",   // Lime Green
  "rgba(240, 128, 128, 0.5)", // Light Coral
  "rgba(123, 104, 238, 0.5)", // Medium Slate Blue
  "rgba(32, 178, 170, 0.5)",  // Light Sea Green
  "rgba(255, 160, 122, 0.5)", // Light Salmon
  "rgba(233, 150, 122, 0.5)", // Dark Salmon
  "rgba(70, 130, 180, 0.5)",  // Steel Blue
  "rgba(245, 222, 179, 0.5)", // Wheat
  "rgba(154, 205, 50, 0.5)",  // Yellow Green
  "rgba(250, 128, 114, 0.5)", // Salmon
  "rgba(199, 21, 133, 0.5)",  // Medium Violet Red
  "rgba(189, 183, 107, 0.5)", // Dark Khaki
  "rgba(255, 69, 0, 0.5)",    // Orange Red
  "rgba(144, 238, 144, 0.5)", // Light Green
  "rgba(244, 164, 96, 0.5)",  // Sandy Brown
  "rgba(255, 20, 147, 0.5)",  // Deep Pink
  "rgba(95, 158, 160, 0.5)",  // Cadet Blue
  "rgba(240, 230, 140, 0.5)", // Khaki
  "rgba(255, 182, 193, 0.5)", // Light Pink
  "rgba(135, 206, 250, 0.5)", // Light Sky Blue
  "rgba(211, 211, 211, 0.5)", // Light Gray
  "rgba(255, 218, 185, 0.5)", // Peach Puff
  "rgba(216, 191, 216, 0.5)", // Thistle
  "rgba(173, 216, 230, 0.5)", // Light Blue
  "rgba(255, 228, 181, 0.5)", // Moccasin
  "rgba(152, 251, 152, 0.5)", // Pale Green
  "rgba(221, 160, 221, 0.5)", // Plum
  "rgba(175, 238, 238, 0.5)", // Pale Turquoise
  "rgba(238, 130, 238, 0.5)", // Violet
  "rgba(255, 239, 213, 0.5)", // Papaya Whip
  "rgba(245, 245, 220, 0.5)", // Beige
  "rgba(210, 180, 140, 0.5)", // Tan
  "rgba(255, 228, 225, 0.5)", // Misty Rose
  "rgba(173, 255, 47, 0.5)",  // Green Yellow
  "rgba(64, 224, 208, 0.5)",  // Turquoise
  "rgba(238, 232, 170, 0.5)", // Pale Goldenrod
  "rgba(244, 164, 96, 0.5)",  // Sandy Brown
  "rgba(255, 248, 220, 0.5)", // Cornsilk
  "rgba(255, 250, 240, 0.5)", // Floral White
  "rgba(248, 248, 255, 0.5)", // Ghost White
  "rgba(240, 248, 255, 0.5)", // Alice Blue
  "rgba(255, 222, 173, 0.5)", // Navajo White
  "rgba(230, 230, 250, 0.5)", // Lavender
  "rgba(250, 240, 230, 0.5)", // Linen
  "rgba(245, 255, 250, 0.5)", // Mint Cream
  "rgba(240, 255, 240, 0.5)", // Honeydew
  "rgba(255, 245, 238, 0.5)", // Seashell
  "rgba(240, 255, 255, 0.5)", // Azure
  "rgba(255, 250, 250, 0.5)", // Snow
  "rgba(255, 240, 245, 0.5)", // Lavender Blush
  "rgba(220, 220, 220, 0.5)", // Gainsboro
  "rgba(245, 245, 245, 0.5)", // White Smoke
  "rgba(250, 250, 210, 0.5)", // Light Goldenrod Yellow
  "rgba(250, 235, 215, 0.5)", // Antique White
  "rgba(255, 228, 196, 0.5)", // Bisque
  "rgba(253, 245, 230, 0.5)", // Old Lace
  "rgba(250, 250, 240, 0.5)", // Ivory
  "rgba(255, 245, 238, 0.5)", // Seashell
  "rgba(255, 239, 213, 0.5)", // Papaya Whip
  "rgba(255, 228, 225, 0.5)", // Misty Rose
  "rgba(250, 235, 215, 0.5)", // Antique White
  "rgba(255, 235, 205, 0.5)", // Blanched Almond
  "rgba(255, 222, 173, 0.5)", // Navajo White
  "rgba(250, 240, 230, 0.5)", // Linen
  "rgba(245, 222, 179, 0.5)", // Wheat
  "rgba(244, 164, 96, 0.5)",  // Sandy Brown
  "rgba(218, 165, 32, 0.5)",  // Goldenrod
  "rgba(184, 134, 11, 0.5)",  // Dark Goldenrod
  "rgba(189, 183, 107, 0.5)", // Dark Khaki
  "rgba(205, 133, 63, 0.5)",  // Peru
  "rgba(222, 184, 135, 0.5)", // Burly Wood
  "rgba(210, 105, 30, 0.5)",  // Chocolate
  "rgba(139, 69, 19, 0.5)",   // Saddle Brown
  "rgba(160, 82, 45, 0.5)",   // Sienna
  "rgba(205, 92, 92, 0.5)",   // Indian Red
  "rgba(128, 0, 0, 0.5)",     // Maroon
  "rgba(165, 42, 42, 0.5)",   // Brown
  "rgba(255, 0, 0, 0.5)",     // Red
  "rgba(139, 0, 0, 0.5)",     // Dark Red
  "rgba(220, 20, 60, 0.5)",   // Crimson
  "rgba(255, 69, 0, 0.5)",    // Orange Red
];

// Add a new note
export const addNote = (uid, noteData) => {
  const noteRef = ref(database, `Users/${uid}/Notes`);
  const newNoteRef = push(noteRef);
  
  // Assign a random color
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  const noteWithColor = { ...noteData, color: randomColor };

  return set(newNoteRef, noteWithColor);
};

// Update an existing note
export const updateNote = (uid, noteId, updatedData) => {
  const noteRef = ref(database, `Users/${uid}/Notes/${noteId}`);
  return update(noteRef, updatedData);
};

// Delete a note
export const deleteNote = (uid, noteId) => {
  const noteRef = ref(database, `Users/${uid}/Notes/${noteId}`);
  return remove(noteRef);
};
