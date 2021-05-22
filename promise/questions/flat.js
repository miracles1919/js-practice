var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

function flatDeep(arr, d) {
  return d > 0
    ? arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
          return acc.concat(flatDeep(val, d - 1));
        } else {
          return acc.concat(val);
        }
      }, [])
    : arr.slice();
}

function eachFlat(arr, d) {
  const result = [];

  (function flat(arr, d) {
    arr.forEach((item) => {
      if (Array.isArray(item) && d) {
        flat(item, d - 1);
      } else {
        result.push(item);
      }
    });
  })(arr, d);

  return result;
}

function stackFlat(arr) {
  const stack = [...arr];
  const res = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }

  return res.reverse();
}

function* genFlat(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* genFlat(item);
    } else {
      yield item;
    }
  }
}

// console.log(arr.flat(Infinity))
// console.log(flatDeep(arr, Infinity))
// console.log(eachFlat(arr, Infinity))
// console.log(stackFlat(arr));
console.log([...genFlat(arr)]);
