$(document).ready(function() {
	var data = {
		resource_id: "fd297d03-bf72-40c7-b27e-24cc7023360c",
		limit: 100
	};

	$.ajax({
		url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp",
		cache: true,
		success: function(results) {
			updatePlantDetails(results.result.records);
			iterateRecords(results);
			displayInfo(results.result.records);  // New function to display information
		 }
	});
});

function iterateRecords(results) {
    console.log(results);

    var myMap = L.map("map").setView([-21, 148], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    var predefinedLocations = [
        [-20.551152,147.800274],
        [-27.637345,152.800598],
        [-27.628068,152.836003],
        [-22.741356,150.656204],
        [-26.751539,148.737363],
        // ... (more predefined locations)
    ];

    $.each(results.result.records, function(recordID, recordValue) {
        var locationIndex = recordID % predefinedLocations.length;

        var marker = L.marker(predefinedLocations[locationIndex]).addTo(myMap);

        var popupText = "<strong>" + recordValue["Common Name"] + " in " + recordValue["Climate Zones"] + "</strong><br>" + recordValue["Water Needs"] + recordValue["Image Location"];
        marker.bindPopup(popupText);

        // Add a click event to the marker to display information for the corresponding common name
        marker.on('click', function() {
            displayInfo(recordValue["Common Name"], results.result.records);
        });
    });
}


function updatePlantDetails(records) {
    console.log(records);

    $(".plant").each(function(index) {
        var plantElement = $(this);

        if (records[index]) {
            var commonName = records[index]['Common Name'];

            plantElement.find('img').on('click', function() {
                plantElement.find('p').text(commonName + " in " + records[index]["Climate Zones"]);
                displayInfo(commonName, records);
            });

            var detailLink = $('<a>', {
                text: 'View in details',
                href: 'random.html?id=' + records[index]['ID'],
                target: '_self'
            });

            plantElement.append(detailLink);
        }
    });
}


function displayInfo(records) {
    if(records.length > 0) {
        var infoContainer = $('#info-container');
        var record = records[0];  // Getting the first record

        var infoParagraph = $('<p></p>');
        infoParagraph.html(
            "<strong>Common Name:</strong> " + record['Common Name'] + "<br>" +
            "<strong>Climate Zones:</strong> " + record['Climate Zones'] + "<br>" +
            "<strong>Water Needs:</strong> " + record['Water Needs'] + "<br>" +
			"<strong>Soil Type:</strong> " + record['Soil Type'] + "<br>" +
			"<strong>Height Ranges:</strong> " + record['Height Ranges'] + "<br>" +
			"<strong>Spread Ranges :</strong> " + record['Spread Ranges'] + "<br>" +
			"<strong>Flower Colour:</strong> " + record['Flower colour'] + "<br>" +
			"<strong>Foliage Colour:</strong> " + record['Foliage Colour'] + "<br>" +
            "<img src='" + record['Image Location'] + "' alt='" + record['Common Name'] + " image' />" // Assuming there's an 'Image Location' field
        );
        infoContainer.append(infoParagraph);
    } else {
        console.error('No records found');
    }
}

function fetchPlantDetails(commonName) {
    // TODO: Implement the function to fetch plant details based on common name
    // Return a Promise that resolves with the detailed information
    return new Promise((resolve, reject) => {
        // Simulated data fetching (replace with actual API call or data retrieval)
        const plantDetails = {
            scientificName: 'Plant Scientific Name',
            description: 'Plant description goes here...',
            // Add more details as needed
        };

        // Resolve with the plant details
        resolve(plantDetails);
    });
}
