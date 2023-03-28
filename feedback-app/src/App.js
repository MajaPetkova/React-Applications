import { useState } from "react";
import { FeedbackList } from "./components/FeedbackList";
import { Header } from "./components/Header";
import { FeedbackData } from "./data/FeedbackData";
import { FeedbackStats } from "./components/FeedbackStats";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((x) => x.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <FeedbackStats feedback={feedback}/>
        <FeedbackList feedback={feedback} closeHandler={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
