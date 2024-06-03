"use strict";

// Create script element for jQuery
var jQueryScript = document.createElement('script');
jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
jQueryScript.onload = function () {
  var jQuery = $.noConflict(true);

  // Your code here
  jQuery(document).ready(function() {
    // Function to get the current page's collection item ID
    function getCurrentPageCollectionItemID() {
      // Assuming the collection item ID is available as a data attribute or similar in your HTML
      // Adjust the selector to match your Webflow setup
      var collectionItemID = jQuery('[data-collection-item-id]').data('collection-item-id');
      return collectionItemID;
    }

    // Event handler for quiz items
    jQuery('.quiz-cms-item').each(function () {
      var $collectionItem = jQuery(this);
      // Reset formSubmitted to false when quiz is initialized
      var formSubmitted = false;

      // Event handler for true/false option
      $collectionItem.find('.quiz-cms-link-true, .quiz-cms-link-false').on('click', function () {
        if (!formSubmitted) {
          var $this = jQuery(this);
          var $siblings = $this.siblings('.quiz-cms-link-true, .quiz-cms-link-false');
          $this.find('.icon-circle').addClass('selected');
          $siblings.find('.icon-circle').removeClass('selected');
        }
      });
    });

    // Event handler for submit button
    jQuery('.quiz-cms-item .submit-answer').on('click', function () {
      var $questionItem = jQuery(".quiz-cms-item");
      var $collectionItem = jQuery(this).closest('.quiz-cms-item');
      var $trueOption = $collectionItem.find('.quiz-cms-link-true');
      var $falseOption = $collectionItem.find('.quiz-cms-link-false');
      var $submitButton = jQuery(this);

      // Check if answer is already submitted
      if (!$submitButton.hasClass('submitted')) {
        // Check if either true or false is selected
        if ($trueOption.find('.icon-circle').hasClass('selected') || $falseOption.find('.icon-circle').hasClass('selected')) {
          // Mark the submit button as submitted
          $submitButton.addClass('submitted');

          // Mark true/false options as submitted
          $trueOption.addClass('submitted');
          $falseOption.addClass('submitted');

          // Disable click events for true/false options
          $trueOption.off('click');
          $falseOption.off('click');

          // Count total unique questions within the current $questionItem
          var totalQuestions = $questionItem.length;
          // Count total answered questions across all quiz items
          var answeredQuestions = jQuery('.quiz-cms-item .icon-circle.selected').length;

          // Logic for handling answers
          $collectionItem.find('.true-false-options-wrap').each(function () {
            var $link = jQuery(this);
            if ($link.find('.selected').find('.status').hasClass('correct')) {
              $link.find('.icon-circle').addClass('answer-true');
            } else if ($link.find('.selected').find('.status').hasClass('incorrect')) {
              $link.find('.icon-circle').addClass('answer-false');
              $collectionItem.find('.wrong-wrap').removeClass('hide');
            }
          });

          // Check if all questions are answered, irrespective of whether the answers are correct or not.
          if (totalQuestions === answeredQuestions) {
            // Add a delay before removing hide class
            setTimeout(function() {
                jQuery('.pass-wrap').removeClass('hide');
              }, 2000); // 2000 milliseconds = 2 seconds
            jQuery('.slide-nav').addClass('hide');
            jQuery('.slider-arrow-icon').addClass('hide');
          }
        } else {
          // Alert the user to select an option before submitting
          alert("Please select either true or false before submitting.");
        }
      }
    });
  });
};
document.head.appendChild(jQueryScript);
