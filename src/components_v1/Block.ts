class Block {
  id: string;
  next: Block[];
  minimised: boolean;

  constructor(id: string, next: Block[] = [], minimised: boolean = true) {
    this.id = id;
    this.next = next;
    this.minimised = minimised;
  }
}

export default Block;