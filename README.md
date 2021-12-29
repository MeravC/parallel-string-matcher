# parallel-string-matcher

> This program's goal is to find specific strings in a large text.


## Program Description
My program contains 3 parts:
1. main- reads a large text file and sends each part to the matcher.
After all matchers are completed, it calls to the aggregator to combine and save the results.
2. matcher- gets a text as input and searches for matches of an array of common English names.
The result is a map from a word to its location(s) in the text. Each matcher runs in a separate thread.
3. aggregator- aggregates all the results from all the matchers and saves the results in the file.

For the threads, The matchers run in parallel, each matcher is responsible to allocate the location(s) of common English names in the part of the text assigned to it (default to 1000 lines).
Once all finished, the aggregator is called to collect and write all the results into a result file.
I choose to save all the results in the file "theResult.json" because there is a lot of results and in the file, it's more readable.

## Future Thoughts
If I had more time, I would invest in how to divide the big text more efficiently for my program.
Additionally, I would add assign threads in a more efficient way.


## Install

Clone this repo and run

```
$ npm install
```


## Usage

```
$ node .\main.js
```

## output example

{
  "Arthur": [
    {
      "lineOffset": 2,
      "charOffset": 72
    },..
   ],
   "Jose": [
    {
      "lineOffset": 45,
      "charOffset": 1354
    }
  ],
  "John": [
    {
      "lineOffset": 350,
      "charOffset": 20578
    },
    {
      "lineOffset": 420,
      "charOffset": 27296
    },...
  ]...
 }
