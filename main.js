import {tree, prettyPrint} from './bst.js'

// create bst with random array of random nums
console.log('create bst with random nums')
let random = getRandomArray()
let newTree = tree(random)

// confirm tree balanced
console.log('confirm tree balanced')
console.log(newTree.isBalanced())

// print elems
prettyPrint(newTree.giveRoot())
console.log('print elems by level, pre, in, post')
console.log(newTree.levelOrder())
console.log(newTree.preOrdered())
console.log(newTree.inOrdered())
console.log(newTree.postOrdered())

// unbalance tree by adding nums > 100
console.log('unbalance tree')
newTree.insert(200)
newTree.insert(400)
newTree.insert(600)
newTree.insert(800)

// confirm unbalanced
console.log('confirm unbalanced')
console.log(newTree.isBalanced())
prettyPrint(newTree.giveRoot())

// rebalance
console.log('rebalance')
newTree.reBalance()

// confirm rebalance
console.log('confirm rebalance')
console.log(newTree.isBalanced())
prettyPrint(newTree.giveRoot())

//print elems
console.log('print elems by level, pre, in, post')
console.log(newTree.levelOrder())
console.log(newTree.preOrdered())
console.log(newTree.inOrdered())
console.log(newTree.postOrdered())

function getRandomArray() {
    let length = Math.floor(Math.random() * 20) + 5
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 200))
    }
    return arr
}