const {performance} = require('perf_hooks');
const sortCategoriesForInsert = require('./index.js')
//omitting name since would be more difficult to randomize
//they will all be undefined for test output
let basicInput = [
  {
    id: 0,
    parent_id: null,
  },
  {
    id: 1,
    parent_id: 0,
  },
  {
    id: 2,
    parent_id: 1,
  },
  {
    id: 3,
    parent_id: 1,
  },
  {
    id: 5,
    parent_id: null,
  },
  {
    id: 6,
    parent_id: 5,
  },
  {
    id: 7,
    parent_id: 6,
  },
];

//not sure how valid this is, each tree will be same size. 
//only point is to generate large list size.
function generate(size) {
  let generated = [basicInput];

  for(let i = 0; i < size; i++) {
    let numbersCopy = JSON.parse(JSON.stringify(basicInput));
    let multiplier =  (10 * (i + 1))
    numbersCopy.forEach(val => {
      if(val.parent_id !== null){
        val.parent_id = val.parent_id + multiplier;
      }
      val.id = val.id + multiplier;
    })
    generated.push(numbersCopy);
  }
  let flatArr = generated.flat();
  shuffleArray(flatArr); 

  return flatArr;
}

//Fisher-Yates (aka Knuth) Shuffle modern
//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


function test(size){
  let treeInput = generate(size);

  let startTime = performance.now();

  let treeOutput = sortCategoriesForInsert(treeInput);

  let endTime = performance.now();
  console.log(`ended sort`);
  console.log(`Call to sortCategoriesForInsert took ${endTime - startTime} milliseconds`);
}

test(1000);