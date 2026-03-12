/**
 * 判断是否为纯对象
 * @param item 
 * @returns 
 */
export function isObject(item: any): item is Record<string, any> {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * 深度合并对象
 * 类似于 lodash.merge
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的对象
 */
export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
            Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
