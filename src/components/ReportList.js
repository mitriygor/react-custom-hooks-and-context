import {useContext, useEffect, useState} from 'react';
import {ReportListContext} from '../context/ReportListContext';
import ReportItem from './ReportItem';
import {Alert, Table} from 'react-bootstrap';

function ReportList() {
  const {itemsList} = useContext(ReportListContext);
  const [isOverspend, setIsOverspend] = useState(false);
  const [rates, setRates] = useState({});
  const [total, setTotal] = useState(0);


  useEffect(() => {
    async function fetchRate() {
      let response = await fetch('http://api.exchangeratesapi.io/v1/latest?access_key=f9b647bdb440338c0a9f8b964ce7e8d2&symbols=USD,AUD,CAD,PLN,MXN');
      response = await response.json();
      if (!!response && response.hasOwnProperty('rates')) {
        setRates(response.rates);
      }
    }

    fetchRate();
  }, []);

  useEffect(() => {
    updateTotal();
  }, [itemsList]);

  const updateTotal = () => {
    setTimeout(() => {
      const sum = itemsList.reduce((sum, item) => {
        return sum + (item.amount * (!!rates[item.currency] ? rates[item.currency] : 0)); // only for demo purposes lacking currencies set to zero. In othere cases, there is supposed to be a proper currencies handler
      }, 0);
      setTotal(sum);
    }, 1000); // just for demo purposes, there was added a timeout. In other cases, there is supposed to be proper handler for the API response and the total calculation
  };

  const submitReport = (e) => {
    e.preventDefault();
    if (total > 1000) {
      setIsOverspend(true);
    } else {
      console.log('REPORT IS SUBMITTED');
    }
  };

  return (
    <>
      {
        isOverspend ? (<Alert variant="danger">Overspend</Alert>) : <></>
      }

      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Currency</th>
        </tr>
        </thead>
        <tbody>
        {
          itemsList.map((item) => {
            return <ReportItem item={item} key={item.id}/>;
          })
        }
        </tbody>
      </Table>

      <br/>
      <br/>
      <br/>
      <h1>
        {total} EUR
      </h1>
      <button type="submit" id="button">Submit</button>
    </>
  );
}

export default ReportList;
