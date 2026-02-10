import Diagram from "./components_v1/Diagram";
import Block from "./components_v1/Block";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//temp data
function getBlocks(): Block[] {
  return [
    new Block("A", [new Block("E")]),
    new Block("B", [new Block("C"), new Block("D", [new Block("F")])]),
  ];
}

// note - parameters ideally should not mutate
function updateBlock(blocks: Block[], id: string) {
  blocks = blocks.map((block) => {
    if (block.id === id) {
      block.minimised = !block.minimised;
    } else {
      updateBlock(block.next, id);
    }
    return block;
  });
  return blocks;
}

function App() {
  const [blocks, setBlocks] = useState(getBlocks());

  return (
    <div style={{ width: "100vw" }}>
      <Diagram
        blocks={blocks}
        toggleExpansion={(id) => {
          let newBlocks = updateBlock(blocks, id);
          setBlocks(newBlocks);
        }}
      />
    </div>
  );
}

export default App;
