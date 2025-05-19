const students = [];

const spanAverage = document.getElementById("average-grade");
const tableBody = document.querySelector("#studentsTable tbody")
const form = document.getElementById("studentForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const date = document.getElementById("date").value.trim();

    // if( name.length < 3 || name.length > 30 ||
    //     lastName.length < 3 || lastName.length > 30 ||
    //     grade < 1.0 || grade > 7.0 || isNaN(grade)
    // ) return alert("Error, Datos Incorrectos.");

    const student = {name, lastName, grade, date};
    students.push(student);
    actualizarDisplayPromedio();

    addStudentToTable(student);
})

function calcularPromedio() {
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

// function editarEstudiante(student, row) {
//     const index = students.indexOf(student, row);
//     if(index > -1) {
//         students.splice(index, 1);
//         row.remove();
//         actualizarDisplayPromedio();
//     }
// }

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = 
    `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>
        <td>
            <button class="btn btn-danger mb-1 delete">Eliminar</button>
            <button class="btn btn-secondary mb-1 edit mx-auto">Editar</button>
        </td>
    `;
    row.querySelector(".delete").addEventListener("click", (e) => {
        eliminarEstudiante(student, row);
    })
    row.querySelector(".edit").addEventListener("click", (e) => {
        let colsEstudiante = row.querySelectorAll("td");
        for (let i = 0; i < 4; i++) {
            const col = colsEstudiante[i];
            let valor = col.textContent;
            console.log(col.textContent, typeof(col.textContent));
            console.log(valor, typeof(valor));
            if(i == 0) {
                col.innerHTML = `<input type="text" value="${valor}" minlength="3" maxlength="30" oninvalid="this.setCustomValidity('Ingrese nombre de al menos 3 carácteres.')" oninput="this.setCustomValidity('')">`
                col.addEventListener("keypress", (e) => {
                    if(e.key !== "Enter") return;
                    student.name = col.value.trim();
                    col.innerHTML = `<td>${student.name}</td>`;
                })
            } else if(i == 1) {
                col.innerHTML = `<input type="text" value="${valor}" minlength="3" maxlength="30" oninvalid="this.setCustomValidity('Ingrese apellido de al menos 3 carácteres.')" oninput="this.setCustomValidity('')">`
                col.addEventListener("keypress", (e) => {
                    if(e.key !== "Enter") return;
                    student.lastName = col.value.trim();
                    col.innerHTML = `<td>${student.lastName}</td>`;
                })
            } else if(i == 2) {
                col.innerHTML = `<input type="number" value=${parseFloat(valor)} step="0.1" min="1.0" max="7.0" placeholder="1.0" oninvalid="this.setCustomValidity('Ingrese número entre 1-7.')" oninput="this.setCustomValidity('')"">`
                col.addEventListener("keypress", (e) => {
                    if(e.key !== "Enter") return;
                    student.grade = col.value.trim();
                    actualizarDisplayPromedio();
                    col.innerHTML = `<td>${student.grade}</td>`;
                })
            } else if(i == 3) {
                col.innerHTML = `<input type="date" value="${valor}" oninvalid="this.setCustomValidity('Ingrese fecha válida.')" oninput="this.setCustomValidity('')"">`
                col.addEventListener("keypress", (e) => {
                    if(e.key !== "Enter") return;
                    student.date = col.value.trim();
                    col.innerHTML = `<td>${student.date}</td>`;
                })
            }
            // col.addEventListener("keypress", (e) => {
            //     if(e.key === "Enter") {
            //         if(i === 0) student.name = col.value;
            //         else if(i === 1) student.lastName = col.value;
            //         else if(i === 2) {
            //             student.grade = col.value;
            //             actualizarDisplayPromedio();
            //         }
            //         else student.date = col.value;
            //         col.innerHTML = `<td>${col.value}</td>`;
            //     }
            // })
        }
        // const index = students.indexOf(student, row);
        // if(index > -1) {
        //     students.splice(index, 1);
        //     row.remove();
        //     actualizarDisplayPromedio();
        // }
    })
    tableBody.appendChild(row);
}