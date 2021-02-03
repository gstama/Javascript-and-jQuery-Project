var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = 0;
var level = 0;

// Updates user pattern on button click,
// and checks answer
$('.btn').click((button) => {
  var userChosenColour = button.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Starts the game with keydown
$('body').keydown(() => {
  if (!started) {
    started = 1;
    nextSequence();
  }
});

/**
 * Moves game to next sequence.
 */
function nextSequence() {
  userClickedPattern = [];

  $('#level-title').text('Level ' + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .fadeOut(100, playSound(randomChosenColour))
    .fadeIn(100);
}

/**
 * Plays sound according to name picked.
 * @param {string} name - The name of the colour picked.
 */
function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

/**
 * Animates button picked by using .pressed class from CSS.
 * @param {string} currentColour - The name of the colour picked.
 */
function animatePress(currentColour) {
  $('#' + currentColour).addClass(
    'pressed',
    setTimeout(() => {
      $('#' + currentColour).removeClass('pressed');
    }, 100)
  );
}

/**
 * Checks user answer against generated pattern.
 * @param {integer} currentLevel - The current number of clicks by the user.
 */
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass(
      'game-over',
      setTimeout(() => {
        $('body').removeClass('game-over');
      }, 200)
    );
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

/**
 * Reset game function after wrong answer.
 */
function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}
