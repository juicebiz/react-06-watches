import React, {useEffect, useState} from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import moment from 'moment'

function App() {

  const currentDateTime = () => moment()
  
  const [currentTime, setCurrentTime] = useState(currentDateTime())

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(currentDateTime()),
      1000
    );

    return () => {
      clearInterval(interval);
    }
  }, []);

  const [watches, setWatches] = useState([
    {
      id: nanoid(),
      name: "Moscow",
      zone: "3"
    }
  ])

  const [form, setForm] = useState({
    name: "",
    zone: ""
  })

  const handleChange = ({target}) => {
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm(prevForm => ({...prevForm, [name]: value}))
  }

  const handleSubmit = (evt => {
    evt.preventDefault()

    const newWatch = {
      id: nanoid(),
      name: form.name,
      zone: form.zone
    }

    const newWatches = [...watches, newWatch]

    setWatches(prevWatches => newWatches)
    console.log(watches)
  })

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="zone" value={form.zone} onChange={handleChange} required />
        <button type="submit">Добавить</button>
      </form>
      {watches.map(watch => 
        <div className='watch-item' key={watch.id}>
          <h4>{watch.name}</h4>
          <p>{watch.zone}</p>
          <p>{moment().add(watch.zone, 'hours').format("DD-MM-YYYY HH:mm:ss")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
