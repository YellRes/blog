const oldVNode = {
  type: "div",
  children: [
    { type: "p", children: "1" },
    { type: "p", children: "2" },
    { type: "p", children: "3" },
  ],
};

function pathChildren(n1, n2, container) {
  if (typeof n2.children === "string") {
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    const oldLen = oldChildren.length;
    const newLen = newChildren.length;

    let lastIndex = 0;
    for (let i = 0; i < newChildren.length; i++) {
      const newNode = newChildren[i];
      let j = 0;
      let isNewNode = true;
      for (j; j < oldLen; j++) {
        const oldNode = oldChildren[j];
        if (newNode.key === oldNode.key) {
          isNewNode = false;
          patch(oldNode, newNode, container);
          if (j > lastIndex) {
            lastIndex = j;
          } else {
            const el = oldNode.el;
            // 把el 放到newChildren[i - 1]的后面
            const lastNewChild = newChildren[i - 1].el;
            lastNewChild.parentNode.insertBefore(
              newNode,
              lastNewChild.nextSibing
            );
          }
          break;
        }
      }

      // 新增节点
      if (isNewNode) {
        // 把节点插入到上一个节点
        const lastNewChild = newChildren[i - 1].el;
        if (lastNewChild) {
          lastNewChild.parentNode.insertBefore(
            newNode,
            lastNewChild.nextSibing
          );
        } else {
          container.append(newNode);
        }
      }
    }

    const commonLength = Math.min(oldLen, newLen);

    for (let i = 0; i < commonLength; i++) {
      patch(oldChildren[i], newChildren[i]);
    }

    if (newLen > oldLen) {
      for (let i = commonLength; i < newLen; i++) {
        patch(null, newChildren[i], container);
      }
    } else {
      for (let i = commonLength; i < oldLen; i++) {
        unmount(oldChildren[i]);
      }
    }
  } else {
  }
}
