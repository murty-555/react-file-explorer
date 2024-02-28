import { useState } from "react";
import "./App.css";
import Explorer from "./components/Explorer";
import { data } from "./data/explorerData";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(data);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Explorer handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

export default App;
