import React, { useState } from "react";
import "./TodoStyle.css";
export const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState([]);

  //removeAll item button
  const removeALLItem = () => {
    return setItems([]);
  };
  // ..delete item icon we are passing id from onclick
  const deleteItem = (index) => {
    const finalItems = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(finalItems);
  };

  //input value
  const inputValue = (event) => {
    return setInputData(event.target.value);
  };
  //setting value when we click on + icon
  const addItem = () => {
    if (!inputdata) {
      alert("Please add something in TODO");
    } else {
      const uniqueId = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };

      setItems([...items, uniqueId]);
      setInputData("")
    }
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
          <i className="fa fa-plus" onClick={addItem}></i>
        </div>

        {/* show todo item */}
        <div className="showItems">
          {items.map((e, i) => {
            return (
              <div className="eachItem" key={i}>
                <h3>{e.name}</h3>
                <div className="todo-btn">
                  <i className="far fa-edit add-btn"></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(e.id)}
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
