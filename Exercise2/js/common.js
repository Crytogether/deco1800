$(document).ready(function() {
    // Initialize cumulativeWaterConsumption from localStorage
    var cumulativeWaterConsumption = parseInt(localStorage.getItem('cumulativeWaterConsumption')) || 0;

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
