
# Webflow Quiz with PDF Download Integration

This project enables a dynamic quiz system for a Webflow-based site. It integrates jQuery and `html2pdf.js` to manage quiz interactions and allow users to download a dynamically generated PDF certificate upon completing the quiz. 

## Features

- **Quiz Functionality**: 
  - Interactive true/false quiz options.
  - Submission handling for multiple questions.
  - Dynamic feedback for correct/incorrect answers.
  - Tracks answered questions and triggers actions upon completion.

- **PDF Download**: 
  - Automatically generates and downloads a certificate in PDF format upon quiz completion.
  - Ensures certificate download is only allowed after the quiz is successfully completed.

- **Dynamic Content**: 
  - Uses CMS (Collection Items) to manage quiz data and buttons.
  - Dynamically updates quiz states and feedback.

## How It Works

### **1. Loading jQuery**
The script dynamically loads the jQuery library from the Google CDN and initializes it in `noConflict` mode to prevent conflicts with Webflow's native functionality.

### **2. Document Ready**
Ensures all DOM elements are fully loaded before attaching event handlers or performing DOM manipulations.

### **3. Quiz Interactions**

#### **True/False Option Selection**
- Adds a `.selected` class to the chosen option.
- Automatically removes `.selected` from unselected options.

#### **Submit Button Handling**
- Verifies if an answer is selected (true/false).
- Marks the question as answered upon submission.
- Updates the visual state for correct or incorrect answers:
  - Correct answers add the `.answer-true` class.
  - Incorrect answers add the `.answer-false` class and reveal the `.wrong-wrap` element.

#### **Completion Handling**
- Checks if all questions have been answered.
- Reveals the `.pass-wrap` element after a delay of 2 seconds.
- Hides navigation elements like `.slide-nav` and `.slider-arrow-icon`.

### **4. PDF Certificate Download**
- Uses the `html2pdf.js` library to generate a PDF certificate.
- Ensures that the download button is functional only when the `.pass-wrap` element is visible.
- Dynamically adds a click handler to all buttons within the CMS:
  - Reveals the certificate content (`#certificate-wrap`).
  - Generates and downloads a PDF certificate with the content of `#certificate-content`.

## Setup Instructions

### **1. Include Dependencies**
Ensure you include the `html2pdf.js` library in your project by adding this script to your Webflow custom code:
```html
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
```

### **2. Copy the Code**
Add the following code to your Webflow custom code section (before the closing `</body>` tag):

```html
<!--webflow-quiz--->
<script>
"use strict";

// Create script element for jQuery
var jQueryScript = document.createElement('script');
jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
jQueryScript.onload = function () {
  var jQuery = $.noConflict(true);

  jQuery(document).ready(function() {
    // Event handler for quiz items
    jQuery('.quiz-cms-item').each(function () {
      var $collectionItem = jQuery(this);
      var formSubmitted = false;

      // True/False option selection
      $collectionItem.find('.quiz-cms-link-true, .quiz-cms-link-false').on('click', function () {
        if (!formSubmitted) {
          var $this = jQuery(this);
          var $siblings = $this.siblings('.quiz-cms-link-true, .quiz-cms-link-false');
          $this.find('.icon-circle').addClass('selected');
          $siblings.find('.icon-circle').removeClass('selected');
        }
      });
    });

    // Submit button handling
    jQuery('.quiz-cms-item .submit-answer').on('click', function () {
      var $questionItem = jQuery(".quiz-cms-item");
      var $collectionItem = jQuery(this).closest('.quiz-cms-item');
      var $trueOption = $collectionItem.find('.quiz-cms-link-true');
      var $falseOption = $collectionItem.find('.quiz-cms-link-false');
      var $submitButton = jQuery(this);

      if (!$submitButton.hasClass('submitted')) {
        if ($trueOption.find('.icon-circle').hasClass('selected') || $falseOption.find('.icon-circle').hasClass('selected')) {
          $submitButton.addClass('submitted');
          $trueOption.addClass('submitted');
          $falseOption.addClass('submitted');
          $trueOption.off('click');
          $falseOption.off('click');

          var totalQuestions = $questionItem.length;
          var answeredQuestions = jQuery('.quiz-cms-item .icon-circle.selected').length;

          $collectionItem.find('.true-false-options-wrap').each(function () {
            var $link = jQuery(this);
            if ($link.find('.selected').find('.status').hasClass('correct')) {
              $link.find('.icon-circle').addClass('answer-true');
            } else if ($link.find('.selected').find('.status').hasClass('incorrect')) {
              $link.find('.icon-circle').addClass('answer-false');
              $collectionItem.find('.wrong-wrap').removeClass('hide');
            }
          });

          if (totalQuestions === answeredQuestions) {
            setTimeout(function() {
              jQuery('.pass-wrap').removeClass('hide');
            }, 2000);
            jQuery('.slide-nav').addClass('hide');
            jQuery('.slider-arrow-icon').addClass('hide');
          }
        }
      }
    });

    // PDF Download Logic for CMS Buttons
    const cmsButtons = document.querySelectorAll(".button-primary");
    const certificateWrap = document.getElementById("certificate-wrap");
    const certificateContent = document.getElementById("certificate-content");

    cmsButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const passWrap = button.closest(".quiz-cms-item").querySelector(".pass-wrap");
        if (passWrap && !passWrap.classList.contains("hide")) {
          certificateWrap.classList.remove("hide");
          certificateWrap.style.display = "block";

          html2pdf()
            .from(certificateContent)
            .set({
              margin: 0,
              filename: "Certificate.pdf",
              image: { type: "jpeg", quality: 1 },
              html2canvas: { scale: 2, useCORS: true, allowTaint: false },
              jsPDF: { format: "a4", orientation: "landscape" },
            })
            .save();
        }
      });
    });
  });
};
document.head.appendChild(jQueryScript);
</script>
```

### **3. CMS Integration**
- Add the quiz data (questions, answers, etc.) as collection items in Webflow.
- Ensure the elements have the appropriate classes (`quiz-cms-item`, `pass-wrap`, `true-false-options-wrap`, etc.).