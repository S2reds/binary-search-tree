import node from './node.js'


export default function tree(arr) {
    let sorted = sortAndDup(arr)
    let root = arrayToBST(sorted, 0, sorted.length - 1)
    let preOrdered = preOrder(root)

    function arrayToBST(arr, start, end) {
        if (start > end) return null
        let mid = Math.floor((start+end)/2)
        console.log(mid)
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
        document.write(node.val + " ")
        preOrder(node.left)
        preOrder(node.right)
    }

    return {
        root,
        arrayToBST,
        sortAndDup,
        sorted,
        preOrdered
    }
}