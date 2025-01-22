// db.js is required for data storage

const dataResults = config.days.map( (d) => {
	var count = 0;
	Object.entries(d.results).forEach( (n,v) => {
		if( n[1] === true ) { 
			console.log(n[0]);
			console.log(d);
			count++ 
		};	
	});
	return { date: d.date, value: count };
});
const calender = document.getElementById("cal-heatmap");
const cal = new CalHeatmap();
cal.paint({
	verticalOrientation: true,
	range: 4,
	domain: {
		type: 'month',
		padding: [10, 10, 10, 10],
		label: { position: 'top' }
	},
	subDomain: { 
		type: 'xDay', 
		radius: 2,
		width: 25,
		height: 25,
		label: 'D' 
	},
	date: {start: start},
	highlight: [ new Date() ],
	theme: 'light'
});
