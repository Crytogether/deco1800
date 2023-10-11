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

const audio = document.getElementById('myAudio');

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}


function updatePlantDetails(records) {
    console.log(records);

    $(".plant").each(function(index) {
        var plantElement = $(this);
        var detailLink = plantElement.find('a');
     

        if (records[index]) {
            var plantInfo = records[index]['Common Name'] + " in " + records[index]["Climate Zones"];
            
            // Display plant info and link on hover
            plantElement.on('mouseenter', function() {
                plantElement.find('p').text(plantInfo);
                detailLink.attr('href', 'random2.html?id=' + records[index]['ID']);
                detailLink.text('Click here to view more details');
            });

            var detailLink = $('<a>', {
                text: 'View in details',
                href: 'random.html?id=' + records[index]['ID'], // Replace with the actual link structure and unique identifier if necessary
                target: '_self' // This will open the link in the same tab
            });
            plantElement.append(detailLink);



            // Hide plant info and link on hover out
            plantElement.on('mouseleave', function() {
                plantElement.find('p').text('');

                detailLink.text('');
            });

            // Toggle the visibility on click
            plantElement.find('img').on('click', function() {
                plantElement.find('p').toggleClass('info-visible');
                detailLink.toggleClass('info-visible');
            });
        }
    });
}

