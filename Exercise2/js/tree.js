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

$(document).ready(function() {
    // Rest of your existing code...

    // Open the water consumption modal on click
    $("#logo").on("click", function() {
        openWaterModal();
    });

    // Function to open the water consumption modal
    function openWaterModal() {
        $("#water-consumption-modal").css('display', 'block');
    }

    // Close the water consumption modal when clicking the close button
    $(".close-btn").on("click", function() {
        closeWaterModal();
    });

    // Function to close the water consumption modal
    function closeWaterModal() {
        $("#water-consumption-modal").css('display', 'none');
    }

    $(".congrats-close-btn").on("click", function() {
        $("#congratulations-modal").css('display', 'none');
    });
});

var userGoal = 0;  // Variable to store the user's goal

function setWaterGoal() {
    var goalAmount = parseInt($("#goal-amount").val(), 10);
    if (!isNaN(goalAmount) && goalAmount > 0) {
        userGoal = goalAmount;  // Store the user's goal

        // Update the displayed goal
        $("#goal-amount-display").text("Your goal is set to: " + userGoal + " ml");

        // Hide the goal setting section and display the water consumption recording section
        $("#goal-setting-section").css('display', 'none');
        $("#water-recording-section").css('display', 'block');
    } else {
        $("#goal-amount-display").text("Please enter a valid goal amount.");
    }
}

var cumulativeWaterConsumption = 0;

function recordWaterConsumption() {
    var waterConsumption = parseInt($("#water-amount-input").val(), 10);

    // Update the cumulative water consumption
    cumulativeWaterConsumption += waterConsumption;

    // Update the water consumption display
    $("#water-amount").text(cumulativeWaterConsumption + " ml");

    // Check if cumulative consumption exceeds the goal
    if (cumulativeWaterConsumption >= userGoal) {
        $("#congrats-message").text("Congratulations! You've reached your goal of " + userGoal + " ml of water consumption.");
        $("#congratulations-modal").css('display', 'block');
    }

    // Close the modal after recording
    closeWaterModal();
}


function resetWaterConsumption() {
    // Show a confirmation dialog before resetting
    var confirmReset = confirm("Are you sure you want to finish the day and reset your water consumption?");
    
    if (confirmReset) {
        // Store the consumed water before resetting
        var previousConsumption = cumulativeWaterConsumption;

        // Update the displayed goal and consumed water
        $("#goal-amount-display").text(userGoal + " ml");
        $("#water-amount").text(cumulativeWaterConsumption + " ml");

        // Check if the user met their goal
        if (previousConsumption >= userGoal) {
            $("#plant-message").text("plants will live").addClass("plant-live-animation");
        } else {
            $("#plant-message").text("plants will die").addClass("plant-die-animation");
        }

        // Display a message with the previous day's consumption
        alert("You finished the day. Your total water consumption for the day was " + previousConsumption + " ml. ");

        // Close the congratulations modal if it's open
        $("#congratulations-modal").css('display', 'none');
    }
}










function closeWaterModal() {
    $("#water-consumption-modal").css('display', 'none');
}


function lightUpPlant(plantIndex) {
    $(".plant:nth-child(" + plantIndex + ")").addClass('light-up');
}


function addOption() {
    var selectElement = document.getElementById('mySelect');
  
    // Create a new option element
    var option = document.createElement('option');
  
    // Set option attributes
    option.value = '3';  // Set a unique value for the new option
    option.text = 'New Option';  // Set the text for the new option
  
    // Append the option to the select element
    selectElement.appendChild(option);
  }
  
  
  
  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('waterLevel');
    const button = document.getElementById('showWaterLevelButton');
    
    // If the click is outside the dropdown and not on the button, hide the dropdown
    if (event.target !== dropdown && event.target !== button) {
        dropdown.style.display = 'none';
    }
});

