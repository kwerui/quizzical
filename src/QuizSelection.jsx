import {useEffect, useState} from "react"


export default function QuizSelection(props){

    const categoryLookup = "https://opentdb.com/api_category.php"
    const [categories, setCategories] = useState([])
    useEffect(()=> {


        fetch(categoryLookup)
        .then((res) => res.json())
         .then((json) => {

            setCategories(json.trivia_categories)
         })}, [])

  

    return(
    <div className="settings">
        <p>Number of questions : <input className="input" onChange={event =>
  props.setQuestionsNumber(Number(event.target.value))
} type="number" name="Amount of questions" id="input" min="1" max="50" /></p>
    <p>Category desired:</p>
      <section className="buttonsSelection">   
{categories.map(category => {
  return (
   
    <button className="categoryButton" onClick={() => {
  props.setSelectedCategory(category.id)
  props.selectType()
}}key={category.id}>
      {category.name}
    </button>
   
  ) 
 }  )}
    </section> 

</div>
    )

}
