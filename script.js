// Start date of 2025 disciple 90
const start = new Date(2025, 0, 20);
const listContainer = document.getElementById("list-container");
const viewdate = document.getElementById("view-date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thusday", "Friday", "Saturday"];
const ninetyDays = Array(90).fill(start.getTime()).map( (v,k) => new Date(v + (k * (60 * 60 * 24 * 1000)) ));
const results = {
	"sl" : 1, "cs" : 1, "ex" : 0,
	"pc" : 0, "tv" : 0, "al" : 0,
	"sn" : 0, "mu" : 0, "pu" : 1,
	"fa" : 0
}

function setResults(r){
	Object.entries(r).forEach( ([n,v]) => {
		const element = document.getElementById(n);
		if(v===1){
			element.classList.add("checked");
		} else {
			element.classList.remove("checked");
		}
	});
}

viewdate.value = days[start.getDay()] + " " + months[start.getMonth()] + " " + start.getDate() + ", 2025";
setResults(results);
