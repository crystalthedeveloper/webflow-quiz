# webflow-quiz
This script is designed to handle quiz functionality within a Webflow CMS. It loads jQuery asynchronously, then defines functions to handle quiz interaction and submission.

Here's a brief description of what the code does:

Loading jQuery: It creates a script element to load jQuery asynchronously from the Google CDN. Once jQuery is loaded, it's assigned to the variable $ using $.noConflict(true) to avoid conflicts with other libraries.

Event Handlers: It sets up event handlers for quiz items and the submit button. When a user clicks on a true/false option, the selected option is visually highlighted. When the submit button is clicked, it checks if an option is selected, marks it as submitted, disables further clicks on options, and logs the total number of questions and answered questions.

Handling Answers: It checks if the selected answer is correct or incorrect and updates the visual representation accordingly. If all questions are answered, it displays a message indicating quiz completion and attempts to save the course ID to the user's account.

Saving Course ID: It defines an asynchronous function to save the course ID to the user's account. It makes a GET request to fetch the user's account details, checks if the course ID is not already completed, updates the user's account with the new course ID, and handles errors appropriately.

Overall, this script enhances the interactivity of quizzes in a Webflow CMS environment, ensuring users can interact with quiz items and their progress is tracked and saved accurately.