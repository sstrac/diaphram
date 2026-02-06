import type { ReactElement } from "react";
import Block from "./Block";

interface Props {
  blocks: Block[];
  onMinimise: (id: string) => void;
}

function renderButton(block: Block, minimise: () => void) {
  const maximisedButton = (
    <button className="bordered" onClick={minimise}>
      {block.id.toLowerCase()}
    </button>
  );
  const minimisedButton = (
    <button className="bordered" onClick={minimise}>
      {block.id}
    </button>
  );
  return block.minimised ? minimisedButton : maximisedButton;
}

function Diagram(props: Props): ReactElement {
  return <>{recursivelyGenerateBlock(props).map((el) => el)}</>;
}

function recursivelyGenerateBlock({
  blocks,
  onMinimise,
}: Props): ReactElement[] {
  let buttons: ReactElement[] = [];

  blocks.map((block) => {
    //recusively generate child blocks first
    if (block.next.length > 0) {
      if (!block.minimised)
        buttons = buttons.concat(
          recursivelyGenerateBlock({ blocks: block.next, onMinimise }),
        );
    }

    let minimise = () => onMinimise(block.id);

    buttons.push(renderButton(block, minimise));
  });
  return buttons;
  //add this block to the child blocks
}

export default Diagram;
