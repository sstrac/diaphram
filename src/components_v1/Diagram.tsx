import type { ReactElement } from "react";
import Block from "./Block";
import CloseButton from "react-bootstrap/CloseButton";

interface Props {
  blocks: Block[];
  parent?: Block | null;
  toggleExpansion: (id: string) => void;
}

function buttonTemplate(block: Block, maximise: () => void) {
  return (
    <button className="bordered" onClick={maximise}>
      {block.id}
    </button>
  );
}

function Diagram(props: Props): ReactElement {
  return <>{recursivelyGenerateBlock(props)}</>;
}

function recursivelyGenerateBlock({
  blocks,
  parent,
  toggleExpansion,
}: Props): ReactElement {
  let buttons: ReactElement[] = [];

  blocks.map((block) => {
    //recusively generate child blocks first
    if (!block.minimised) {
      if (block.next.length > 0) {
        //if parent is expanded
        buttons.push(
          recursivelyGenerateBlock({
            blocks: block.next,
            parent: block,
            toggleExpansion,
          }),
        );
      }
    } else {
      //Render the block, but only if we are minimised
      console.log(toggleExpansion);
      let toggleExpansionForSelf = () => toggleExpansion(block.id);
      buttons.push(buttonTemplate(block, toggleExpansionForSelf));
    }
  });

  if (parent && !parent.minimised) {
    let toggleParentExpansion = () => toggleExpansion(parent.id);

    return (
      <div className="bordered">
        {buttons}
        <CloseButton onClick={toggleParentExpansion}></CloseButton>
      </div>
    );
  } else {
    return <>{buttons}</>;
  }
  //add this block to the child blocks
}

export default Diagram;
