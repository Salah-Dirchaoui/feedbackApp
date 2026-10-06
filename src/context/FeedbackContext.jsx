import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext()


export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
  useEffect(() => {
    let ignore = false

    fetch('http://localhost:3000/feedback?_sort=id')
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setFeedback(data)
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const addFeedback = async (newFeedback) => {
    const response = await fetch('http://localhost:3000/feedback', {
      method: 'Post',
      header: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });
    const data = await response.json()

    setFeedback([data, ...feedback])
  }
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete ?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
      await fetch(`http://localhost:3000/feedback/${id}`, { method: 'DELETE' })
    } else {
      return
    }
  }
  // update feedback item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`http://localhost:3000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })

    const data = await response.json()

    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))


    setFeedbackEdit({
      item: {},
      edit: false,
    })

  }
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext