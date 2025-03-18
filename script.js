// Get references to DOM elements
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Load saved notes from localStorage
document.addEventListener('DOMContentLoaded', loadNotes);

// Add a new note
addNoteBtn.addEventListener('click', () => addNote());

// Function to add a new note
function addNote(content = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    
    note.innerHTML = `
        <textarea>${content}</textarea>
        <div class="note-btns">
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    notesContainer.appendChild(note);

    // Save note
    note.querySelector('.save-btn').addEventListener('click', () => saveNotes());
    // Delete note
    note.querySelector('.delete-btn').addEventListener('click', () => {
        note.remove();
        saveNotes();
    });

    // Save notes when typing (auto-save)
    note.querySelector('textarea').addEventListener('input', () => saveNotes());

    saveNotes(); // Save immediately after adding a note
}

// Function to save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note textarea').forEach(note => notes.push(note.value));
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNote(note));
}
