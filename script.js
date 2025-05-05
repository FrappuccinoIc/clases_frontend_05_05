const students = [];

const tableBody = document.querySelector("#studentsTable tbody")
const form = document.getElementById("studentForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if( name.length < 3 || name.length > 30 ||
        lastName.length < 3 || lastName.length > 30 ||
        grade < 1.0 || grade > 7.0 || isNaN(grade)
    ) return alert("Error, Datos Incorrectos.");

    const student = {name, lastName, grade};
    students.push(student);

    addStudentToTable(student);
})

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = 
    `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade }</td>
    `;
    tableBody.appendChild(row);
}