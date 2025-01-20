const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

if (!indexedDB) { console.log("IndexedDB could not be found in this browser."); }

const request = indexedDB.open("desciple90", 1);

request.onerror = function (event) {
	console.error("An error occurred with IndexedDB");
	console.error(event);
};

// Start date of 2025 disciple 90
const start = new Date(2025, 0, 20);
// Default everything to unchecked for all days
const ninetyDays = Array(90).fill(start.getTime()).map( (v,k) => {
	const newDay = new Date(v + (k * (60 * 60 * 24 * 1000)));
	return {
		"date" : newDay.getTime(),
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
	"startDate" : start.getTime(),
	"days" : ninetyDays
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sunday", "Monday", "Tueday", "Wednesday", "Thusday", "Friday", "Saturday"];

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
	const timeless = new Date( today.getFullYear(), today.getMonth(), today.getDate() );
	return getValidDateAndSetIndex(c, timeless.getTime());
}

function getValidDateAndSetIndex(conf, day){
	if (day <= conf.days[0].date) {
		conf.curIndex = 0;
		return 0;
	} else if (day >= conf.days[conf.days.length -1].date) {
		conf.curIndex = conf.days[conf.days.length -1];
		return conf.days[conf.days.length -1];
	} else {
		conf.days.forEach( (val, ind) => {
			if (val.date === day || (val.date - 3600000) === day){
				conf.curIndex = ind;
				return ind;
			}
		});
	}
}

function setTitle(conf){
	// console.log(dayInd);
	const daycount = document.getElementById("daycount");
	daycount.innerText = "Day " + (conf.curIndex + 1) + " Checklist";
};

const listContainer = document.getElementById("list-container");
listContainer.addEventListener("click", (e) => {
	if( config.days[config.curIndex].results.hasOwnProperty(e.target.id) ){
		config.days[config.curIndex].results[e.target.id] = config.days[config.curIndex].results[e.target.id] ? false : true;
		setResults(config);
	}
});


const viewdate = document.getElementById("view-date");
const flatpickr = viewdate.flatpickr({
	enableTime: false,
	dateFormat: "l M j, Y",
	minDate: ninetyDays[0].date,
	maxDate: ninetyDays[89].date,
	onChange: (date, dString, inst) => {
		getValidDateAndSetIndex(config, date[0].getTime());
		setTitle(config);
		setResults(config);
	},
});

const goToTodayBtn = document.getElementById("goToToday");
goToTodayBtn.addEventListener("click", (e) => {
	getClosestToToday(config);
	flatpickr.setDate(config.days[config.curIndex].date);
	// setDateForm(config);
	setTitle(config);
	setResults(config);
});

// Setup Initial Screen view
getClosestToToday(config);
const today = new Date(config.days[config.curIndex].date);
viewdate.value = dayNames[today.getDay()] + " " + monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
setTitle(config);
setResults(config);

