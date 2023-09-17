// document.addEventListener('DOMContentLoaded', function() {
//     // Fetch progression data and update the UI
//     fetchProgressionData();

//     // Fetch reminders data and update the UI
//     fetchRemindersData();

//     // Fetch notes data and update the UI
//     fetchNotesData();
// });

// function fetchProgressionData() {
//     fetch('/api/dashboard/progression')
//     .then(response => response.json())
//     .then(data => {
//         // Update the progression section with the data
//         const progressionSection = document.getElementById('progression-section');
//         // For simplicity, let's assume 'data' is a string. Update as needed.
//         progressionSection.innerHTML += data;
//     });
// }

// function fetchRemindersData() {
//     // Similarly, fetch reminders data and update the reminders section
// }

// function fetchNotesData() {
//     // Similarly, fetch notes data and update the notes section
// }

const createCourseBtn = document.getElementById('create-course-button');
const addCourseForm = document.getElementById('add-course');
const cancelCourseFormbtn = document.getElementById('cancel-course');

const addCourse = async (event) => {
    event.preventDefault();
    const title = document.getElementById('add-course-title').value;
    if(title) {
        const response = await fetch('/api/courses', {
            method: 'POST',
            body: JSON.stringify({title}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.reload('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
};

function showAddCourseForm(event) {
    event.preventDefault();
    addCourseForm.style.display = 'block'
    createCourseBtn.style.display = 'none'
}
function hideAddCourseForm(event) {
    event.preventDefault();
    addCourseForm.style.display = 'none'
    createCourseBtn.style.display = 'block'
}

createCourseBtn.addEventListener('click', showAddCourseForm)

addCourseForm.addEventListener('submit', addCourse);

cancelCourseFormbtn.addEventListener('click', hideAddCourseForm)