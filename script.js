const students = [];

const spanAverage = document.getElementById("average-grade");
const tableBody = document.querySelector("#studentsTable tbody")
const form = document.getElementById("studentForm");

function formSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const date = document.getElementById("date").value.trim();

    const student = {name, lastName, grade, date};
    students.push(student);
    actualizarDisplayPromedio();

    addStudentToTable(student);
}

function calcularPromedio() {
    if (students.length === 0) return spanAverage.textContent = `No Disponible`;
    if (students.length === 1) return spanAverage.textContent = `${students[0].grade}`;
    let average = 0
    
    for (let i = 0; i < students.length; i++) {
        average += Math.floor(students[i].grade * 100) * 0.01;
    }
    average = average / students.length;
    return average.toFixed(1);
}

function actualizarDisplayPromedio() {
    spanAverage.textContent = calcularPromedio();
}

function eliminarEstudiante(student, row) {
    const index = students.indexOf(student, row);
    if(index > -1) {
        students.splice(index, 1);
        row.remove();
        actualizarDisplayPromedio();
    }
}

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = 
    `
        <td class="colDato">${student.name}</td>
        <td class="colDato">${student.lastName}</td>
        <td class="colDato">${student.grade}</td>
        <td class="colDato">${student.date}</td>
        <td>
            <button class="btn btn-danger mb-1 delete">Eliminar</button>
            <button class="btn btn-secondary mb-1 edit mx-auto">Editar</button>
        </td>
    `;
    row.querySelector(".delete").addEventListener("click", (e) => {
        eliminarEstudiante(student, row);
    });
    row.querySelector(".edit").addEventListener("click", (e) => {
        let formBtn = document.getElementById("form-btn");
        formBtn.textContent = "Editar Estudiante"
        formBtn.classList.remove("btn-primary");
        formBtn.classList.add("btn-warning");
        
        form.onsubmit = function(e) {
            e.preventDefault();

            let formBtn = document.getElementById("form-btn");
            formBtn.textContent = "Guardar Estudiante"
            formBtn.classList.remove("btn-warning");
            formBtn.classList.add("btn-primary");

            student.name = document.getElementById("name").value.trim();
            student.lastName = document.getElementById("lastName").value.trim();
            student.grade = document.getElementById("grade").value.trim();
            student.date = document.getElementById("date").value.trim();
            
            let cols = row.querySelectorAll(".colDato");
            cols[0].textContent = `${student.name}`;
            cols[1].textContent = `${student.lastName}`;
            cols[2].textContent = `${student.grade}`;
            cols[3].textContent = `${student.date}`;

            actualizarDisplayPromedio();

            form.onsubmit = formSubmit;
        }
    });
    tableBody.appendChild(row);
}

form.onsubmit = formSubmit;