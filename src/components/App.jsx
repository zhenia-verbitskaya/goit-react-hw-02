import { useState, useEffect } from "react";
import Options from "./Options";
import Description from "./Description";
import Feedback from "./Feedback";
import Notification from "./Notification";

export default function App() {
  const state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [values, setValues] = useState(() => {
    const savedStatistics = window.localStorage.getItem("statistics");

    if (savedStatistics !== null) {
      return JSON.parse(savedStatistics);
    }

    return state;
  });

  useEffect(() => {
    window.localStorage.setItem("statistics", JSON.stringify(values));
  }, [values]);

  const updateFeedback = (feedbackType) => {
    setValues({
      ...values,
      [feedbackType]: values[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setValues(state);
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positiveFeedback = Math.round((values.good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          values={values}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
