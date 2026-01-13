import type { ReactElement } from "react";
import Block from "./Block";

interface Props {
  blocks: Block[];
  onMinimise: (id: string) => void;
}

const renderButton = (block: Block, minimise: () => void) => (
  <button className="bordered" onClick={minimise}>
    {block.id}
  </button>
);

function Diagram(props: Props): ReactElement {
  let diagram = []; //to be a jsx array
  diagram.push(generateBlock(props));
  return <>{diagram.map((el) => el)}</>;
}

function generateBlock({ blocks, onMinimise }: Props): ReactElement[] {
  let buttons: ReactElement[] = [];

  blocks.map((block) => {
    //recusively generate child blocks first
    if (block.next.length > 0 && !block.minimised) {
      buttons = buttons.concat(
        generateBlock({ blocks: block.next, onMinimise })
      );
    }

    let minimise = () => onMinimise(block.id);

    buttons.push(renderButton(block, minimise));
  });
  return buttons;
  //add this block to the child blocks
}

export default Diagram;
