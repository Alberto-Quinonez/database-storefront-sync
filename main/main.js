const inputData = [
  {
    name: "Accessories",
    id: 1,
    parent_id: 20,
  },
  {
    name: "Watches",
    id: 57,
    parent_id: 1,
  },
  {
    name: "Toys",
    id: 69,
    parent_id: 1,
  },
  {
    name: "Men",
    id: 20,
    parent_id: null,
  },
  //   {
  //     name: "Women Accessories",
  //     id: 2,
  //     parent_id: 23,
  //   },
  //   {
  //     name: "Women Watches",
  //     id: 60,
  //     parent_id: 2,
  //   },
  //   {
  //     name: "Women",
  //     id: 23,
  //     parent_id: null,
  //   },
];
const outputData = [
  {
    name: "Men",
    id: 20,
    parent_id: null,
  },
  //   {
  //     name: "Women",
  //     id: 23,
  //     parent_id: null,
  //   },
  {
    name: "Accessories",
    id: 1,
    parent_id: 20,
  },
  //   {
  //     name: "Women Accessories",
  //     id: 2,
  //     parent_id: 23,
  //   },
  {
    name: "Watches",
    id: 57,
    parent_id: 1,
  },
  //   {
  //     name: "Women Watches",
  //     id: 60,
  //     parent_id: 2,
  //   },
];

//start
console.log(sortCategoriesForInsert());

function sortParents(inputData) {
  const parentList = [];
  const childList = [];
  //this map is used to quickly reference each childs parent id, lets us iterate once through input array
  const indexMap = [];
  inputData.forEach((val, index) => {
    if (val.parent_id === null) {
      parentList.push(val);
    } else {
      childList.push(val);
    }
    indexMap[val.id] = index;
  });
  return [parentList, childList, indexMap];
}

function sortCategoriesForInsert() {
  const [parentList, childList, indexMap] = sortParents(inputData);

  let listOfTrees = list_to_tree(inputData);
  //   parentList.forEach(parent => {
  //     listOfTrees.push(createTree(parent, childList, indexMap));
  //   });

  //   let output = createCategoryOuput(listOfTrees, console.log);
  return output;
}

// function createTree(parent, childList, indexMap) {
//     let outputTree = parent;
//     childList.forEach((e) => {
//       //find parent element with our map
//       const parentElement = inputData[indexMap[e.parent_id]];
//       // Add our current el to its parent's `children` array
//       parentElement.children = [...(parentElement.children || []), e];
//     });
//     return outputTree;
// }

function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== "0") {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

//Since we need to get category of parents before children are inserted
//We use a breadth-first search
function createCategoryOuput(starting, cb) {
  const queue = [starting];
  while (queue.length) {
    const node = queue.shift();
    cb(printOutput(node));
    if (node.children) {
      queue.push(...node.children);
    }
  }
}

function printOutput(node) {
  return {
    name: node.name,
    id: node.id,
    parent_id: node.parent_id,
  };
}

function testJson() {
  let output = sortCategoriesForInsert(input);

  if (output) {
  }
}
