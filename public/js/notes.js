document.addEventListener("DOMContentLoaded", function () {

    // References to the note forms, "Add Note" buttons, and "Cancel" buttons
    const noteForms = document.querySelectorAll('.note-form');
    const addNoteButtons = document.querySelectorAll('.btn.add-note-button');
    const cancelNoteButtons = document.querySelectorAll('.cancel-note');

    // Function to show a specific "Add Note" form
    function showAddNoteForm(index) {
        noteForms[index].style.display = 'block';
    }

    // Function to hide a specific "Add Note" form
    function hideAddNoteForm(index) {
        noteForms[index].style.display = 'none';
        noteForms[index].reset();
    }

    // Function to handle the form submission
    function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        
        // Get the title and contents from the form
        const title = form.querySelector('#note-title').value;
        const contents = form.querySelector('#note-contents').value;

        // Send the data to the backend
        fetch('/api/users/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, contents })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Note added:', data);
            // TODO: Update the UI with the new note
            const formIndex = Array.from(noteForms).indexOf(form);
            hideAddNoteForm(formIndex);
        })
        .catch(error => {
            console.error('Error adding note:', error.message);
        });        
    }

    // Event listeners
    addNoteButtons.forEach((button, index) => {
        button.addEventListener('click', () => showAddNoteForm(index));
    });

    cancelNoteButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            hideAddNoteForm(index);
        });
    });

    noteForms.forEach((form) => {
        form.addEventListener('submit', handleFormSubmit);
    });

});

async function fetchAndDisplayNotes() {
    try {
        const response = await fetch('/api/users/notes');
        const notes = await response.json();

        const notesList = document.createElement('ul');
        notes.forEach(note => {
            const noteItem = document.createElement('li');
            noteItem.innerHTML = `
                <h4>${note.title}</h4>
                <p>${note.contents}</p>
                <a href="/edit-note/${note.id}">Edit</a> |
                <a href="/delete-note/${note.id}">Delete</a>
            `;
            notesList.appendChild(noteItem);
        });

        const notesSection = document.getElementById('notes-section');
        notesSection.appendChild(notesList);

    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

// Call the function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayNotes);