function showWaterLevelDropdown() {
    const dropdown = document.getElementById("waterLevel");
    dropdown.style.display = "inline-block"; 
    dropdown.focus(); // This will open the dropdown options
}



  function changeBackgroundColor(level) {
    var colorClass;

    // Hide all plants initially
    $(".plant").hide();

    switch (level) {
        case '1':
            colorClass = 'background-option-1';
            // Show the first 3 plants
            $(".plant:lt(3)").show().addClass(colorClass);
            break;
        case '2':
            colorClass = 'background-option-2';
            // Show the first 6 plants
            $(".plant:lt(6)").show().addClass(colorClass);
            break;
        case '3':
            colorClass = 'background-option-3';
            // Show the first 9 plants
            $(".plant:lt(9)").show().addClass(colorClass);
            break;
        case '4':
            colorClass = 'background-option-4';
            // Show the first 12 plants
            $(".plant:lt(12)").show().addClass(colorClass);
            break;
        default:
            colorClass = '';
            // If no valid level is provided, you can choose to show all plants or none.
            // The line below shows none. If you want to show all, replace with $(".plant").show();
            $(".plant").hide();
            break;
    }

    // Clear out any previous background color classes to ensure consistency
    $(".plant").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

    // Add the background color to the displayed plants
    if (colorClass) {
        $(".plant:visible").addClass(colorClass);
    }
}

function adjustPlantsByWaterLevel(level) {
    // Hide all plants initially
    $(".plant").hide();

    let plantsToShow = [];
    let heightFactor = 1; // Default full height

    switch (level) {
        case '1':
            plantsToShow = $(".plant:lt(3)");
            heightFactor = 0.5; // 50% height
            break;
        case '2':
            plantsToShow = $(".plant:lt(6)");
            heightFactor = 0.75; // 75% height
            break;
        case '3':
            plantsToShow = $(".plant:lt(9)");
            heightFactor = 1; // 100% height
            break;
        case '4':
            plantsToShow = $(".plant:lt(12)");
            heightFactor = 1.25; // 125% height (well-watered, so they grow taller!)
            break;
        default:
            plantsToShow = $();
            break;
    }
    

    // Display and animate the plants
    plantsToShow.show().each(function() {
        const originalHeight = $(this).data('original-height');

        // If the original height isn't set, set it now
        if (!originalHeight) {
            $(this).data('original-height', $(this).height());
        }

        $(this).animate({
            height: originalHeight * heightFactor
        }, 500); // Duration of animation is 500ms
    });
}

function showWaterLevelModal() {
    document.getElementById('waterLevelModal').style.display = "block";
}

function closeWaterLevelModal() {
    document.getElementById('waterLevelModal').style.display = "none";
}


// Call this once on page load to ensure each plant has its original height stored
$(document).ready(function() {
    $(".plant").each(function() {
        $(this).data('original-height', $(this).height());
    });
});



   $(document).ready(function() {
    console.log("Document ready!");

    let hasPrompted = false;

    $("#timeSelectorButton").hover(function() {
        console.log("Button hovered over!");
        
        if (!hasPrompted) {
            console.log("Calling changeBackgroundByTime function.");
            changeBackgroundByTime();
            hasPrompted = true;
        }
    }, function() {
        console.log("Hover ended.");
        hasPrompted = false;
    });
});


 

function changeBackgroundByTime() {
    let modal = document.getElementById('timeSelectionModal');
    let span = document.getElementsByClassName("close")[0];

    // Display the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
    
    $('.time-option').on('click', function() {
        let userInput = $(this).data('time');
        modal.style.display = "none"; // Close the modal when an option is chosen
        
        let gradientClass;
        let message;

        switch (parseInt(userInput)) {
            case 1:
                gradientClass = 'gradient-morning';
                message = 'At 12am-6am, the plants are resting and rejuvenating for the day ahead.';
                break;
            case 2:
                gradientClass = 'gradient-afternoon';
                message = 'At 6am-12pm, the plants are waking up and stretching towards the sun.';
                break;
            case 3:
                gradientClass = 'gradient-evening';
                message = 'At 12pm-6pm, the plants are basking in the midday sun and swaying with the wind.';
                break;
            case 4:
                gradientClass = 'gradient-night';
                message = 'At 6pm-12am, the plants are beginning to settle and prepare for the night.';
                break;
            default:
                break;
        }

        // Remove previous gradient classes
        $("body").removeClass("gradient-morning gradient-afternoon gradient-evening gradient-night");

        // Add the appropriate gradient class
        $("body").addClass(gradientClass);

        // Remove any existing message
        $('#message').remove();

        // Create a new message div
        let messageDiv = $('<div id="message"></div>').text(message);

        // Insert the message at the beginning of the body
        $('body').prepend(messageDiv);
    });
}





