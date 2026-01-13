import Diagram from "./components_v1/Diagram";
import Block from "./components_v1/Block";
import { useState } from "react";

//temp data
function getBlocks(): Block[] {
  return [
    {
      value: "Block 1",
      minimised: false,
      next: [
        {
          value: "Block 2",
          minimised: true,
          next: [{ value: "Block 3", minimised: true, next: null }],
        },
      ],
    },
  ];
}

function App() {
  const [blocks, setBlocks] = useState(getBlocks());

  return (
    <div style={{ width: "100vw" }}>
      <Diagram
        blocks={blocks}
        onMinimise={() => {
          console.log(blocks);
        }}
      />
    </div>
  );
}

function updateBlock(
  id: number,
  blocks: Block[],
  setBlocks: (blocks: Block[]) => void
) {}

export default App;
