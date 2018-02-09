let questions = []
let correctAnswer = []
let counter = 0
let points = 0
let url = null
let userAnswer = ''
function fetchQuiz(url) {
  axios.get(url)
  .then((response) => {
    response.data.results.forEach((result) => {
      questions.push(result.question)
      correctAnswer.push(result.correct_answer)
      getQuestion(counter)
    })
  }).catch((err) => {
    console.error(err);
  })
}

function getQuestion(idx){
  $('.point').html(`My Points : ${points}`)
  $('.card-title').html(`Round ${idx+1}`)
  $('.card-text').html(`${questions[idx]}`)
}

function answer(){
  let finish = questions.length-1
  console.log(counter, finish);
  localStorage.setItem('point', points)
  if(counter >= finish) {
    swal(`your total score ${points}`)
    saveScore(score)
    window.location='profile.html'
    return ''
  }
  if($('#optionsRadios2')[0].checked == true){
    userAnswer = 'False'
  } else {
    userAnswer = 'True'
  }
  console.log(counter, finish);
  if(counter >= finish) {
    if(correctAnswer[counter] == userAnswer){
      swal("Good job!", "You get 10 points!", "success");
      swal(`your total score ${points}`)
      .then((value) => {
        swal(`The returned value is: ${value}`);
      });
    } else {
      swal("Ouch!", "You get 0 points!", "error")
      swal(`your total score ${points}`)
      .then((value) => {
        swal(`The returned value is: ${value}`);
      });

    }
  } else {
    if(correctAnswer[counter] == userAnswer){
      swal("Good job!", "You get 10 points!", "success");
      counter ++
      points += 10
      getQuestion(counter)
    } else {
      swal("Ouch!", "You get 0 points!", "error");
      counter ++
      getQuestion(counter)
    }
  }
}

function showFormQuest() {
  $('.formQuiz')[0].style.visibility = 'visible'
}

function getUrlApi() {
  // https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean
  let category = $('#exampleSelect1').val()
  let level = $('#exampleSelect2').val()
  url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${level}&type=boolean`
  console.log(url);
  localStorage.setItem('url', url)
  window.location = '/quiz.html'
}

function saveScore(score){
  axios.post('http://localhost:3000/user/score', {
    score: score,
    userId: localStorage.getItem('userId')
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
}

function getScore(){
  let userId = localStorage.getItem('userId')
  axios.get(`http://localhost:3000/user/score/${userId}`)
  .then(dataScore => {
    console.log(dataScore)
    points = dataScore.score
  })
  .catch(err => {
    console.log(err)
    points = points
  })
}

function giveUp(){
    saveScore(points)
    confirm('Jangan pergi dong beb?')
    if(true){
    window.location = ('/profile.html')
  }
}
