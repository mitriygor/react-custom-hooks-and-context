import {useContext, useEffect, useRef, useState} from 'react';
import {ReportListContext} from '../context/ReportListContext';
import {FormSelect, Table} from 'react-bootstrap';

function ReportForm() {
  const CURRENCIES = ['USD', 'AUD', 'CAD', 'PLN', 'MXN'];
  const {itemsList, setItemsList} = useContext(ReportListContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');

  const amountRef = useRef();
  const currencyRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    amountRef.current.focus();
  }, []);

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const isDataValid = () => {
    return (!!amount && amount > 0 && amount <= 1000) && (!!description && description.trim().length > 0) && (!!currency && currency.trim().length > 0);
  };

  const submitItem = (e) => {
    e.preventDefault();
    if (isDataValid()) {
      const item = {
        id: Math.floor(Math.random() * 1000000),
        amount: amount,
        currency: currency,
        description: description
      };
      setItemsList([item, ...itemsList]);
      setAmount(0);
      setCurrency('');
      setDescription('');
      amountRef.current.focus();
    }
  };
  return (
    <>
      <form onSubmit={submitItem}>
        <Table striped bordered hover>
          <tr>
            <td>
              <h4>Amount</h4>
              <input type="number" name="amount" id="amount" value={amount} onChange={updateAmount} ref={amountRef}
                     min="0"
                     max="1000"/>
            </td>
            <td>
              <h4>Currency</h4>
              <FormSelect name="currency" id="currency" value={currency} onChange={updateCurrency}
                          ref={currencyRef}>
                <option>Currency</option>
                {
                  CURRENCIES.map(c => {
                    return (
                      <option value={c}>{c}</option>
                    );
                  })
                }
              </FormSelect>
            </td>
            <td>
              <h4>Description</h4>
              <input type="text" name="description" id="description" value={description} onChange={updateDescription}
                     ref={descriptionRef}/>
            </td>
            <td>
              <button type="submit" id="button">Add</button>
            </td>
          </tr>
        </Table>
      </form>
    </>
  );
}

export default ReportForm;
