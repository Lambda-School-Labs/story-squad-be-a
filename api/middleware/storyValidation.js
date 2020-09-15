const _has = require('lodash.has');

/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * is incorrectly formatted. If the data is correct, the server will move on to
 * the actual POST router.
 * @param {Object} req the server request object
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const storyValidation = (req, res, next) => {
  // Pull the task sent in the request body
  const story = req.body;
  if (
    _has(story, 'Title') &&
    _has(story, 'URL') &&
    _has(story, 'WritingPrompt') &&
    _has(story, 'DrawingPrompt')
  ) {
    // If it's valid, continue
    next();
  } else {
    // Otherwise, return a 400 w/ error message
    res.status(400).json({ error: 'InvalidStory' });
  }
};

/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * passed in doesn't contain any valid fields for Story data. If the data is
 * correct, the server will move on to the actual PUT router.
 * @param {Object} req the server request object
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const storyUpdateValidation = (req, res, next) => {
  // pull the changes sent in the request body
  const changes = req.body;
  if (
    _has(changes, 'Title') ||
    _has(changes, 'URL') ||
    _has(changes, 'WritingPrompt') ||
    _has(changes, 'DrawingPrompt')
  ) {
    // If it contains at least one valid field
    next();
  } else {
    res.status(400).json({ error: 'InvalidChanges' });
  }
};

module.exports = {
  storyValidation,
  storyUpdateValidation,
};