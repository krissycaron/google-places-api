// console.log("Javascript loading");

$(document).ready(function(){

	const apiKey = "";

$("body").on("click", "li", (e)=> {
	// console.log(e.target.innerHTML); // printing to the DOM what is clicked. 
	loadPlaces(e.target.innerHTML).then((data)=>{
		console.log(data);

	}).catch((error)=> {
		console.log(error);
	});
	//you want the event to target the html element. 
});

// loading the data from the API call 
	const loadPlaces = (dropdownType)=> {
		return new Promise ((resolve, reject)=> {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?logocation=36.165891,-86.678497&radius=50000&type=${dropdownType}&keyword=cruise&key=${apiKey}`)
		.done((data)=>resolve(data))
		.fail((error) => reject(error));
		});
	};



});




