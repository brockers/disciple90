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

function getOurDay(ndays){
  const today = new Date();
  const timeless = new Date( (today.getTime() - (today.getTime() % 86400000)) );
  if (timeless.getTime() < ndays[0].date.getTime()) { return ndays[0].date; }
  else if (timeless.getTime() > ndays[ndays.length -1].date.getTime()) { return ndays[ndays.length -1].date; }
  else { return timeless; }
}

function setDate(day){
	const viewdate = document.getElementById("view-date");
	viewdate.value = days[day.getDay()] + " " + months[day.getMonth()] + " " + day.getDate() + ", 2025";
}

const listContainer = document.getElementById("list-container");
listContainer.addEventListener("click", (e) => {
	if( results.hasOwnProperty(e.target.id) ){
		results[e.target.id] = results[e.target.id] ? false : true;
		setResults(results);
	}
});

const goToTodayBtn = document.getElementById("goToToday");
goToTodayBtn.addEventListener("click", (e) => { 
	setDate(getOurDay(ninetyDays));
});

document.querySelector("#view-date").flatpickr({
	enableTime: false,
	dateFormat: "l M j, Y",
	minDate: ninetyDays[0].date,
  maxDate: ninetyDays[89].date,
});

const testDate = new Date(2025, 4, 1);
setDate(goToToday(ninetyDays));
setResults(results);
