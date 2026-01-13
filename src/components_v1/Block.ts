class Block {
  value: string;
  next: Block[] | null
  minimised: boolean;

  constructor(value: string, next: Block[] | null = null, minimised: boolean = true) {
    this.value = value;
    this.next = next;
    this.minimised = minimised;
  }
}

export default Block;