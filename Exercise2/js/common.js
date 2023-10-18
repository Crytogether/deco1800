

let waterAmount = 0; // Initial water amount




``
function updatePlantDetails(records) {
    console.log(records);

    $(".plant").each(function(index) {
        var plantElement = $(this);

        if (records[index]) {
            var plantInfo = records[index]['Common Name'] + " in " + records[index]["Climate Zones"];

            // Display plant info on hover
            plantElement.on('mouseenter', function() {
                plantElement.find('p').text(plantInfo);
            });

            // Hide plant info on hover out
            plantElement.on('mouseleave', function() {
                plantElement.find('p').text('');
            });

            // Show a popup with plant details on click
            plantElement.find('img').on('click', function() {
                alert(plantInfo); // Change this to a customized popup/modal
            });
        }
    });
}

function showPopup(content) {
    // Display the modal and set the content
    $('#myModal').css('display', 'block');
    $('#modal-content').html(content);
}

function closePopup() {
    // Close the modal
    $('#myModal').css('display', 'none');
}

function displayInfo(record) {
    var infoContent = `
        <h2>${record['Common Name']}</h2>
        <p><strong>Climate Zones:</strong> ${record['Climate Zones']}</p>
        <p><strong>Water Needs:</strong> ${record['Water Needs']}</p>
        <p><strong>Soil Type:</strong> ${record['Soil Type']}</p>
        <p><strong>Height Ranges:</strong> ${record['Height Ranges']}</p>
        <p><strong>Spread Ranges:</strong> ${record['Spread Ranges']}</p>
        <p><strong>Flower Colour:</strong> ${record['Flower colour']}</p>
        <p><strong>Foliage Colour:</strong> ${record['Foliage Colour']}</p>

    `;
    showPopup(infoContent);
}

function updatePlantDetails(records) {
    console.log(records);

    $(".plant").each(function(index) {
        var plantElement = $(this);

        if (records[index]) {
            var plantInfo = records[index]['Common Name'] + " in " + records[index]["Climate Zones"];

            // Display plant info on hover
            plantElement.on('mouseenter', function() {
                plantElement.find('p').text(plantInfo);
            });

            // Hide plant info on hover out
            plantElement.on('mouseleave', function() {
                plantElement.find('p').text('');
            });

            // Show a popup with plant details on click
            plantElement.find('img').on('click', function() {
                displayInfo(records[index]);
            });
        }
    });
}



