import {useEffect, useState} from 'react';

function getValue(key, initialValue) {
  let savedValue = (initialValue instanceof Function) ? initialValue() : initialValue;
  try {
    const localStorageValue = JSON.parse(window.localStorage.getItem(key));
    if (!!localStorageValue && localStorageValue.length > 0) {
      savedValue = localStorageValue;
    }
  } catch (err) {
    console.error(err);
  }

  return !!savedValue ? savedValue : [];
}

function getStringifyValue(value) {
  let stringifyValue = '';

  try {
    stringifyValue = JSON.stringify(value);
  } catch (err) {
    console.error(err);
  }

  return stringifyValue;
}

export default function useLocationStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getValue(key, initialValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, getStringifyValue(value));
  }, [value]);

  return [value, setValue];
}
