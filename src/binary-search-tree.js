const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null
  }

  root() {
    return this.treeRoot
  }

  add(data) {

    function _addLeftNode(node, newNode) {
      if (node.left == null) {
        node.left = newNode
      } else {
        _add(node.left, newNode)
      }
    }

    function _addRightNode(node, newNode) {
      if (node.right == null) {
        node.right = newNode
      } else {
        _add(node.right, newNode)
      }
    }

    function _add(node, newNode) {
      if (node.data > newNode.data) {
        _addLeftNode(node, newNode)
      } else if (node.data < newNode.data) {
        _addRightNode(node, newNode)
      }
    }

    const newNode = new Node(data)

    if (this.root() == null) {
      this.treeRoot = newNode
    } else {
      _add(this.treeRoot, newNode)
    }

  }

  has(data) {
    return this.find(data) != null
  }

  find(data) {
    function _traverse(node, data) {
      if (node == null) {
        return null
      }
      if (node.data == data) {
        return node
      }
      if (node.data > data) {
        return _traverse(node.left, data)
      } else {
        return _traverse(node.right, data)
      }
    }
    return _traverse(this.treeRoot, data)
  }

  remove(data) {

    function _findTarget(node, data, parent) {
      if (node == null) {
        return null
      }
      if (node.data == data) {
        return { parent, node }
      }
      if (node.data > data) {
        return _findTarget(node.left, data, node)
      } else {
        return _findTarget(node.right, data, node)
      }
    }

    function _detachBetterRLNode(node) {
      if (node.left == null) {
        return { betterNode: node, newChild: node.right }
      }

      const {betterNode, newChild} = _detachBetterRLNode(node.left)

      node.left = newChild

      return { betterNode, newChild: node }
    }

    if (this.has(data) == null) {
      return
    }

    const { parent, node } = _findTarget(this.treeRoot, data, null)

    let hoistedNode

    if (node.left == null) {
      hoistedNode = node.right
    }
    else if (node.right == null) {
      hoistedNode = node.left
    }
    else {
      const { betterNode, newChild } = _detachBetterRLNode(node.right)
      hoistedNode = betterNode
      betterNode.right = newChild
      betterNode.left = node.left
    }

    if (parent == null) {
      this.treeRoot = hoistedNode
    } else {

      if (parent.left === node) {
        parent.left = hoistedNode
      } else {
        parent.right = hoistedNode
      }

    }

  }

  min() {
    if (this.treeRoot == null) return null
    let cursor = this.treeRoot
    while (cursor.left != null) cursor = cursor.left
    return cursor.data
  }

  max() {
    if (this.treeRoot == null) return null
    let cursor = this.treeRoot
    while (cursor.right != null) cursor = cursor.right
    return cursor.data
  }
}

const { inspect } = require('util')
const tree = new BinarySearchTree();
tree.add(2)
tree.add(1)
tree.add(3)
tree.remove(2)
console.log(inspect(tree))

module.exports = {
  BinarySearchTree
};