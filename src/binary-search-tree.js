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
      console.log('addleft', node, newNode)
      if (node.left == null) {
        node.left = newNode
      } else {
        _add(node.left, newNode)
      }
    }

    function _addRightNode(node, newNode) {
      console.log('addright', node, newNode)
      if (node.right == null) {
        node.right = newNode
      } else {
        _add(node.right, newNode)
      }
    }

    function _add(node, newNode) {
      console.log('add', node, newNode)
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

    function _findTarget(parent, node) {
      if (node == null) return null
      if (node.data == data) return { parent, node }
      if (node.data > data) return _findTarget(node, node.left)
      else return _findTarget(node, node.right)
    }

    if (this.has(data) == null) {
      return
    }

    const { parent, node } = _findTarget(this.treeRoot, data)
    let hoistedNode

    if (node.left == null) { hoistedNode = node.right }
    else if (node.right == null) { hoistedNode = node.left }
    else {
      const betterRLNode = _detachBetterRLNode(node.right)
      if (betterRLNode === node.right) { betterRLNode.right = null }
      else { betterRLNode.right = node.right }
      hoistedNode = betterRLNode
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
const tree = new BinarySearchTree()
tree.add(2)
tree.add(3)
tree.add(4)
console.log(inspect(tree))

module.exports = {
  BinarySearchTree
};