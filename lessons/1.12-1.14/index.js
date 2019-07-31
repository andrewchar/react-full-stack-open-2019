import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const [mostVotes, setMostVotes] = useState(0);

    useEffect(() => {
        calculateVotes();
    },[votes])

    const getRandomAnecdote = () => setSelected(Math.round(Math.random() * Math.round(anecdotes.length - 1)));

    const vote = () => {
        const votesCopy = [...votes];
        votesCopy[selected] += 1;
        setVotes(votesCopy);
    }

    const calculateVotes = () => {
        const mostVoted = votes.indexOf(Math.max(...votes))
        setMostVotes(mostVoted);
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes.</p>
            <button onClick={vote}>vote</button>
            <button onClick={getRandomAnecdote}>next anecdote</button>
            <h2>Anecdote with the most votes</h2>
            <p>{anecdotes[mostVotes]}</p>
            <p>has {votes[mostVotes]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));