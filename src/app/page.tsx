// import prisma from "@/lib/prisma";
"use client";

import { FormEvent, useCallback, useState } from "react";

const MULTIPLES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface IQuestion {
  [val: number]: {
    topNumber: number;
    bottomNumber: number;
    answer: number;
    submittedAnswer: number | null;
  };
}

export default function Home() {
  // const users = await prisma.user.findMany();

  const [counter, setCounter] = useState(0);
  const [multiples, setMultiples] = useState<number[]>(MULTIPLES);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questionPosition, setQuestionPosition] = useState<number | null>(null);
  const [generatedQuestions, setGenerateQuestions] = useState<IQuestion | null>(
    null,
  );
  const [answer, setAnswer] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);

  const incrementQuestionPosition = () => {
    if (questionPosition === null) {
      setQuestionPosition(0);
    } else {
      setQuestionPosition(questionPosition + 1);
    }
  };

  const generateQuestions = useCallback(() => {
    const questions: IQuestion = {};
    for (let i = 0; i < questionCount; i++) {
      const topNumber = Math.floor(Math.random() * 10);
      const bottomNumber =
        multiples[Math.floor(Math.random() * multiples.length)];
      questions[i] = {
        topNumber,
        bottomNumber: bottomNumber,
        answer: topNumber * bottomNumber,
        submittedAnswer: null,
      };
    }

    setGenerateQuestions(questions);
  }, [multiples, questionCount]);

  const handleStartClick = () => {
    setFinished(false);
    generateQuestions();
    incrementQuestionPosition();
  };

  const handleEndClick = () => {
    setQuestionPosition(null);
    setFinished(true);
  };

  const handleCheck = (n: number) => {
    setMultiples([...(multiples || []), n]);
  };

  const handleUncheck = (n: number) => {
    const filterMultiple = multiples.filter((num) => num !== n);
    setMultiples(filterMultiple);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      questionPosition === null ||
      generatedQuestions === null ||
      !(questionPosition in generatedQuestions)
    ) {
      return;
    }

    const newQuestions: IQuestion = {
      ...generatedQuestions,
      [questionPosition]: {
        ...generatedQuestions[questionPosition],
        submittedAnswer: answer.length ? Number(answer) : null,
      },
    };

    setGenerateQuestions(newQuestions);
    setAnswer("");

    if (questionPosition + 1 === questionCount) {
      handleEndClick();
    } else {
      incrementQuestionPosition();
    }

    return;
  };

  // TODO: amount of questions left
  // timer counting up
  // format results
  // allow to start another one

  console.log("generatedQuestions: ", generatedQuestions);

  return (
    <div className="border-base-300 flex flex-col items-center justify-center border-t px-4 py-16 ">
      {finished && !!generatedQuestions ? (
        <div className="card glass  w-lg shadow-xl">
          <div className="card-body">
            <article className="prose prose-xl">
              <h2 className="text-center w-full">🎉 Results 🎉</h2>
            </article>
          </div>
          <figure>
            <table className="table max-w-lg">
              {/* head */}
              <thead>
                <tr>
                  <th>Equation</th>
                  <th>Answer</th>
                  <th>Your Answer</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(generatedQuestions).map(
                  (
                    res: {
                      topNumber: number;
                      bottomNumber: number;
                      answer: number;
                      submittedAnswer: number | null;
                    },
                    index,
                  ) => (
                    <tr
                      key={index}
                      className={`${
                        res.answer === res.submittedAnswer
                          ? "bg-success"
                          : "bg-error"
                      }`}
                    >
                      <td
                        className={`${
                          res.answer === res.submittedAnswer
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {res.topNumber} x {res.bottomNumber}
                      </td>
                      <td
                        className={`${
                          res.answer === res.submittedAnswer
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {res.answer}
                      </td>
                      <td
                        className={`${
                          res.answer === res.submittedAnswer
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {res.submittedAnswer}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </figure>
        </div>
      ) : null}
      {questionPosition !== null ? (
        <>
          <article className="prose mt-8 prose-2xl">
            <h1 className="text-center w-full">
              {generatedQuestions?.[questionPosition].topNumber}
            </h1>
            <h1 className="text-center w-full">X</h1>
            <h1 className="text-center w-full">
              {generatedQuestions?.[questionPosition].bottomNumber}
            </h1>
            <h1 className="text-center w-full">=</h1>
          </article>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              className="input input-bordered input-lg input-secondary w-full max-w-xs"
            />
            <button className="btn mt-4 btn-secondary" type="submit">
              {questionPosition + 1 === questionCount ? "Finish" : "Next"}
            </button>
          </form>
          <div>
            <span className="countdown font-mono text-6xl">
              <span style={{ "--value": counter }}></span>
            </span>
          </div>
        </>
      ) : (
        <>
          <article className="prose prose-2xl">
            <h1 className="text-center w-full">Get ready for math 😄</h1>
          </article>
          <article className="prose mt-8 prose-xl">
            <h2 className="text-center w-full">How many questions?</h2>
          </article>

          <div className="join mt-2">
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="10 questions"
              onChange={() => setQuestionCount(10)}
              checked={questionCount === 10}
            />
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="20 questions"
              onChange={() => setQuestionCount(20)}
              checked={questionCount === 20}
            />
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="30 questions"
              onChange={() => setQuestionCount(30)}
              checked={questionCount === 30}
            />
          </div>

          <article className="prose mt-8 prose-xl">
            <h2 className="text-center w-full">Multiples of?</h2>
          </article>
          <div className="flex flex-row">
            {MULTIPLES?.map((num) => (
              <div className="form-control" key={num}>
                <label className="cursor-pointer label flex-col">
                  <span className="label-text">{num}</span>
                  <input
                    type="checkbox"
                    checked={multiples.includes(num)}
                    className="checkbox checkbox-primary"
                    onChange={
                      multiples.includes(num)
                        ? () => handleUncheck(num)
                        : () => handleCheck(num)
                    }
                  />
                </label>
              </div>
            ))}
          </div>

          <button onClick={handleStartClick} className="btn mt-4 btn-secondary">
            Start
          </button>
        </>
      )}
    </div>
  );
}
