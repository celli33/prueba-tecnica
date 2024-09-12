import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [profiles, setProfiles] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/perfiles', {
        method: 'GET',
      })
      setProfiles(await response.json());
    };

    fetchData();
  }, []);

  return (
    <div style={{width: '100%', height: '100%', padding: '2rem', boxSizing: 'border-box'}}>
      {profiles && profiles.map(setProfile => (
        <div key={profiles.id} className="card">
          <h2>{profiles.commercialName}</h2>
          <button>Visualizar</button>
        </div>
      ))}
    </div>
  )
}

export default App
