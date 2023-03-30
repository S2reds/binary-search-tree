import node from './node.js'


export  function tree(arr) {
    let sorted = sortAndDup(arr)
    let root = arrayToBST(sorted, 0, sorted.length - 1)
    let preOrdered = () => {
        return preOrder(root)
    }
    let inOrdered = () => {
        return inOrder(root)
    }
    let postOrdered = () => {
        return postOrder(root)
    }
        

    function arrayToBST(arr, start, end) {
        if (start > end) return null
        let mid = Math.floor((start+end)/2)
        let root = node(arr[mid])
        // recursively construct left subtree
        root.left = arrayToBST(arr, start, mid - 1)
        // recursivly construct right subtree
        root.right = arrayToBST(arr, mid + 1, end)
        return root
    }
    function sortAndDup(arr) {
        // reduce array to only unique numbers
        let dup = arr.reduce((acc, curr) => {
            if (!acc.includes(curr)) acc.push(curr)
            return acc
        }, [])
        return dup.sort()
    }
    function preOrder(node) {
        if (node === null) return
        let arr = [node.val, preOrder(node.left), preOrder(node.right)].flatMap(num => {
            if (num === undefined) return null
            else return num
        })
        return arr.filter(Boolean)     
    }
    function inOrder(node) {
        if (node === null) return
        let arr = [inOrder(node.left), node.val, inOrder(node.right)].flatMap(num => {
            if (num === undefined) return null
            else return num
        })
        return arr.filter(Boolean)     
    }
    function postOrder(node) {
        if (node === null) return
        let arr = [ postOrder(node.left), postOrder(node.right), node.val].flatMap(num => {
            if (num === undefined) return null
            else return num
        })
        return arr.filter(Boolean)   
    }
    function insert(value) {
        let newNode = node(value)
        let prev = null
        let temp = root
        while (temp) {
            if (temp.val > value) {
                prev = temp
                temp = temp.left
            } else if (temp.val < value) {
                prev = temp
                temp = temp.right
            }
        }
        if (prev.val > value) prev.left = newNode
        else if (prev.val < value) prev.right = newNode
        preOrdered = preOrder(root)
        inOrdered = inOrder(root)
        postOrdered = postOrder(root)
    }
    return {
        root,
        sorted,
        preOrdered,
        inOrdered,
        postOrdered,
        insert
    }
}

export function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}