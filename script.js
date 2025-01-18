// Start date of 2025 disciple 90
const start = new Date(2025, 0, 20);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thusday", "Friday", "Saturday"];
// Default everything to unchecked for all days
const unchecked = Boolean(false);
const results = {
	"sl" : unchecked, "cs" : unchecked, "ex" : unchecked,
	"pc" : unchecked, "tv" : unchecked, "al" : unchecked,
	"sn" : unchecked, "mu" : unchecked, "pu" : unchecked,
	"fa" : unchecked
}
const ninetyDays = Array(90).fill(start.getTime()).map( (v,k) => {
    return {
        "date" : new Date(v + (k * (60 * 60 * 24 * 1000)) ),
        "results" : results
    }
});

const listContainer = document.getElementById("list-container");
const viewdate = document.getElementById("view-date");

function setResults(r){
	Object.entries(r).forEach( ([n,v]) => {
		const element = document.getElementById(n);
		if(v){
			element.classList.add("checked");
		} else {
			element.classList.remove("checked");
		}
	});
}

viewdate.value = days[start.getDay()] + " " + months[start.getMonth()] + " " + start.getDate() + ", 2025";

listContainer.addEventListener("click", (e) => {
    if( results.hasOwnProperty(e.target.id) ){
        results[e.target.id] = results[e.target.id] ? false : true;
        setResults(results);
    }
});

setResults(results);
