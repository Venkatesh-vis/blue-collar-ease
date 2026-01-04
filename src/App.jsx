import OfflineFallback from "./components/Offline.jsx";
import JobList from "./components/JobList.jsx";

function App() {

  return (
      <div>
          {!navigator.onLine && <OfflineFallback />}
          <JobList/>
      </div>
  )
}

export default App
