const addGoalForm = document.getElementById('add-goal');
const courseID = document.getElementById('course-id').value;
const addAssignmentForm = document.getElementById('add-assignment');
const addNoteForm = document.getElementById('add-note');
const showGoalFormBtn = document.getElementById('show-goal-form');
const showAssignmentFormBtn = document.getElementById('show-assignment-form');
const showNoteFormBtn = document.getElementById('show-note-form');

//This creates a Course goal
const addGoal = async (event) => {
    event.preventDefault();
    const title = document.getElementById('add-goal-title').value;
    const description = document.getElementById('add-goal-description').value;
    if(title) {
        const response = await fetch(`/api/users/goals/courses/${courseID}`, {
            method: 'POST',
            body: JSON.stringify({title: title, description: description}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.reload(`/course/${courseID}`)
        } else {
            alert(response.statusText)
        }
    }
};

//This creates an assignment
const addAssignment = async (event) => {
    event.preventDefault();
    const assignmentTitle = document.getElementById('add-assignment-title').value;
    const assignmentType = document.getElementById('add-assignment-type').value;
    const assignmentDescription = document.getElementById('add-assignment-description').value;
    if(assignmentTitle) {
        const createAssignmentResponse = await fetch(`/api/courses/${courseID}/assignments/`, {
            method: 'POST',
            body: JSON.stringify({title: assignmentTitle, type: assignmentType, description: assignmentDescription}),
            headers: { 'Content-Type': 'application/json' }
        });
        if(createAssignmentResponse.ok) {
            document.location.reload(`/course/${courseID}`)
        } else {
            alert(createAssignmentResponse.statusText)
        }
    }
};

//This Creates a note
const addNote = async (event) => {
    event.preventDefault();
    const noteTitle = document.getElementById('add-note-title').value;
    const noteContent = document.getElementById('add-note-contents').value;
   if(noteTitle){
    const createNoteResponse = await fetch(`/api/users/notes/courses/${courseID}`, {
        method: 'POST',
        body: JSON.stringify({title: noteTitle, contents: noteContent}),
        headers: { 'Content-Type': 'application/json'}
    });
    if(createNoteResponse.ok) {
        document.location.reload(`/course/${courseID}`)
    } else {
        alert(createNoteResponse.statusText)
    }
   }
};

function showForm(btn, form) {
    btn.style.display = 'none';
    form.style.display = 'block';
};

function hideForm(btn, form) {
    btn.style.display = 'block';
    form.style.display = 'none';
};



document.getElementById('cancel-goal').addEventListener('click', (event) => {
    event.preventDefault();
    hideForm(showGoalFormBtn, addGoalForm)
});
document.getElementById('cancel-assignment').addEventListener('click', (event) => {
    event.preventDefault();
    hideForm(showAssignmentFormBtn, addAssignmentForm)
});
document.getElementById('cancel-note').addEventListener('click', (event) => {
    event.preventDefault();
    hideForm(showNoteFormBtn, addNoteForm)
});
showAssignmentFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showForm(showAssignmentFormBtn, addAssignmentForm)
})
showNoteFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showForm(showNoteFormBtn, addNoteForm)
})
showGoalFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showForm(showGoalFormBtn, addGoalForm)
})
addNoteForm.addEventListener('submit', addNote);
addGoalForm.addEventListener('submit', addGoal);
addAssignmentForm.addEventListener('submit', addAssignment);