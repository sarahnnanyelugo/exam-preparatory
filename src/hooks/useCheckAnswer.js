import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAnswered } from "../store/slices/examSlice";

const useCheckAnswer = (id, index) => {
  const [myArray, setMyArray] = useState([]);
  const dispatch = useDispatch();
  const payload = { newKey: id, newValue: parseInt(index) };

  const updateLocalStorage = ({ newKey, newValue }) => {
    let updatedArray = myArray;

    // Check if the key already exists in the array
    const existingIndex = updatedArray.find((item) => item.id === newKey);
    // console.log("existingIndex", existingIndex);

    if (existingIndex) {
      // If the key exists, update its value
      existingIndex.value = newValue;
      setMyArray(updatedArray);
      localStorage.setItem("myArray", JSON.stringify(updatedArray));
    } else {
      // If the key doesn't exist, add the new key-value pair to the array
      const newArray = [...myArray, { id: newKey, value: newValue }];
      setMyArray(newArray);
      localStorage.setItem("myArray", JSON.stringify(newArray));
    }
  };

  useEffect(() => {
    updateLocalStorage(payload);
    dispatch(updateAnswered({ id, index }));
  }, []);
};

export default useCheckAnswer;
