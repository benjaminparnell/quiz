import * as React from "react";
import { Question } from "../App";

type Props = {
  index: number;
  onAnswerChange: (answer: string) => void;
  onMarkUp: () => void;
  onMarkDown: () => void;
} & Question;

const Question: React.FC<Props> = ({
  index,
  onAnswerChange,
  onMarkDown,
  onMarkUp,
  answer,
  mark,
}) => (
  <div>
    <label>
      Question {index + 1} ({mark})
    </label>
    <input
      type="text"
      placeholder="Answer here"
      value={answer}
      onChange={(e) => onAnswerChange(e.target.value)}
    />
    <button onClick={() => onMarkUp()}>Mark Up</button>
    <button onClick={() => onMarkDown()}>Mark Down</button>
  </div>
);

export default Question;
