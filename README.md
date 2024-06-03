# webflow-quiz
This code dynamically loads jQuery from a CDN (Content Delivery Network), sets up event handlers for a quiz form, and handles the submission of answers. Here's a brief description:

Loading jQuery: It creates a script element dynamically and sets its source to the jQuery library hosted on the Google CDN. When the script is loaded, it initializes jQuery in noConflict mode, ensuring it doesn't conflict with any existing global variables named $.

Document Ready: It waits for the document to be fully loaded before executing any jQuery code to ensure that all elements are accessible.

Getting Collection Item ID: It defines a function to retrieve the collection item ID from the current page's HTML, assuming it's stored as a data attribute.

Event Handlers for Quiz Items: It sets up event handlers for quiz items, such as true/false options. When a user clicks on an option, it updates the visual state by adding or removing classes.

Event Handler for Submit Button: It sets up an event handler for the submit button. When clicked, it checks if an answer has been submitted and if either the true or false option has been selected. If so, it marks the answer as submitted and performs various actions based on whether the answer is correct or incorrect.

Handling Answers: It iterates over the quiz items, checking each answer's correctness and updating the visual state accordingly. If all questions are answered, it reveals the pass-wrap element after a 2-second delay and hides navigation elements.

Appending Script: Finally, it appends the dynamically created script element to the head of the document, triggering the loading and execution of jQuery and the associated code.