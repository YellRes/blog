let bucket = new WeakMap();
let activeEffect = null;

const effect = (fn) => {
  activeEffect = fn;
  cleanup(activeEffect);
  activeEffect.deps = [];
  fn();
};

const cleanup = (fn) => {
  for (let i = 0; i < activeEffect.deps.length; i++) {
    activeEffect.deps[i].delete(fn);
  }
};

const obj = new Proxy(
  {
    name: "yellres",
    age: 12,
  },
  {
    set(obj, key, newVal) {
      obj[key] = newVal;
      trigger(obj, key);
    },

    get(obj, key) {
      track(obj, key);
      return obj[key];
    },
  }
);

const trigger = (obj, key) => {
  let keyMap = bucket.get(obj);

  if (!keyMap) return;
  let effectSet = keyMap.get(key);
  if (!effectSet) return;
  for (let effectFn of effectSet) {
    effectFn && effectFn();
  }
};

const track = (obj, key) => {
  if (!activeEffect) return;

  let keyMap = bucket.get(obj);
  if (!keyMap) {
    bucket.set(obj, (keyMap = new Map()));
  }

  let effectSet = keyMap.get(key);
  if (!effectSet) {
    keyMap.set(key, (effectSet = new Set()));
  }

  effectSet.add(activeEffect);
  activeEffect.deps.push(effectSet);
};

effect(() => {
  console.log(obj.age === 12 ? "this is effect1" + obj.name : obj.age);
});
