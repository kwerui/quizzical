import {useEffect, useState} from "react"


export default function Quiz(props){

    function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}



    const apiUrl = `https://opentdb.com/api.php?amount=${props.questionsNumber}&category=${props.selectedCategory}`
    
    const [questions, setQuestions] = useState([])

    const [selectedAnswers, setSelectedAnswers] = useState({})

    const [isChecked, setIsChecked] = useState(false)

function fetchQuestions(){

    fetch(apiUrl)
     .then((res) => res.json())
        .then((json) => {

       const results = json.results.map(question =>{

            const answers = [

                question.correct_answer,
                ...question.incorrect_answers,
            ]

            let shuffledAnswers = [...answers]
            shuffledAnswers.sort(()=> Math.random() - 0.5) 

            return {

                ...question,
                shuffledAnswers

            }

        })
setQuestions(results)

    })
}


useEffect(() => {
  fetchQuestions()
}, [])


function checkAnswers(){

    setIsChecked(true)

}

function classAssignment(question, answer){


     if (isChecked && answer === question.correct_answer) {

       return ("green-button")

    } else if (isChecked && selectedAnswers[question.question] === answer && answer != question.correct_answer){

        return ("red-button")
    } else if (selectedAnswers[question.question] === answer ){

        return ("answer-individual-selected")
    } else {

        return ("answer-individual")
    }
}

function reset(){
    setSelectedAnswers({})
    setIsChecked(false)
    fetchQuestions()


}
return (
<div className="quiz-page">
{questions.map(question => {

    return(
        <div key={question.question} className="quiz">
            <h3 className="question">{htmlDecode(question.question)} </h3>
            <div className="answers">
            {question.shuffledAnswers.map(answer => <button onClick={()=> setSelectedAnswers(previous => ({
  ...previous,
  [question.question]: answer
}))} 

className={classAssignment(question, answer)} disabled={isChecked} key={answer}>{htmlDecode(answer)}</button>)}

            </div>

            
        </div>

    )

    })}
                  {questions.length > 0 && isChecked===false && <button disabled={
  Object.keys(selectedAnswers).length !== questions.length
} onClick={checkAnswers} className="check-button"> Check answers </button> }

                 {isChecked && (
                    <div className="final-section">
                    <p>You scored {questions.filter(question => selectedAnswers[question.question]=== question.correct_answer).length}/ {questions.length} correct answers </p>
                    <section className="final-buttons">
                  <button onClick={reset}> Play again </button>
                  <button onClick={props.backToCategories}>Back to categories</button>
                  </section>
                    </div>
                 )}
    </div> 
  )


}