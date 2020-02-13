var firebaseConfig = {
    apiKey: "AIzaSyAggh_9HPrLN-IokUfsrCz2bCP_4ABUd4Y",
    authDomain: "salty-beards-recipe-box.firebaseapp.com",
    databaseURL: "https://salty-beards-recipe-box.firebaseio.com",
    projectId: "salty-beards-recipe-box",
    storageBucket: "salty-beards-recipe-box.appspot.com",
    messagingSenderId: "655365438357",
    appId: "1:655365438357:web:3b219292065eb7ad0e149c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



$(document).ready(function() {

    var resultsArray = [];

    // ===================================================
    // EVENT - save recipe ( + ) button 
    // ===================================================
    $('#save-recipe-btn').on('click', function(event) {
        console.log('here is event', event);
        var title = $('#recipe-input').val();
        console.log('here is title: ' + title);

        addSuccessMessage('card-message');

    });
    

    ///test for ajax/api call
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        var trimSearchInputValue = $("#searchInput").val().trim();

        resultsArray = ajaxCallSearch( trimSearchInputValue );
        console.log('results array');
        console.log(resultsArray);
        
    });

    $("#searchBtn-below").on("click", function(event) {
        event.preventDefault();
        var searchInput = $("#searchInput").val().trim();
        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                console.log(response);
                var arrayOfMeals = response.meals;
                
                
                // TODO: iterate over all of the results
                for (let i = 0; i < arrayOfMeals.length; i++) {
                    const meal = arrayOfMeals[i];
                    console.log('meals thing: ' + i );
                    // console.log(meal.strMeal);
                    // console.log(meal.strMealThumb);
                    
                    // create card and append
                    var mealCard = createCard(meal);
                    appendCardTo('recipe-box', mealCard);
                    
                    
                }

                $('.recipe-card').on('click', function(event) {
                    console.log(this);
                    console.log(event);
                    console.log('touched');
                });
                

            });
    });


    



    // ===================================================
    // helper functions
    // ===================================================
    function createCard(meal) {
        var mealTitle = meal.strMeal;
        var mealImg = meal.strMealThumb;

        // TODO: are there some default tags we want if no tags found.
        // safety feature
        var mealTagsArray;
        if (meal.strTags != null) {
            mealTagsArray = meal.strTags.split(',');
        } else {
            mealTagsArray = ['tag1', 'tag2'];
        }

        var parentCard = $('<div>').addClass('card mx-auto');
        var cardBody = $('<div>').addClass('card-body recipe-card');
        var parentCardRow = $('<div>').addClass('row');
        parentCard.append(cardBody);
        cardBody.append(parentCardRow);

        // === left side ===
        var cardImgDiv = $('<div>').addClass('container img-box col-xs-12 col-md-3');
        var cardImg = $('<img>').attr('src', mealImg).addClass('card-img');
        cardImgDiv.append(cardImg);
        parentCardRow.append(cardImgDiv);

        // === right side ===
        var titleDiv = $('<div>').addClass('container col-xs-12 col-md-9');
        var titleH3 = $('<h3>').addClass('text-right').text(mealTitle);
        var titleP = $('<p>').addClass('text-right').text('This elegant dish can be made in under 30mins. Feeds 4. #dinner');
        titleDiv.append(titleH3);
        titleDiv.append(titleP);
        
        var divRow = $('<div>').addClass('row');
        titleDiv.append(divRow);
        var tagBox = $('<div>').addClass('container tag-box');
        divRow.append(tagBox);
        
        // might see problems here if there are no meal tags.
        for (let i = 0; i < mealTagsArray.length; i++) {
            const element = mealTagsArray[i];
            var spanTag = $('<span>').addClass('badge badge-pill badge-info').text(element);
            tagBox.append(spanTag);
        }
        parentCardRow.append(titleDiv);

        return parentCard;
    }


    function appendCardTo(targetClass, card) {
        targetClass = '.' + targetClass;
        $(targetClass).append(card);
    }


    function addSuccessMessage(elementClass) {
        elementClass = '.' + elementClass;
        var successMessage = $('<div>').addClass('alert alert-success')
            .attr('role', 'alert')
            .text('Yay! you saved something!');

        $(elementClass).prepend(successMessage);

        // removes message after time
        setTimeout(function() {
            $(elementClass).detach();
        }, 4 * 1000);
    }


    function ajaxCallSearch(inputString) {
        var searchInput = inputString;
        var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput;
        var arrayOfMeals = [];

        //make the call
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                // console.log(response);
                arrayOfMeals = response.meals;
                
                
                // TODO: iterate over all of the results
                for (let i = 0; i < arrayOfMeals.length; i++) {
                    const meal = arrayOfMeals[i];
                    // console.log('meals thing: ' + i );
                    // console.log(meal.strMeal);
                    // console.log(meal.strMealThumb);
                    
                    // create card and append
                    var mealCard = createCard(meal);
                    appendCardTo('recipe-box', mealCard);

                    //push to array
                    // arrayOfMeals.push(meal);
                    
                }

                $('.recipe-card').on('click', function(event) {
                    console.log(this);
                    console.log(event);
                    console.log('touched');
                });
                

            });

            // console.log('array of meals: ', arrayOfMeals);
            // console.log(arrayOfMeals);
            // console.log(resultsArray);
            
            
            

            return arrayOfMeals;
    }



// end of document ready
});