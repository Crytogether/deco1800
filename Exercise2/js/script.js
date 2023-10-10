function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/); // This is regex: https://en.wikipedia.org/wiki/Regular_expression
	}
}

function iterateRecords(results) {

	console.log(results);

	// Setup the map as per the Leaflet instructions:
	// https://leafletjs.com/examples/quick-start/

	var myMap = L.map("map").setView([-21, 148], 4);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 18,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(myMap);

	// Iterate over each record and add a marker using the Latitude field (also containing longitude)
	var predefinedLocations = [
		[-20.551152,147.800274],
		[-27.637345,152.800598],
		[-27.628068,152.836003],
		[-22.741356,150.656204],
		[-26.751539,148.737363],
		// ... (more predefined locations)
	];
	
	$.each(results.result.records, function(recordID, recordValue) {
	
		var locationIndex = recordID % predefinedLocations.length; // Just an example criterion for assigning locations
	
		// Position the marker and add to map
		var marker = L.marker(predefinedLocations[locationIndex]).addTo(myMap);
	
		// Associate a popup with the record's information
		var popupText = "<strong>" + recordValue["Common Name"] + " in " + recordValue["Climate Zones"] + "</strong><br>" + recordValue["Water Needs"] + ". The foliage colour is "+ recordValue["Foliage Colour"]
		marker.bindPopup(popupText).openPopup();
	});	

}




$(document).ready(function() {

	var data = {
		resource_id: "fd297d03-bf72-40c7-b27e-24cc7023360c",
		limit: 100
	}

	$.ajax({
		url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp",
		cache: true,
		success: function(results) {
			iterateRecords(results);
		}
	});

});