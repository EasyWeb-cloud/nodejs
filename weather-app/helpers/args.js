const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;
  rest.forEach((elem) => {
    if (elem[0] === "-") {
      res[elem.substring(1)] = undefined;
    } else {
      const objectKeys = Object.keys(res);
      const lastKey = objectKeys[objectKeys.length - 1];
      res[lastKey] = res[lastKey] ? [...res[lastKey], elem] : [elem];
    }
  });

  return res;
};

export { getArgs };
