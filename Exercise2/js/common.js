$(document).ready(function() {
    // Initialize cumulativeWaterConsumption from localStorage
    var cumulativeWaterConsumption = parseInt(localStorage.getItem('cumulativeWaterConsumption')) || 0;

    // Function to update the water consumption display and apply the light-up effect
    function lightUpWaterConsumption() {
        var waterDisplay = $("#water-amount");
        waterDisplay.text(`${cumulativeWaterConsumption} ml`);
        waterDisplay.addClass('light-up');
        setTimeout(function() {
            waterDisplay.removeClass('light-up');
        }, 1000); // Remove the light-up effect after 1 second
    }

    $("#logo").on("click", function() {
        var waterConsumption = prompt("Please enter water consumption in ml:");
        
        if (waterConsumption) {
            cumulativeWaterConsumption += parseInt(waterConsumption, 10);

            if (cumulativeWaterConsumption >= 3500) {
                cumulativeWaterConsumption = 0; // Reset the accumulation
            }

            localStorage.setItem('cumulativeWaterConsumption', cumulativeWaterConsumption);

            var treesWatered = Math.floor(cumulativeWaterConsumption / 250);
            var message = "Congratulations! You have saved " + cumulativeWaterConsumption + " ml of water.";
            $("#congrats-message").text(message);

            // Set the image in the modal
            $("#congrats-image").attr('src', 'path/to/your/image.jpg');

            // Display the modal
            $("#congratulations-modal").css('display', 'block');

            // Close the modal after 5 seconds (5000 milliseconds)
            setTimeout(function() {
                $("#congratulations-modal").css('display', 'none');
            }, 5000);

            $(".plant").each(function(index) {
                if (index < treesWatered) {
                    $(this).addClass('light-up');
                } else {
                    $(this).removeClass('light-up');
                }
            });

            // Light up the water consumption display
            lightUpWaterConsumption();

            // Clear the message after a few seconds (optional)
            setTimeout(function() {
                $("#message").text("");
                $("#overlay").removeClass('active'); // Hide the overlay
            }, 5000);
        }
    });

    $(".close-btn").on("click", function() {
        $("#congratulations-modal").css('display', 'none');
    });
});

let waterAmount = 0; // Initial water amount

function drinkWater(amount) {
    waterAmount += amount;
    updateWaterDisplay();
}

function updateWaterDisplay() {
    const waterDisplay = document.getElementById('water-amount');
    waterDisplay.textContent = `${waterAmount} ml`;
}

function promptForWater() {
    const userInput = prompt("Enter the amount of water you drank (in ml):");
    if (userInput !== null) {
        const amount = parseInt(userInput);
        if (!isNaN(amount) && amount > 0) {
            drinkWater(amount);
        } else {
            alert("Please enter a valid amount of water.");
        }
    }
}
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



