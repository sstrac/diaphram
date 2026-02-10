import type { ReactElement } from "react";
import Block from "./Block";
import CloseButton from "react-bootstrap/CloseButton";

interface Props {
  blocks: Block[];
  parent?: Block | null;
  onMinimise: (id: string) => void;
}

function buttonTemplate(block: Block, minimise: () => void) {
  const maximisedButton = <CloseButton onClick={minimise} />;
  const minimisedButton = (
    <button className="bordered" onClick={minimise}>
      {block.id}
    </button>
  );
  return block.minimised ? minimisedButton : maximisedButton;
}

function Diagram(props: Props): ReactElement {
  return <>{recursivelyGenerateBlock(props)}</>;
}

function recursivelyGenerateBlock({
  blocks,
  parent,
  onMinimise,
}: Props): ReactElement {
  let buttons: ReactElement[] = [];

  blocks.map((block) => {
    //recusively generate child blocks first
    if (block.next.length > 0) {
      if (!block.minimised)
        //if parent is expanded
        buttons = buttons.concat(
          recursivelyGenerateBlock({
            blocks: block.next,
            parent: block,
            onMinimise,
          }),
        );
    }

    let minimise = () => onMinimise(block.id);

    buttons.push(buttonTemplate(block, minimise));
  });

  if (!parent || parent?.minimised) {
    return <>{buttons}</>;
  } else {
    return <div className="bordered">{buttons}</div>;
  }
  //add this block to the child blocks
}

export default Diagram;
