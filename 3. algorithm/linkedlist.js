class Node {
    constructor(value) {
      this.value = value;
      this.previous = null;
      this.next = null;
    }
  }

  class LinkedList {

    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    isEmpty() {
        return this.length === 0;
    }

    getLength() {
        return this.length;
    }

    getNodeAtIndex(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('index is outside of the list boundaries');
        }
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentIndex !== index) {
          currentNode = currentNode.next;
          currentIndex++;
        }
        return currentNode;
      }

    addFirst(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    addLast(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          this.tail.next = newNode;
          newNode.previous = this.tail;
          this.tail = newNode;
        }
        this.length++;
    }

    insertAtIndex(index, value) {
        if (index < 0 || index > this.length) {
          throw new Error('index is outside of the list boundaries');
        }

        if (index === 0) {
            this.addFirst(value);
        } else if (index === this.length) {
          this.addLast(value);
        } else {
            const newNode = new Node(value);
            const currentNode = this.getNodeAtIndex(index);
            const beforeCurrentNode = currentNode.previous;
            currentNode.previous = newNode;
            beforeCurrentNode.next = newNode;
            newNode.next = currentNode;
            newNode.previous = beforeCurrentNode;
        }
        this.length++;
    }
}
  