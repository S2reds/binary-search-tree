import node from './node.js'


export  function tree(arr) {
    let sorted = sortAndDup(arr)
    let root = arrayToBST(sorted, 0, sorted.length - 1)

    let sort = () => {
        return sortAndDup(arr)
    }
    let preOrdered = () => {
        return preOrder(root)
    }
    let inOrdered = () => {
        return inOrder(root)
    }
    let postOrdered = () => {
        return postOrder(root)
    }
    function giveRoot() {
        return root
    }
    function reBalance() {
        let newRoot = inOrdered()
        return root = arrayToBST(newRoot, 0, newRoot.length - 1)
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
        return dup.sort((a, b) => a - b)
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
        let arr = [postOrder(node.left), postOrder(node.right), node.val].flatMap(num => {
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
    }
    function deleteNode(root, value) {
        if (root === null) return root
        if (root.val > value) {
            root.left = deleteNode(root.left, value)
            return root
        } else if (root.val < value) {
            root.right = deleteNode(root.right, value)
            return root
        }
        if (root.left === null) {
            let temp = root.right
            return temp
        } else if (root.right === null) {
            let temp = root.left
            return temp
        } else {
            let parent = root
            let succ = root.right
            while (succ.left !== null) {
                parent = succ
                succ = succ.left
            }
            if (parent != root) {
                parent.left = succ.right
            } else {
                parent.right = succ.right
            }
            root.val = succ.val
            return root
        }
    }
    function find(value) {
        let temp = giveRoot()
        if (temp === null) return
        while (temp !== null) {
            if (temp.val === value) return temp
            else if (temp.val > value) temp = temp.left
            else if (temp.val < value) temp = temp.right
        }
    }
    function levelOrder(func=null) {
        let temp = giveRoot()
        let q = []
        let result = []
        let count = 0
        if (func === null) {
            if (temp === null) return
            q.push(temp)
            while (q.length > 0) {
                let current = q[0]
                result[count++] = current.val
                if (current.left != null) q.push(current.left)
                if (current.right != null) q.push(current.right)
                q.shift()
            }   
        }
        return result
    }
    function height(n) {
        if (n === null) return 0;
        const left = height(n.left)
        const right = height(n.right)
        return Math.max(left, right) + 1
    }
    function depth(root,n) {
        if (root === null) return -1  
        if (n.val === root.val) return 0
        let count = 0
        let currentNode = root
        while (currentNode) {
            if (currentNode.val === n.val) {
              return count;
            } else if (currentNode.val > n.val) {
              currentNode = currentNode.left;
            } else {
              currentNode = currentNode.right;
            }
            count++;
          }
        return count
    }
    function isBalanced() {
        let root = giveRoot()
        let left = root.left
        let right = root.right
        let lheight = height(left)
        let rheight = height(right)
        if (lheight > rheight) {
            let diff = lheight - rheight
            return (diff > 1) ? false : true;
        } else if (rheight > lheight) {
            let diff = rheight - lheight
            return (diff > 1) ? false : true;
        } else if (lheight === rheight) {
            return true
        }
    }
    return {
        giveRoot,
        preOrdered,
        inOrdered,
        postOrdered,
        insert,
        reBalance,
        deleteNode,
        find,
        levelOrder,
        height,
        depth,
        isBalanced,
        sorted,
        sort
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