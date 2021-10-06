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
  {
    name: "Women Accessories",
    id: 2,
    parent_id: 23,
  },
  {
    name: "Women Watches",
    id: 60,
    parent_id: 2,
  },
  {
    name: "Women",
    id: 23,
    parent_id: null,
  },
];
const outputData = [
  {
    name: "Men",
    id: 20,
    parent_id: null,
  },
  {
    name: "Women",
    id: 23,
    parent_id: null,
  },
  {
    name: "Accessories",
    id: 1,
    parent_id: 20,
  },
  {
    name: "Women Accessories",
    id: 2,
    parent_id: 23,
  },
  {
    name: "Watches",
    id: 57,
    parent_id: 1,
  },
  {
    name: "Women Watches",
    id: 60,
    parent_id: 2,
  },
];

//start
console.log(sortCategoriesForInsert(inputData));

function initLookupMap(inputData) {
  //this map is used to quickly reference each childs parent id, lets us iterate once through input array
  const indexMap = inputData.reduce((accumulator, element, index) => {
    accumulator[element.id] = index;
    element.children = [];
    return accumulator;
  }, {});
  return indexMap;
}

function sortCategoriesForInsert(inputData) {
  const indexMap = initLookupMap(inputData);
  let listOfTrees = createListOfTrees(inputData, indexMap);
  let treesOutput = listOfTrees
    .map((val) => {
      return getCategoryOutput(val);
    })
    .flat();
  return treesOutput;
}

function createListOfTrees(inputData, indexMap) {
  let listOfTrees = [];
  //our lookup map serves to save time here.
  inputData.forEach((val) => {
    let parent_id = val.parent_id;
    if (parent_id === null) {
      listOfTrees.push(val);
    } else {
      inputData[indexMap[parent_id]].children.push(val);
    }
  });
  return listOfTrees;
}

//Since we need to get category of parents before children are inserted
//We use a breadth-first search
function getCategoryOutput(startingNode) {
  const visited = [];
  const queue = [startingNode];

  while (queue.length) {
    const node = queue.shift();
    visited.push(cleanOutput(node));
    if (node.children) {
      queue.push(...node.children);
    }
  }
  return visited;
}

function cleanOutput(node) {
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
