$(document).ready(function () {
    $('#movieForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        let title = $('#movieTitle').val();
        let rating = $('#movieRating').val();

        // Input Validation
        if (title.length < 2) {
            alert('Title must be at least 2 characters long.');
            return;
        }
        if (rating < 0 || rating > 10) {
            alert('Rating must be between 0 and 10.');
            return;
        }

        // Create list item and append it to the list
        let listItem = $('<li class="movie-item">')
            .text(title + ' - Rating: ' + rating)
            .append('<button class="remove-btn">Remove</button>');

        $('#movieList').append(listItem);

        // Clear the form after submission
        $('#movieTitle').val('');
        $('#movieRating').val('');
    });

    // Remove movie functionality
    $('#movieList').on('click', '.remove-btn', function () {
        $(this).parent().remove();
    });

    // Sorting Functionality
    $('#sortByTitle').click(sortByTitle);
    $('#sortByRating').click(sortByRating);

    function sortByTitle() {
        sortList('title');
    }

    function sortByRating() {
        sortList('rating');
    }

    function sortList(property) {
        let items = $('#movieList li').get();
        items.sort((a, b) => {
            let propA = $(a).text().split('-')[0].toLowerCase();
            let propB = $(b).text().split('-')[0].toLowerCase();

            if (property === 'rating') {
                propA = parseFloat(propA.split(': ')[1]);
                propB = parseFloat(propB.split(': ')[1]);
            }

            return propA < propB ? -1 : (propA > propB ? 1 : 0);
        });
        $.each(items, function (index, item) {
            $('#movieList').append(item);
        });
    }
});
