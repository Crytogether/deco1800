function iterateRecords(results) {
    console.log(results);

    // Create a table to display the data
    var table = $("<table>");
    table.append("<tr><th>Common Name</th><th>Bird Attracting</th></tr>"); // Table headers

    $.each(results.result.records, function(recordID, recordValue) {
        var birdAttracting = recordValue["Bird Attracting"]; // Adjust field name if necessary
        var commonName = recordValue["Common Name"]; // Adjust field name if necessary

        // Create a new row in the table for each record
        var row = $("<tr>");
        row.append("<td>" + commonName + "</td>");
        row.append("<td>" + birdAttracting + "</td>");
        table.append(row);
    });

    // Append the table to a div with the ID 'data-table' on your webpage
    $("#data-table").append(table);
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
