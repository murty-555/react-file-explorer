import React, { useState } from "react";
import { ReactComponent as DownArrow } from "../assets/icons/caret-down-fill.svg";
import { ReactComponent as UpArrow } from "../assets/icons/caret-up-fill.svg";

const Explorer = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      //add logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
            {!expand ? <DownArrow /> : <UpArrow />}
            📂 {explorer.name}
          </span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            <button className="action-buttons" onClick={null}>
              🖊
            </button>
            <button className="action-buttons" onClick={null}>
              🗑
            </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📂" : "📄"}</span>
              <input
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Explorer explorer={exp} handleInsertNode={handleInsertNode} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        <span>📄 {explorer.name}</span>
        <div>
          <button className="action-buttons" onClick={null}>
            🖊
          </button>
          <button className="action-buttons" onClick={null}>
            🗑
          </button>
        </div>
      </div>
    );
  }
};

export default Explorer;
