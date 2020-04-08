export const checkSupport = fn => {
  let support;

  try {
    support = !!(fn && fn());
  } catch (error) {
    support = false;
  }

  return `${fn.name || fn.constructor.name}: ${support}`;
};

export const checkList = (fnList = []) => fnList.map(fn => checkSupport(fn));
