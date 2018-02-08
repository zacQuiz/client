let questions = []
let correctAnswer = []
let counter = 0
let points = 0
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
  if(counter >= finish) {
    swal(`your total score ${points}`)
    return ''
  }
  let userAnswer = ''
  if($('#optionsRadios2')[0].checked == true){
    userAnswer = 'False'
  } else {
    userAnswer = 'True'
  }
  if(correctAnswer[counter] == userAnswer){
    swal("Good job!", "You get 10 points!", "success");
    counter += 1
    points += 10
    getQuestion(counter)
  } else {
    swal("Ouch!", "You get 0 points!", "error");
    counter += 1
    getQuestion(counter)
  }
}
