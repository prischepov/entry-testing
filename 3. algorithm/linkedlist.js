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

    validateIndex(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('index is outside of the list boundaries');
        }
    }

    getNodeAtIndex(index) {
        validateIndex(index);

        if (this.isEmpty()) {
            return null;
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

    removeFirst() {
        if (this.isEmpty()) {
            return;
        }
        const firstNode = this.head;
        const secondNode = this.head.next;
        if (secondNode) {
            secondNode.previous = null;
            firstNode.next = null;
        } else {
            this.tail = null;
        }
        this.head = secondNode;
        this.length--;
    }

    removeLast() {
        if (this.isEmpty()) {
            return;
        }
        const beforeLast = this.tail.previous;
        if (beforeLast) {
          beforeLast.next = null;
          this.tail.previous = null;
        } else {
          this.head = null;
        }
        this.tail = beforeLast;
        this.length--;
      }

    removeAtIndex(index) {
        validateIndex(index);

        if (this.isEmpty()) {
            return;
        }

        if (index == 0) {
            removeFirst();
        } else if (index == this.length - 1) {
            removeLast();
        } else {
            const nodeToRemove = this.getNodeAtIndex(index);
            const previousNode = nodeToRemove.previous;
            const nextNode = nodeToRemove.next;

            nodeToRemove.next = null;
            nodeToRemove.prevous = null;
            previousNode.next = nextNode;
            nextNode.previous = previousNode;
            this.length--;
        }
    }

    moveNode(sourceIndex, destinationIndex) {
        validateIndex(sourceIndex);
        validateIndex(destinationIndex);

        if(sourceIndex === destinationIndex) {
            return;
        }

        const sourceNodeValue = this.getNodeAtIndex(indexOne).value;
        this.removeAtIndex(sourceIndex);
        this.insertAtIndex(destinationIndex, sourceNodeValue);
    }

    toArray() {
        const array = [];
        let current = this.head;
            
        while(current) {
            array.push(current.element);
            current = current.next;
        }
        return array;
    }

    fromArray(sourceArray) {
        if(!sourceArray || !Array.isArray(sourceArray)) {
            throw new Error('please provide a valid array object');
        }

        const list = new LinkedList();
        sourceArray.forEach(element => {
            list.addLast(element);
        });
        return list;
    }

    toString() {
        return this.toArray().toString();
    }

    reverse() {
        let previous = null;
        let current = head;
        
        while(current) {
            previous = current.previous;
            current.previous = current.next;
            current.next = previous;
            current = current.previous;
        }
        
        if (previous != null) { 
            head = previous.previous; 
        }
    }
}
  