import React, { useEffect, useState } from "react";
import "./TodoStyle.css";
export const Todo = () => {
  //Getting data from LOCAL storage
  const getLocalStorageData = () => {
    const Lists = localStorage.getItem("myTodoList");
    if (Lists) {
      return JSON.parse(Lists);
    } else {
      return [];
    }
  };

  //States initialisation
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //setting LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  //input value
  const inputValue = (event) => {
    return setInputData(event.target.value);
  };

  //setting value when we click on + icon
  const addItem = () => {
    if (!inputdata) {
      alert("Please add something in TODO");
    } 
    else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const uniqueId = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };

      setItems([...items, uniqueId]);
      setInputData("");
    }
  };

  //edit particular Item
  const editItem=(index)=>{
    const itemTodoEdited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(itemTodoEdited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }

  // ..delete item icon we are passing id from onclick
  const deleteItem = (index) => {
    const finalItems = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(finalItems);
  };

  //removeAll item button
  const removeALLItem = () => {
    return setItems([]);
  };

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          {/* <img src="" alt="" /> */}
          <figcaption> Add Your List Here </figcaption>
        </figure>

        <div className="addItems ">
          <input
            type="text"
            placeholder=" Add Your Task"
            className="form-control"
            value={inputdata}
            onChange={inputValue}
          />
         {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
        </div>

        {/* show todo item */}
        <div className="showItems">
          {items.map((currElem) => {
            return (
              <div className="eachItem" key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(currElem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(currElem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* remove button */}
        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeALLItem}
          >
            <span>Checklists</span>
          </button>
        </div>
      </div>
    </div>
  );
};
// done