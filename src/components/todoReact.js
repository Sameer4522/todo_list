import React, { useState, useEffect } from "react";
import "./styles.css";

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
 
const TodoReact = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [editedItem, setEditedItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("Fill the Data");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editedItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData([]);
      setEditedItem("");
      setToggleBtn(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });

    setInputData(item_todo_edited.name);
    setEditedItem(index);
    setToggleBtn(true);
  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });

    setItems(updatedItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your list here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggleBtn ? (
              <i className="fa fa-solid fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-solid fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoReact;
