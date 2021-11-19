import './App.css';
import {Route, Routes} from 'react-router-dom';
import {ReportListProvider} from './context/ReportListContext';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReportListProvider><ReportForm/><ReportList/></ReportListProvider>}/>
      </Routes>
    </>
  );
}

export default App;
