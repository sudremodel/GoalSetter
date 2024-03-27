import { useDispatch } from "react-redux";
import { deleteGoal, getGoals, updateGoal,reset } from "../features/goals/goalSlice";
import { useState } from "react";

function GoalItem({goal}) {
    const [update, setUpdate] = useState(false)
    const [update1, setUpdate1] = useState(true)
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const onSubmit = async e => {
        e.preventDefault()
        await dispatch(updateGoal({ text: text, id: goal._id }))
        setText('')
        await dispatch(getGoals())
    }
    const onUpdate = () => {
        return setUpdate(true), setUpdate1(false)
    }
  return (
    <section className="form">
    <div className="goal form-group">
      <div>
       {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{goal.text}</h2>
      <button className="class" onClick={() => dispatch(deleteGoal(goal._id))}>Delete </button>
      {update1 && <button onClick={onUpdate} className="btn btn-block">update</button>}
      {update && <input type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Type here to update Goal"></input>}
      {update && <button onClick={onSubmit} className="btn btn-block">update</button>}
    </div>
    </section>
  )
}

export default GoalItem