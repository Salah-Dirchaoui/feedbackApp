import { motion, AnimatePresence } from "motion/react";
import FeedbackItem from "./FeedbackItem";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import Spinner from "./shared/Spinner";

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }
  return isLoading ? <Spinner /> : (
    <div className="feedback-list">
      <AnimatePresence mode="popLayout">
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <FeedbackItem
              key={item.id}
              item={item}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;