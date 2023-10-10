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
			updatePlantDetails(results.result.records);
		 }

	});

});



function updatePlantDetails(records) {
    console.log(records);

    $(".plant").each(function(index) {
        var plantElement = $(this);

        if(records[index]) {
            plantElement.find('img').on('click', function() {
                plantElement.find('p').text(records[index]['Common Name'] + " in " + records[index]["Climate Zones"]);

                // Create a new link element
                var detailLink = $('<a>', {
                    text: 'View in details',
                    href: 'random.html?id=' + records[index]['ID'], // Replace with the actual link structure and unique identifier if necessary
                    target: '_self' // This will open the link in the same tab
                });



                // Append the link to the plantElement, you might want to change the location based on your layout
                plantElement.append(detailLink);
            });
        }
    });
}

