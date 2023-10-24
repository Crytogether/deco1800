$(document).ready(function () {
  var data = {
    resource_id: "fd297d03-bf72-40c7-b27e-24cc7023360c",
    limit: 100
  };

  $.ajax({
    url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
    data: data,
    dataType: "jsonp",
    cache: true,
    success: function (results) {
      updatePlantDetails(results.result.records);
      
    }
  });
});


$(document).ready(function() {
    $('.plant').click(function() {
        $(this).toggleClass('flipped');
    });
});


function updatePlantDetails(records) {
  console.log(records);

  $(".plant").each(function(index) {
      var plantElement = $(this);

      if (records[index]) {
          var commonName = records[index]['Common Name'];

          plantElement.find('img').on('click', function() {
            plantElement.find('.plant-desc').text(commonName + " in " + records[index]["Climate Zones"]);

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


function displayInfo(record) {
  

  if(records.length > 0) {
      var infoContainer = $('#info-container');
      var record = records[0]; 

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
          "<img src='" + record['Image Location'] + "' alt='" + record['Common Name'] + " image' />" 
      );
      infoContainer.append(infoParagraph);
  } else {
      console.error('No records found');
  }
}

$(document).ready(function () {
  

  $("#logo").on("click", function () {
    openWaterModal();
  });

  
  function openWaterModal() {
    $("#water-consumption-modal").css('display', 'block');
  }

  $(".close-btn").on("click", function () {
    closeWaterModal();
  });


  function closeWaterModal() {
    $("#water-consumption-modal").css('display', 'none');
  }

  $(".congrats-close-btn").on("click", function () {
    $("#congratulations-modal").css('display', 'none');
  });

  $(".plant").click(function () {
    const is_back = $(this).find('.plant-img').is(":hidden");

    if (is_back) {
      $(this).css('transform', 'rotateY(-180deg)');
      $(this).find('.plant-img').show();
      $(this).find('.plant-name').show();
      $(this).find('.plant-desc').hide();
    } else {
      $(this).css('transform', 'rotateY(180deg)');
      $(this).find('.plant-img').hide();
      $(this).find('.plant-name').hide();
      $(this).find('.plant-desc').show();
    }

  });
});

var userGoal = 0;  // Variable to store the user's goal

function setWaterGoal() {
  var goalAmount = parseInt($("#goal-amount").val(), 10);
  if (!isNaN(goalAmount) && goalAmount > 0) {
    userGoal = goalAmount;  // Store the user's goal

    
    $("#goal-amount-display").text("Your goal is set to: " + userGoal + " ml");

   
    $("#goal-setting-section").css('display', 'none');
    $("#water-recording-section").css('display', 'block');
  } else {
    $("#goal-amount-display").text("Please enter a valid goal amount.");
  }
}

var cumulativeWaterConsumption = 0;

function recordWaterConsumption() {
  var waterConsumption = parseInt($("#water-amount-input").val(), 10);

  
  cumulativeWaterConsumption += waterConsumption;

 
  $("#water-amount").text("You have drank " + cumulativeWaterConsumption + " ml");

 
  if (cumulativeWaterConsumption >= userGoal) {
    $("#congrats-message").text("Congratulations! You've reached your goal of " + userGoal + " ml of water consumption.");
    $("#congratulations-modal").css('display', 'block');
  }
  // Close the congratulations modal when clicking its close button
  $("#congratulations-modal .close-btn").on("click", function () {
    $("#congratulations-modal").css('display', 'none');
  });

  const audio = document.getElementById('audioElement2');
    audio.play();
  closeWaterModal();
}




function closeWaterModal() {
  $("#water-consumption-modal").css('display', 'none');
}




$(window).on('load', function() {
    showWaterLevelDropdown();
});

function showWaterLevelDropdown() {
  const dropdown = document.getElementById("waterLevel");
  dropdown.style.display = "inline-block";
  console.log("hehrehrehrh")
  dropdown.focus(); 
}




function changeBackgroundColor(level) {
  var colorClass;

  // Hide all plants initially
  $(".plant").hide();

  switch (level) {
    case '1':
      colorClass = 'background-option-1';
    
      $(".plant:lt(3)").show().addClass(colorClass);
      break;
    case '2':
      colorClass = 'background-option-2';
   
      $(".plant:lt(6)").show().addClass(colorClass);
      break;
    case '3':
      colorClass = 'background-option-3';
  
      $(".plant:lt(9)").show().addClass(colorClass);
      break;
    case '4':
      colorClass = 'background-option-4';
     
      $(".plant:lt(12)").show().addClass(colorClass);
      break;
    default:
      colorClass = '';
     
      $(".plant").hide();
      break;
  }

  
  $(".plant").removeClass("background-option-1 background-option-2 background-option-3 background-option-4");

  // Add the background color to the displayed plants
  if (colorClass) {
    $(".plant:visible").addClass(colorClass);
  }
}


function adjustPlantsByWaterLevel(level) {
  console.log(level)
    // Hide all plants initially
    $(".plant").hide();
  
    let plantsToShow = [];
    let heightFactor = 1; // Default full height
    let explanatoryText = ""; // This will store the explanatory text for the selected water level
  
    switch (level) {
      case '1':
        plantsToShow = $(".plant:lt(3)");
        heightFactor = 0.5; // 50% height
        explanatoryText = "These plants will surive if you drink 0-600ml";
        break;
      case '2':
        plantsToShow = $(".plant:lt(6)");
        heightFactor = 0.75; // 75% height
        explanatoryText = "These plants will surive if you drink 600-900ml";
        break;
      case '3':
        plantsToShow = $(".plant:lt(9)");
        heightFactor = 1; // 100% height
        explanatoryText = "These plants will surive if you drink 900-1400ml.";
        break;
      case '4':
        plantsToShow = $(".plant:lt(12)");
        heightFactor = 1.25; // 125% height
        explanatoryText = "These plants will surive if you drink 1400-3000ml";
        break;
      default:
        plantsToShow = $();
        explanatoryText = "Invalid water level selected.";
        break;
    }
  
   
    plantsToShow.show();
  
    // Adjust the height of the plants (assuming you want to actually change their height on the page)
    plantsToShow.css("transform", `scaleY(${heightFactor})`);
  
    
    $("#waterLevelDescription").text(explanatoryText);

}
  



function closeWaterLevelModal() {
  document.getElementById('waterLevelModal').style.display = "none";
}


$(document).ready(function () {
  $(".plant").each(function () {
    $(this).data('original-height', $(this).height());
  });
});


$(document).ready(function () {
    console.log("Document ready!");
  
   
  
    $("#timeSelectorButton").click(function () {
      console.log("Button clicked!");
      console.log("Calling changeBackgroundByTime function.");
        changeBackgroundByTime();
  
     
    });
  
    // Reset hasPrompted to false when modal is closed
    $('.close').click(function() {
      hasPrompted = false;
    });
  
    $(document).click(function(event) {
        if ($(event.target).closest("#timeSelectionModal").length === 0 && 
            !$(event.target).hasClass("time-option")) {
        }
    });
  
  });
  

function changeBackgroundByTime() {
    let modal = document.getElementById('timeSelectionModal');
    let span = document.getElementsByClassName("close")[0];
  
  
    modal.style.display = "block";
  
    
    span.onclick = function () {
      modal.style.display = "none";
    }
  

    $(window).on('click', function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
      
  
    $('.time-option').on('click', function () {
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
    
      
        $("body").removeClass("gradient-morning gradient-afternoon gradient-evening gradient-night");
    
      
        $("body").addClass(gradientClass);
    
        
        $('#message').remove();
    
       
        let messageDiv = $('<div id="message"></div>').text(message);
    
        
        $('body').prepend(messageDiv);
      });
      const audio = document.getElementById('audioElement3');
    audio.play();
  closeWaterModal();
    }
  


function closeCheckModal() {
  const checkModal = document.getElementById('checkModal');
  checkModal.style.display = 'none';
}



let correctAnswersCount = 0;


function resetQuiz() {
  let plants = document.querySelectorAll(".plant");
  plants.forEach(plant => plant.style.display = "block");

  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("waterLevel").style.display = "block";

  document.getElementById("questionContainer").innerHTML = "";
  document.getElementById("optionsContainer").innerHTML = "";
}


document.addEventListener("DOMContentLoaded", function() {
    
    let buttonWithOnclick = document.querySelector("button[onclick='startQuiz()']");
    

    if (buttonWithOnclick) {
        buttonWithOnclick.addEventListener("click", startQuiz);
    }
});


function startQuiz() {
  const backgroundImage = document.querySelector('.background-image');
  backgroundImage.style.display = 'none';
  let messageBox = document.getElementById("messageBox");
  messageBox.textContent = "Please drag the plants to the correct answers.";
  let plants = document.querySelectorAll(".plant");
  plants.forEach(plant => plant.style.display = "none");
  document.getElementById("quizContainer").style.display = "block";
  document.getElementById('waterLevel').style.display = 'none';
  displayQuestion();

  const audio = document.getElementById('audioElement');
    audio.play();
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
  let dropTarget = event.target.closest('.droppable'); 
  let messageBox = document.getElementById("messageBox");

  if (draggedName === targetName) {
    messageBox.textContent = "Correct! It is " + targetName + ".";
    dropTarget.innerHTML = ""; 
    dropTarget.appendChild(draggedElement); // Append the dragged element to the target box
    draggedElement.querySelector('img').style.width = "100%"; // Make the image fit the box

    correctAnswersCount++;
    if (correctAnswersCount === 3) {
      messageBox.textContent = "Congratulations! You now understand these plants better!";
      correctAnswersCount = 0; // Reset the count for the next quiz
    }
  } else {
    messageBox.textContent = "Wrong match. Try again.";
  }
}

function resetWaterConsumption() {
   
    var confirmReset = confirm("Are you sure you want to finish the day and reset your water consumed today??");
  
    if (confirmReset) {
    
      var previousConsumption = cumulativeWaterConsumption;
      cumulativeWaterConsumption = 0;
  
      // Update the displayed goal and consumed water
      $("#goal-amount-display").text(userGoal + " ml");
      $("#water-amount").text(cumulativeWaterConsumption + " ml");
  
      // Determine the message based on whether the goal was met
      var message = "You finished the day. Your total water consumption for the day was " + previousConsumption + " ml. ";
      if (previousConsumption >= userGoal) {
        message += "Plant lives!";
        $(".plant").removeClass("dead").addClass("alive");
        explanatoryText = "Because you have achieved you drinking goals, now the plants will live!!! ";
      } else {
        message += "Plant dies.";
        $(".plant").removeClass("alive").addClass("dead");
        explanatoryText = "Because you have not achieved you drinking goals so the plant dies! Come back tomorrow and try harder in meeting your goal ";
      }
  
      
      $(".plant-message").text(message);
  
      
      alert(message);
  
      
      $("#congratulations-modal").css('display', 'none');
    }
  
     // Update the placeholder content with the explanatoryText
     $("#waterLevelDescription").text(explanatoryText);
     
     // Reset userGoal here if needed
     userGoal = 0;
     const audio = document.getElementById('audioElement4');
        audio.play();
    closeWaterModal();
  }

