//this lookup map is used to map each element ID to an array index (of the original input)
//we also take advantage of this iteration to initialize empty children arrays on each array element.
//this lets us save time on 2nd iteration, we basically can push the children to each appropriate child when found
function initLookupMap(inputData) {
  const indexMap = inputData.reduce((accumulator, element, index) => {
    accumulator[element.id] = index;
    element.children = [];
    return accumulator;
  }, {});
  return indexMap;
}

//here we are creating the list of trees. Each null parent_id gets an entry in the list.
//We iterate the entire input array,
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

//once we have our list of trees we iterate the list
//and perform a breadth first traversal on each list.
//I believe there may be a quicker way to do this by doing a BFS search on the entire list of trees at once.
//To avoid doing the search on
function generateOutput(listOfTrees) {
  return listOfTrees
    .map((val) => {
      return getCategoryOutput(val);
    })
    .flat();
}

//Since we need to get category of parents before children are inserted
//We use a breadth-first search
//this guarantees parent ids come out before their respective children
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

//simple helper function to remove the .children property
function cleanOutput(node) {
  return {
    name: node.name,
    id: node.id,
    parent_id: node.parent_id,
  };
}

//main function
function sortCategoriesForInsert(inputData) {
  const indexMap = initLookupMap(inputData);
  let listOfTrees = createListOfTrees(inputData, indexMap);
  return generateOutput(listOfTrees);
}

module.exports = sortCategoriesForInsert;
