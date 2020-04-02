import { Course } from "./course.js";

import { dataCourses } from "./dataCourses.js";
import { Student } from "./student.js";

import { dataStudent } from "./dataStudent.js";

let coursesTbody: HTMLElement = document.getElementById("courses")!;
let estudianteTbody: HTMLElement = document.getElementById("student")!;
let estudianteTName: HTMLElement = document.getElementById("stuName")!;
const btnfilterByName: HTMLElement = document.getElementById(
	"button-filterByName"
)!;
const btnfilterByRange: HTMLElement = document.getElementById(
	"button-filterByRange"
)!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>(
	document.getElementById("search-box")!
);
const inputRangeBox: HTMLInputElement = <HTMLInputElement>(
	document.getElementById("range-box")!
);
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByRange.onclick = () => applyFilterByRange();
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
renderName(dataStudent);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`;

function renderCoursesInTable(courses: Course[]): void {
	console.log("Desplegando cursos");
	courses.forEach(course => {
		let trElement = document.createElement("tr");
		trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
		coursesTbody.appendChild(trElement);
	});
}
function renderName(dataStudent: Student): void {
	console.log("desplegando el nombre papu :3");
	let name = dataStudent.name;
	let trElement = document.createElement("h1");
	trElement.innerHTML = `<h1>${name}</h1> `;
	estudianteTName.appendChild(trElement);
}
function renderStudentInTable(dataStudent: Student): void {
	console.log("Desplegando informacion estudiante");
	let atributosStudent: [string, string | number][] = [];
	atributosStudent.push(["Codigo: ", dataStudent.code]);
	atributosStudent.push(["Cedula: ", dataStudent.id]);
	atributosStudent.push(["Edad: ", dataStudent.age]);
	atributosStudent.push(["Direccion: ", dataStudent.addres]);
	atributosStudent.push(["Telefono: ", dataStudent.number]);
	atributosStudent.forEach(atributosStudent => {
		let trElement = document.createElement("tr");
		trElement.innerHTML = `<td>${atributosStudent[0]}</td> 
							 <td>${atributosStudent[1]}</td>`; // [0] nombre atributo, [1] valor atributo
		estudianteTbody.appendChild(trElement);
	});
}

const applyFilterByName = () => {
	let text = inputSearchBox.value;
	text = text == null ? "" : text;
	clearCoursesInTable();
	let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
	renderCoursesInTable(coursesFiltered);
};

const searchCourseByName = (nameKey: string, courses: Course[]) => {
	return nameKey === ""
		? dataCourses
		: courses.filter(c => c.name.match(nameKey));
};

const applyFilterByRange = () => {
	let text = inputRangeBox.value;
	text = text == "" ? "0,99" : text;
	clearCoursesInTable();
	let r1 = text.split(",")[0];
	let r2 = text.split(",")[1];
	let coursesFiltered: Course[] = searchCourseByCreditRange(r1, r2, dataCourses);
	renderCoursesInTable(coursesFiltered);
};

function searchCourseByCreditRange(r1: string, r2: string, courses: Course[]) {
	return r1 === "" && r2 === ""
		? dataCourses
		: courses.filter(c => c.credits >= Number(r1) && c.credits <= Number(r2));
}

function getTotalCredits(courses: Course[]): number {
	let totalCredits: number = 0;
	courses.forEach(course => (totalCredits = totalCredits + course.credits));
	return totalCredits;
}

function clearCoursesInTable() {
	while (coursesTbody.hasChildNodes()) {
		if (coursesTbody.firstChild != null) {
			coursesTbody.removeChild(coursesTbody.firstChild);
		}
	}
}
