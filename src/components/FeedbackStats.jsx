import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";



function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext)

  let sumRev = feedback.length;
  let average = feedback.reduce((acc, cur) => {
    return (acc + cur.rating)
  }, 0) / sumRev;
  average = average.toFixed(1).replace(/[.,]0$/, '')
  return (
    <div className="feedback-stats">
      <h4>{sumRev} Reviews</h4>
      <h4>Average Rating : {sumRev ? average : sumRev}</h4>
    </div>
  )
}

export default FeedbackStats
