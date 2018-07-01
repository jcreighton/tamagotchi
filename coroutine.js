const coroutine = function(generatorFunction) {
  const generator = generatorFunction();
  console.log(generator);
  next();

  // Call next() or throw() on the generator as necessary
  function next(value, isError) {
    const response = isError ?
      generator.throw(value) : generator.next(value);
      console.log(generator, response);

    if (response.done) {
      return;
    }

    handleAsync(response.value);
  }

  // Handle the result the generator yielded
  function handleAsync(async) {
    if (async && async.then) {
      handlePromise(async);
    } else if ((async && async.constructor && async.constructor.name) === 'GeneratorFunction') {
      handleThunk(async);
    } else if (typeof async === 'function') {
      console.log('function');
      var v = async();
      next(v);
    } else if (async === undefined) {
      console.log('timeout');
      setTimeout(next, 0);
    } else {
      next(new Error(`Invalid yield ${async}`), true);
    }
  }

  // If the generator yielded a promise, call `.then()`
  function handlePromise(async) {
    console.log('promise');
    async.then(next, (error) => next(error, true));
  }
  // If the generator yielded a thunk, call it
  function handleThunk(async) {
    console.log('thunk', async);
    async((error, v) => {
      error ? next(error, true) : next(v);
    });
  }
};
