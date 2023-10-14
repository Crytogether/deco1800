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

// Open the water consumption modal on hover
$("#logo").on("mouseover", function() {
    $("#water-consumption-modal").css('display', 'block');
});

// Close the water consumption modal when clicking the close button
$(".close-btn").on("click", function() {
    $("#water-consumption-modal").css('display', 'none');
});



// Function to open the water consumption modal
function openWaterModal() {
    $("#water-consumption-modal").css('display', 'block');
}

// Function to close the water consumption modal
function closeWaterModal() {
    $("#water-consumption-modal").css('display', 'none');
}



var cumulativeWaterConsumption = 0;

function recordWaterConsumption() {
    var waterConsumption = parseInt($("#water-amount-input").val(), 10);

    // Update the cumulative water consumption
    cumulativeWaterConsumption += waterConsumption;

    // Update the water consumption display
    $("#water-amount").text(cumulativeWaterConsumption + " ml");

    // Check for consumption milestones (300, 600, 900, ...)
    var milestones = [300, 600, 900]; // Add more milestones as needed
    for (var i = 0; i < milestones.length; i++) {
        if (cumulativeWaterConsumption >= milestones[i]) {
            // Light up each plant consecutively
            setTimeout(lightUpPlant.bind(null, i + 1), (i + 1) * 1000);  // Light up plants with a delay
        }
    }

    // Check if cumulative consumption reaches 2500 ml
    if (cumulativeWaterConsumption >= 2500) {
        $("#congrats-message").text("Congratulations! You've reached 2500 ml of water consumption.");
        $("#congratulations-modal").css('display', 'block');
        cumulativeWaterConsumption = 0; // Reset the cumulative consumption
        $("#water-amount").text("0 ml"); // Reset the display to 0 ml
    }

    // Close the modal after recording
    closeWaterModal();
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
  
  
  

  function submitWaterLevel() {
    var selectedLevel = document.getElementById('waterLevel').value;
    changeBackgroundColor(selectedLevel);
  }
  
  function changeBackgroundColor(level) {
    var colorClass;
    switch (level) {
        case '1':
            colorClass = 'background-option-1';
             // Remove previous color classes from the first three plant divs
       $(".plant:lt(3)").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

       // Add the appropriate color class to the first three plant divs
       $(".plant:lt(3)").addClass(colorClass);
            break;
        case '2':
            colorClass = 'background-option-2';
             // Remove previous color classes from the first three plant divs
       $(".plant:lt(6)").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

       // Add the appropriate color class to the first three plant divs
       $(".plant:lt(6)").addClass(colorClass);
   
            break;
        case '3':
            colorClass = 'background-option-3';
            $(".plant:lt(9)").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

            // Add the appropriate color class to the first three plant divs
            $(".plant:lt(9)").addClass(colorClass);
            break;
        case '4':
            colorClass = 'background-option-4';
            $(".plant:lt(12)").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

            // Add the appropriate color class to the first three plant divs
            $(".plant:lt(12)").addClass(colorClass);
            break;
        default:
            colorClass = '';
    }

       // Remove previous color classes from the first three plant divs
       $(".plant:lt(3)").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

       // Add the appropriate color class to the first three plant divs
       $(".plant:lt(3)").addClass(colorClass);
   }

  
   function changeBackgroundByTime() {
    const timeOptions = ['12am-6am', '6am-12pm', '12pm-6pm', '6pm-12am'];
    const userInput = prompt('Select a time range:\n1. 12am-6am\n2. 6am-12pm\n3. 12pm-6pm\n4. 6pm-12am');

    if (!userInput || isNaN(userInput) || userInput < 1 || userInput > 4) {
        alert('Invalid input. Please select a valid option.');
        return;
    }

    let gradientClass;

    switch (parseInt(userInput)) {
        case 1:
            gradientClass = 'gradient-morning';
            break;
        case 2:
            gradientClass = 'gradient-afternoon';
            break;
        case 3:
            gradientClass = 'gradient-evening';
            break;
        case 4:
            gradientClass = 'gradient-night';
            break;
        default:
            break;
    }

    // Remove previous gradient classes
    $("body").removeClass("gradient-morning gradient-afternoon gradient-evening gradient-night");

    // Add the appropriate gradient class
    $("body").addClass(gradientClass);
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

let currentQuestion = 0;
let correctAnswers = 0;

function startQuiz() {
  currentQuestion = 1;
  correctAnswers = 0;
  displayQuestion(currentQuestion);
  openModal();
}

function displayQuestion(questionNumber) {
  let question, options, correctAnswer;
  
  if (questionNumber === 1) {
    question = "Which one of the below options is the capital of France?";
    options = ["A. Paris", "B. London", "C. Berlin", "D. Rome"];
    correctAnswer = "A";
  } else if (questionNumber === 2) {
    question = "Which one of the below options is the tallest mountain in the world?";
    options = ["A. Mount Everest", "B. K2", "C. Kangchenjunga", "D. Lhotse"];
    correctAnswer = "A";
  } else if (questionNumber === 3) {
    question = "Which one of the below options is a programming language?";
    options = ["A. Python", "B. Photoshop", "C. Microsoft Word", "D. Excel"];
    correctAnswer = "A";
  } else {
    closeModal();
    return;
  }

  let questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML = "<strong>Question " + questionNumber + ":</strong> " + question;

  let optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = options.map(option => "<button onclick='checkAnswer(\"" + option.charAt(0) + "\", \"" + correctAnswer + "\")'>" + option + "</button>").join('');

  let feedback = document.getElementById("feedback");
  feedback.innerHTML = "";
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
    alert("You chose the correct answer: " + selectedAnswer);
  } else {
    alert("You chose the wrong answer. The correct answer is: " + correctAnswer);
  }
}

function nextQuestion() {
  currentQuestion++;
  displayQuestion(currentQuestion);
}

function openModal() {
  document.getElementById("quizModal").style.display = "block";
}

function checkAnswer(selectedAnswer, correctAnswer) {
    let feedback = document.getElementById("feedback");
    
    if (selectedAnswer === correctAnswer) {
      correctAnswers++;
      feedback.innerHTML = `<div class="modal-message congrats">You chose the correct answer: ${selectedAnswer}</div>`;
    } else {
      feedback.innerHTML = `<div class="modal-message feedback">You chose the wrong answer. The correct answer is: ${correctAnswer}</div>`;
    }
  }
  
  function closeModal() {
    let modalContent = document.getElementById("quizModal").querySelector(".modal-content");
    modalContent.innerHTML = `
      <span class="close" onclick="document.getElementById('quizModal').style.display = 'none'">&times;</span>
      <div class="modal-message">
        ${correctAnswers === 3 ? `<p class="congrats">Congratulations! You got all questions correct (3/3). You must be an expert!</p>` : ''}
        <p>You got <span class="score">${correctAnswers}</span> out of 3 questions correct.</p>
      </div>
    `;
    document.getElementById("quizModal").style.display = "block";
  }