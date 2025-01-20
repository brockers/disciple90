// Start date of 2025 disciple 90
const start = new Date(2025, 0, 20);
// Default everything to unchecked for all days
const ninetyDays = Array(90).fill(start.getTime()).map( (v,k) => {
	return {
		"date" : new Date(v + (k * (60 * 60 * 24 * 1000)) ),
		"results" : {
			"sl" : false, "cs" : false, "ex" : false,
			"pc" : false, "tv" : false, "al" : false,
			"sn" : false, "mu" : false, "pu" : false,
			"fa" : false
		}
	}
});

const config = {
	"curIndex" : 0,
	"days" : ninetyDays
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thusday", "Friday", "Saturday"];

function setResults(c){
	Object.entries(c.days[c.curIndex].results).forEach( ([n,v]) => {
		const element = document.getElementById(n);
		if(v){
			element.classList.add("checked");
		} else {
			element.classList.remove("checked");
		}
	});
}

function getClosestToToday(c){
	const today = new Date();
	return getValidDateAndSetIndex(c, today);
}

function getValidDateAndSetIndex(conf, day){
	console.log(day);
	const timeless = new Date( (day.getTime() - (day.getTime() % 86400000)) );
	if (timeless.getTime() < conf.days[0].date.getTime()) { 
		conf.curIndex = 0;
	} else if (timeless.getTime() > conf.days[conf.days.length -1].date.getTime()) { 
		conf.curIndex = conf.days[conf.days.length -1];
	} else { 
		conf.days.forEach( (val, ind) => {
			if (val.date.getTime() === day.getTime()){ 
				conf.curIndex = ind;
			}
		});
	}
}

function setDateForm(conf){
	// console.log(dayInd);
	const viewdate = document.getElementById("view-date");
	const day = conf.days[conf.curIndex].date;
	viewdate.value = days[day.getDay()] + " " + months[day.getMonth()] + " " + day.getDate() + ", 2025";
};

const listContainer = document.getElementById("list-container");
listContainer.addEventListener("click", (e) => {
	if( config.days[config.curIndex].results.hasOwnProperty(e.target.id) ){
		config.days[config.curIndex].results[e.target.id] = config.days[config.curIndex].results[e.target.id] ? false : true;
		setResults(config);
	}
});


const flatpickr = document.getElementById("view-date").flatpickr({
	enableTime: false,
	dateFormat: "l M j, Y",
	minDate: ninetyDays[0].date,
	maxDate: ninetyDays[89].date,
	onChange: (date, dString, inst) => {
		getValidDateAndSetIndex(config, date[0]);
		setResults(config);
	},
});

const goToTodayBtn = document.getElementById("goToToday");
goToTodayBtn.addEventListener("click", (e) => {
	getClosestToToday(config);
	flatpickr.setDate(config.days[config.curIndex].date);
	// setDateForm(config);
	setResults(config);
});

setDateForm(config);
setResults(config);

