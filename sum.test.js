
const bubbleSort = require("./sum");

beforeEach(() => {
  console.log("Avant test");
});

afterEach(() => {
  console.log("Apres test");
});

describe("fonction bubbleSort", () => {
  const arr = [
      { name: "aicha", age: 21 },
      { name: "hajar", age: 13 }
  ];
    

  test("trie par age croissant", () => {
    const result = bubbleSort([...arr], true, "age"); 
    expect(result).toEqual([
      { name: "hajar", age: 13 },
      { name: "aicha", age: 21 }
    ]);
  });

  test("trie par age decroissant", () => {
    const result = bubbleSort([...arr], false, "age"); 
    expect(result).toEqual([
      { name: "aicha", age: 21 },
      { name: "hajar", age: 13 }
    ]);
  });
  
});
