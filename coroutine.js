const coroutine = function(generatorFunction) {
  const promise = defer();
  const generator = generatorFunction();
  next();

  return promise;

  // Call next() or throw() on the generator as necessary
  function next(value, isError) {
    const response = isError ?
      generator.throw(value) : generator.next(value);

    if (response.done) {
      return promise.resolve(response);
    }

    handleAsync(response.value);
  }

  // Handle the result the generator yielded
  function handleAsync(async) {
    if (async && async.then) {
      handlePromise(async);
    } else if (typeof async === 'function') {
      var v = async();
      next(v);
    } else if (async === undefined) {
      setTimeout(next, 0);
    } else {
      next(new Error(`Invalid yield ${async}`), true);
    }
  }

  // If the generator yielded a promise, call `.then()`
  function handlePromise(async) {
    async.then(next, (error) => next(error, true));
  }
};
