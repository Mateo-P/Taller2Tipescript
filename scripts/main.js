import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudent.js";
var coursesTbody = document.getElementById("courses");
var estudianteTbody = document.getElementById("student");
var estudianteTName = document.getElementById("stuName");
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByRange = document.getElementById("button-filterByRange");
var inputSearchBox = (document.getElementById("search-box"));
var inputRangeBox = (document.getElementById("range-box"));
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
renderName(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log("Desplegando cursos");
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderName(dataStudent) {
    console.log("desplegando el nombre papu :3");
    var name = dataStudent.name;
    var trElement = document.createElement("h1");
    trElement.innerHTML = "<h1>" + name + "</h1> ";
    estudianteTName.appendChild(trElement);
}
function renderStudentInTable(dataStudent) {
    console.log("Desplegando informacion estudiante");
    var atributosStudent = [];
    atributosStudent.push(["Codigo: ", dataStudent.code]);
    atributosStudent.push(["Cedula: ", dataStudent.id]);
    atributosStudent.push(["Edad: ", dataStudent.age]);
    atributosStudent.push(["Direccion: ", dataStudent.addres]);
    atributosStudent.push(["Telefono: ", dataStudent.number]);
    atributosStudent.forEach(function (atributosStudent) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + atributosStudent[0] + "</td> \n\t\t\t\t\t\t\t <td>" + atributosStudent[1] + "</td>"; // [0] nombre atributo, [1] valor atributo
        estudianteTbody.appendChild(trElement);
    });
}
var applyFilterByName = function () {
    var text = inputSearchBox.value;
    text = text == null ? "" : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
};
var searchCourseByName = function (nameKey, courses) {
    return nameKey === ""
        ? dataCourses
        : courses.filter(function (c) { return c.name.match(nameKey); });
};
var applyFilterByRange = function () {
    var text = inputRangeBox.value;
    text = text == "" ? "0,99" : text;
    clearCoursesInTable();
    var r1 = text.split(",")[0];
    var r2 = text.split(",")[1];
    var coursesFiltered = searchCourseByCreditRange(r1, r2, dataCourses);
    renderCoursesInTable(coursesFiltered);
};
function searchCourseByCreditRange(r1, r2, courses) {
    return r1 === "" && r2 === ""
        ? dataCourses
        : courses.filter(function (c) { return c.credits >= Number(r1) && c.credits <= Number(r2); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return (totalCredits = totalCredits + course.credits); });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
