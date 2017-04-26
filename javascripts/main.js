// console.log("Javascript loading");

$(document).ready(function(){

	const apiKey = "";

$("body").on("click", "li", (e)=> {
	// console.log(e.target.innerHTML); // printing to the DOM what is clicked. 
	loadPlaces(e.target.innerHTML).then((results)=>{
		console.log("data", results);
		writeNameToDom(results);
	}).catch((error)=> {
		console.log("error", error);
	});
	//you want the event to target the html element. 
});


//how do I write a click event on a dynamic thing 
$("body").on("click",".placeLink", (e) =>{
	let place_id = e.target.id;
	console.log("target id ", e.target.id);
	//call load detail function and pass in the palce_id 
	loadDetail(place_id).then((result) => {
		// console.log(results.formatted_address);
	writeAddressToDom(result.formatted_address);
	});

});

const loadDetail = (place_id) => {
	//created new promise and are passing in the resolve, reject paramiters. 
	return new Promise ((resolve, reject) => {
		$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
		.done((data)=> resolve(data.result))
		.fail((error) => reject(error));

	})
}

// loading the data from the API call 
	const loadPlaces = (dropdownType)=> {
		return new Promise ((resolve, reject)=> {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.165891,-86.678497&radius=50000&type=${dropdownType}&key=${apiKey}`)
		.done((data)=>resolve(data.results))
		.fail((error) => reject(error));
		});
	};

	//address is being passed in so no for loop is needed. 
	const writeAddressToDom = (address) => {
		let outputString = `<div>${address}</div>`
		$("#addresses").html(outputString);


	}

	const writeNameToDom = (results) => {
		//for loop s need a variable to hold the empty string that it will loop through. 
		console.log(results);
		let ouputString = "";
		for (let i=0; i < results.length; i++){
			ouputString += `<a href="#"><div class="placeLink" id="${results[i].place_id}">${results[i].name}</div></a>`;
		}
		$("#input").append(ouputString);
	}



});