function toggleDropdown() {
    const dropdown = document.getElementById('continentDropdown');
    dropdown.classList.toggle('show');
}
function getClimateZones(continent) {
    let climateZonesText = '';

    if (continent === 'North America') {
        openCheckModal();
        return;
    }

    const climateZones = getClimateZonesByContinent(continent);

    if (climateZones && climateZones.length > 0) {
        climateZonesText = `<a href="#climateZonesInfo" onclick="displayInfo('${continent}', '${climateZones.join(', ')}')">View Climate Zones</a>`;
    } else {
        console.error('Could not determine climate zones for the selected continent.');
    }

    // Display the climate zones to the user
    displayClimateZones(continent, climateZonesText);
    toggleDropdown(); // Close the dropdown after selection
}

// Function to open the "Check" modal
function openCheckModal() {
    const checkModal = document.getElementById('checkModal');
    checkModal.style.display = 'block';
}

// Function to close the "Check" modal
function closeCheckModal() {
    const checkModal = document.getElementById('checkModal');
    checkModal.style.display = 'none';
}



let correctAnswersCount = 0;


function resetQuiz() {
    let plants = document.querySelectorAll(".plant");
    plants.forEach(plant => plant.style.display = "block");

    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("questionContainer").innerHTML = "";
    document.getElementById("optionsContainer").innerHTML = "";
}



function startQuiz() {
    let plants = document.querySelectorAll(".plant");
    plants.forEach(plant => plant.style.display = "none");
    document.getElementById("quizContainer").style.display = "block";
    displayQuestion();
}

function displayQuestion() {
    let plants = document.querySelectorAll(".plant");
    let shuffledPlants = [...plants].sort(() => 0.5 - Math.random());
    let selectedPlants = shuffledPlants.slice(0, 3);

    let questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = selectedPlants.map((plant, index) => {
        let imgSrc = plant.querySelector('img').src;
        return `<div class="draggable-plant" id="draggable-plant-${index}" draggable="true" ondragstart="drag(event)" data-common-name="${plant.getAttribute('data-common-name')}"><img src="${imgSrc}" alt="${plant.getAttribute('data-common-name')}" width="200px"></div>`;
    }).join('');
    

    let optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = selectedPlants.sort(() => 0.5 - Math.random()).map(plant => {
        return `<div class="droppable" ondrop="drop(event, '${plant.getAttribute('data-common-name')}')" ondragover="allowDrop(event)">${plant.getAttribute('data-common-name')}</div>`;
    }).join('');
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.closest('.draggable-plant').getAttribute('data-common-name'));
    event.dataTransfer.setData("element-id", event.target.closest('.draggable-plant').id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, targetName) {
    event.preventDefault();
    let draggedName = event.dataTransfer.getData("text");
    let draggedElementId = event.dataTransfer.getData("element-id");
    let draggedElement = document.getElementById(draggedElementId);
    let dropTarget = event.target.closest('.droppable'); // Ensure we're referencing the .droppable div
    let messageBox = document.getElementById("messageBox");

    if (draggedName === targetName) {
        messageBox.textContent = "Correct! It is " + targetName + ".";
        dropTarget.innerHTML = ""; // Clear the name
        dropTarget.appendChild(draggedElement); // Append the dragged element to the target box
        draggedElement.querySelector('img').style.width = "100%"; // Make the image fit the box

        correctAnswersCount++;
        if (correctAnswersCount === 3) {
            messageBox.textContent = "Congratulations! Now you understand these plants better!";
            correctAnswersCount = 0; // Reset the count for the next quiz
        }
    } else {
        messageBox.textContent = "Wrong match. Try again.";
    }
}