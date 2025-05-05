const students = [];

const ulStudents = document.getElementById("lista-notas");
const form = document.getElementById("studentForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if( name.length < 3 || name.length > 30 ||
        lastName.length < 3 || lastName.length > 30 ||
        grade < 1.0 || grade > 7.0
    ) return alert("Error, Datos Incorrectos.");

    const student = {name, lastName, grade};
    students.push(student);

    // const registro = document.createElement("li");
    // const contenidoRegistro = document.createTextNode(`Nombre: ${name}, Apellido: ${lastName}, Nota: ${grade}`);
    // registro.appendChild(contenidoRegistro);

    console.log(`Nombre: ${name}, Apellido: ${lastName}, Nota: ${grade}`);
})