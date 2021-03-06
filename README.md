# database-storefront-sync

## High level algorithm

*Note, I specifically did not do any empty/null/undefined checks on the input since I assumed the input would be complete as stated in specs.

### Lookup Map
The idea here is to go with a first pass through data and make a lookup map.
This map will basically associate each node's id to the index in the original dataset.
This allows us to quickly fetch the correct element by id, removes the need to later search the dataset for a particular node.
We also take advantage of this iteration to initialize a children array property on each node of the dataset.


### List of Trees
Here we go for a second iteration through the data set, but this time with the new lookup map.
Each iteration we either, if the value is a root parent, add to list of trees, otherwise, append the value to the children of its parent_id based on the lookup map. 

On exit, we should have as many trees as there are root elements in the input dataset.

### generate output
Here we iterate on each tree, and do a breadth first traversal. This guarantees that in each tree, the parent nodes come out first. In order to satisfy the requirements.


## test.js
This is a small test file to try to see the performance of the algorithm.

### generate
this simply creates equal sized trees, as many times as requested. 
Flattens the trees into one array, then shuffles the array for use in category sort.


The tree generation was not ideal, it does not produce very deep trees. 

But I attempted a few cases with increasing number of trees to get an idea of the speed for sorting the categories.

AMD Ryzen 5 5600x @4GHz 32GB ram @3600MHz

| Input size (num of roots)   | Average time  | run 1(ms)     | run 2(ms)     |  run 3(ms)    |
| --------------------------- |:-------------:|:-------------:|:-------------:|:-------------:|
|                       1000  |       5.5800  |       4.8531  |       6.9624  |       4.9247  |
|                      10000  |      41.8185  |      43.6268  |      40.6077  |      41.2211  |
|                      50000  |     343.0160  |     338.4635  |     344.1247  |     346.4598  |
|                     100000  |     766.6213  |     741.6397  |     777.1347  |     781.0896  |
|                    1000000  |   21215.7688  |   20193.6161  |   22157.3526  |   21296.3377  |
-----------------------------------------------------------------------------------------------

*Update, managed to generate an input file with varying depth from 13-20 tree depth, with about 100 trees
and speed was about 4505.9990ms. Root id is 0, not null.

