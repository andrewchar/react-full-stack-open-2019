import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [positive, setPositive] = useState(0);
  const [hasVoted, setHasVoted] = useState(false)

  const allVotes = good + neutral + bad;

  useEffect(() => {
    setPositive(Math.round((good / allVotes) * 100) / 100 + '%');
  }, [allVotes])

  const vote = (voteOption) => {
    switch(voteOption) {
        case 'good':
            setGood(good + 1);
            break;
        case 'neutral':
            setNeutral(neutral + 1);
            break;
        case 'bad':
            setBad(bad + 1);
            break;
    }
    setHasVoted(true);
  }

  return (
    <div>
        <h2>give feedback</h2>
        <Button text='good' clickAction={()=>vote('good')} />
        <Button text='neutral' clickAction={()=>vote('neutral')} />
        <Button text='bad' clickAction={()=>vote('bad')} />
        <h2>Statistics</h2>
        {hasVoted ? (
            <table>
                <tbody>
                    <tr>
                        <Statistic text='good' stat={good} />
                    </tr>
                    <tr>
                        <Statistic text='neutral' stat={neutral} />
                    </tr>
                    <tr>
                        <Statistic text='bad' stat={bad} />
                    </tr>
                    <tr>
                        <Statistic text='all' stat={allVotes} />
                    </tr>
                    <tr>
                        <Statistic text='positive' stat={positive} />
                    </tr>
                </tbody>
            </table>
        ) : (
            <p>no feedback given</p>
        )}

    </div>
  )
}

const Statistic = ({text, stat}) => {
    return (
        <>
            <td>{text}</td>
            <td>{stat}</td>
        </>
    )
}

const Button = ({clickAction, text}) => <button onClick={clickAction}>{text}</button>;

ReactDOM.render(<App />, document.getElementById('root'));