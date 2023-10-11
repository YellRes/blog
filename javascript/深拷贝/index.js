const wm = new WeakMap();
const deepClone = (obj) => {
  let cloneObj = {};
  // 非对象直接返回
  if (typeof obj !== "function" && typeof obj !== "object") {
    return obj;
  }

  // 查看是否有缓存
  if (wm.has(obj)) {
    return wm.get(obj);
  }

  // 对象
  wm.set(obj, cloneObj);
  for (let key of Object.keys(obj)) {
    cloneObj[key] = deepClone(obj[key]);
  }

  return cloneObj;
};

// Q: Object.keys(obj)
// A: 返回obj中可枚举的字符串键值  不同于for in, for in会遍历原型链中的数据
