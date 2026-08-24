import {useState} from "react"
import Quiz from "./Quiz.jsx"
import QuizSelection from "./QuizSelection.jsx"

export default function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  const [pickType, setPickType] = useState(false)
  const [questionsNumber, setQuestionsNumber] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState(null)


  function startquiz(){

    setStartQuiz(true)

  }


function selectType(){

  setPickType(true)

}

function backToCategories() {
  setPickType(false)
}

if (!startQuiz) {
  return (
    <header className="header">
    <h1>Quizzical</h1>
    <p>Click below to start the game</p>
    <button onClick={startquiz}>Start quiz</button>
  </header>
  )
}

if (!pickType) {
  return <QuizSelection selectType={selectType} setQuestionsNumber={setQuestionsNumber} setSelectedCategory={setSelectedCategory} />
}

return <Quiz questionsNumber={questionsNumber} selectedCategory={selectedCategory} backToCategories={backToCategories} />



}
