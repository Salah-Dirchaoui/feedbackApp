import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()
const STORAGE_KEY = 'feedback-app-data'

// Shown the first time someone opens the app (taken from your old db.json)
const initialData = [
  { id: '1', text: 'this a new item to test update from frontend to backend', rating: 8 },
  { id: '2', text: 'this is the best test to see if update is changed from feedback', rating: 7 },
  { id: '3', text: 'hello this is a test updated or change', rating: 10 },
  { id: '4', text: 'hello again testing update', rating: 10 },
]

const loadFeedback = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialData
  } catch {
    return initialData
  }
}

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(loadFeedback)
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

  // Save to the browser every time the list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback))
    } catch (error) {
      console.error('Could not save feedback:', error)
    }
  }, [feedback])

  const addFeedback = (newFeedback) => {
    const item = { ...newFeedback, id: crypto.randomUUID() }
    setFeedback((prev) => [item, ...prev])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete ?')) {
      setFeedback((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const updateFeedback = (id, updatedItem) => {
    setFeedback((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    )
    setFeedbackEdit({ item: {}, edit: false })
  }

  const editFeedback = (item) => setFeedbackEdit({ item, edit: true })

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading: false,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
