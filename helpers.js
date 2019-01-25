function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

function defer() {
  let res;
  let rej;

  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}
