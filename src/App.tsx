import * as React from "react";
import { useEffect } from "react";
import useLocalStorageState from "./useLocalStorageState";
import Question from "./components/Question";

export interface Question {
  answer: string;
  mark: number;
}

interface Round {
  questions: Question[];
}

const App: React.FC = () => {
  const [rounds, setRounds] = useLocalStorageState<Round[]>([], "rounds");

  useEffect(() => {
    const storedRounds = localStorage.getItem("rounds");
    if (storedRounds) {
      try {
        setRounds(JSON.parse(storedRounds));
      } catch (e) {}
    }
  }, []);

  const totalMarksForRound = (round: Round) =>
    round.questions.reduce((count, { mark }) => count + mark, 0);

  return (
    <div>
      <button
        type="button"
        onClick={() => setRounds(rounds.concat([{ questions: [] }]))}
      >
        Add round
      </button>
      <p>
        Total:{" "}
        {rounds.reduce((count, round) => count + totalMarksForRound(round), 0)}
      </p>
      {rounds.map((round, index) => {
        const addQuestion = () => {
          const newRounds = [...rounds];
          newRounds[index].questions.push({ answer: "", mark: 0 });
          setRounds(newRounds);
        };
        return (
          <div key={index}>
            <p>
              Round {index + 1} ({totalMarksForRound(round)})
            </p>
            <button type="button" onClick={() => addQuestion()}>
              Add question
            </button>
            {round.questions.map((question, questionIndex) => {
              const onAnswerChange = (answer: string) => {
                const newRounds = [...rounds];
                newRounds[index].questions[questionIndex].answer = answer;
                setRounds(newRounds);
              };
              const onMarkUp = () => {
                const newRounds = [...rounds];
                newRounds[index].questions[questionIndex].mark += 1;
                setRounds(newRounds);
              };
              const onMarkDown = () => {
                const newRounds = [...rounds];
                newRounds[index].questions[questionIndex].mark -= 1;
                setRounds(newRounds);
              };
              return (
                <Question
                  index={index + 1}
                  {...question}
                  onAnswerChange={onAnswerChange}
                  onMarkUp={onMarkUp}
                  onMarkDown={onMarkDown}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
