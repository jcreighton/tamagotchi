const coroutine = function(generatorFunction) {
  const generator = generatorFunction();
  next();

  // Call next() or throw() on the generator as necessary
  function next(value, isError) {
    const response = isError ?
      generator.throw(value) : generator.next(value);

    if (response.done) {
      return;
    }

    handleAsync(response.value);
  }

  // Handle the result the generator yielded
  function handleAsync(async) {
    if (async && async.then) {
      handlePromise(async);
    } else if ('GeneratorFunction' === async.constructor.name) {
      handleThunk(async);
    } else if (typeof async === 'function') {
      // console.log('async');
      handleAsync(async());
    } else if (async === undefined) {
      // console.log('timeout');
      setTimeout(next, 0);
    } else {
      // console.log('error');
      next(new Error(`Invalid yield ${async}`), true);
    }
  }

  // If the generator yielded a promise, call `.then()`
  function handlePromise(async) {
    // console.log('promise');
    async.then(next, (error) => next(error, true));
  }
  // If the generator yielded a thunk, call it
  function handleThunk(async) {
    // console.log('thunk');
    async((error, v) => {
      error ? next(error, true) : next(v);
    });
  }
};

// coroutine(function* () {
//   while(true) {
//     yield queue.shift();
//   }
// });