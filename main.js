import tree from './bst.js'

let arr = [6,6,4,6,1,7,8,9,4,5,3,3,3,3,3]

let newTree = tree(arr)
console.log(newTree.root)
console.log(newTree.sorted)
console.log(newTree.preOrdered)