import type { ReactElement } from "react";
import Block from "./Block";

interface Props {
  blocks: Block[];
  onMinimise: () => void;
}

const renderButton = (block: Block, onMinimise: () => void) => (
  <button className="bordered" onClick={() => onMinimise()}>
    {block.value}
  </button>
);

function Diagram(props: Props): ReactElement {
  let diagram = []; //jsx array

  diagram.push(generateBlock(props));
  console.log(diagram);
  return <>{diagram.map((el) => el)}</>;
}

function generateBlock({ blocks, onMinimise }: Props): ReactElement[] {
  const nextBlocks: Block[] | null = blocks[0].next;
  let finalBlocks: ReactElement[] = [];

  if (nextBlocks) {
    finalBlocks = finalBlocks.concat(
      generateBlock({ blocks: nextBlocks, onMinimise })
    );
  }

  finalBlocks.push(renderButton(blocks[0], onMinimise));

  return finalBlocks;
}

export default Diagram;
