export class Node<T> {
  value: T;

  left: Node<T>;
  right: Node<T>;
}
export class Tree<T> {
  root: Node<T>;

  constructor() {}

  insert(value: T) {
    let node = new Node<T>();
    node.value = value;
    if (!this.root) {
      this.root = node;
    } else {
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (!current.left) {
            current.left = node;
            return;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = node;
            return;
          }
          current = current.right;
        }
      }
    }
  }

  search(value: T) {
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }

  getSuccessor(node: Node<T>) {
    let current = node;
    let parent = node;
    let successor = node;
    let isLeft = true;
    while (current.left) {
      parent = current;
      current = current.left;
      isLeft = true;
    }
    if (successor !== current) {
      parent.left = current.right;
      successor = current;
    }
    return successor;
  }
  remove(value: T) {
    let current = this.root;
    let parent = this.root;
    let isLeft = true;
    while (current.value !== value) {
      parent = current;
      if (value < current.value) {
        isLeft = true;
        current = current.left;
      } else {
        isLeft = false;
        current = current.right;
      }
      if (!current) {
        return null;
      }
    }
    // if I have no children
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null;
      } else if (isLeft) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (!current.right) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeft) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if (!current.left) {
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeft) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else {
      // if I have two children
      let successor = this.getSuccessor(current);
      if (current === this.root) {
        this.root = successor;
      } else if (isLeft) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
  }
}
