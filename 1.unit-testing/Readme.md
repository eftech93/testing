# Unit tests

What's an Unit Test (UT)?

A level of testing that focuses on single units of execution (blocks, methods, functions, classes, processes). It does not include dependencies of those blocks. It can verify internal state changes, output or code execution.

## How Unit Test works?

![Sequence diagram of how an unit test should work](/1.unit-testing/diagrams_images/unit_test_sequence_diagram.png)

As per shown in the sequence diagram, the testing oracle defines the input and the expected output from the code to be tested. And then executes the function/class, block of code, and the it determines whether or not the output is correct. Before executing the code, the oracle can load resouces that may be required on the execution of the method (also called dependencies or execution application state).

# How to Unit Test a block of code

One of the biggest challenges on UT is understanding the limit of an UT, it can be found that in many places developers tend to test a method and its dependencies, instead of focusing on the method itself. The last practice is actually called integration testing (see integration testing).

Another challenge on UT, is that many developers not necesarily apply UTs following a significant order.

Let say, we have the next example:

![Function dependency diagrams](/1.unit-testing/diagrams_images/unit_test_dependencies.png)

Where A, B, C, D, E and H are functions defined in a program, in which arrows are dependencies of usage between methods (A -> B, means that the method A uses the method B).

Taking in count the problems described priviously, we can find that :

- Developers would start testing from Top to Bottom, starting by A, B, E, C, D and H.
- When testing A, the would also test other methods like B, C and even H.
- The code developed (A, B, C, B, E, H) can be really hard to UT, because how dependencies are used.
- Some of the UT may be useless.
- Some of the UT does not test internal states.

To specify better those issues here we had an implementation:

```js
function a(){
    const someValue = someValueGlobal * ...
    let bValue = b(someValue);
    ...
    if(bValue === ...){
        return ...
    }else if(bValue === ...){
        return ...
    }
}

function b(value){
    if(value === ...){
        return c(value);
    }else if(value === ...){
        return d(value);
    }else{
        ...
    }
}
```

As it can be observed in the method A, it would be hard to test the method by it self, due to the fact, that the dependency of B is hard to be broken, and we need to properly understand how it works to be able to test a.

Also, A method may depend on a global state, which can be hard to modify (assign desired value to global state).

Trying to test:

```js
test("Testing A method ", ()=>{
    let expectedValue = "expected_result"
    const result = a();//As we can see we cannot apply global state changes
    expect(result).toBe(expectedValue)
});
```

In the previous example, it became clear that is deficult to test the A method, as it depends on a global state and it depends on other functions.

In order to properly test all the code we have to apply some changes:
- Make the code Testeable
- Usage of stubs and mocks
- Define proper limit on UT
- Create test cases
- Define coverage

## Making the code Testeable

This is maybe one of the biggest challenge now days on UT, many developers tend to add way to much logic on a method and many dependencies (hard), which complex the UT work.

To avoid those problems here is a list of what can be done to improve that:
- Use of dependency injection(DI): dependencies are injected to the class, instead of being created within the class/method/program
- Use of patterns or principles:
  - GRASP
  - SOLID
  - Gang of 4
  - Keep it simple
- Avoid global state dependencies: it's preferable that those dependencies are passed to the method
- Make code deterministic: Code output should always be the same at all times

For the previous example, we can rewrite the code as:
```js
function a(globableValue, functionB){
    const someValue = globalValue * ...;
    let bValue = functionB(someValue);
    if(bValue === ...){
        return ...
    }else if(bValue === ...){
        return ...;
    }else{
        return ...;
    }
}
```

The UT for the new A function:

```js
test("Testing A method - first if true ", ()=>{
    let expectedValue = "expected_result"
    function stubB(input){
        return expected_value_to_trigger_first_if;
    }
    const globalFakeValue = ...;
    const result = a(globalFakeValue, stubB);//As we can see we cannot apply global state changes
    expect(result).toBe(expectedValue)
});

test("Testing A method - second if true ", ()=>{
    let expectedValue = "expected_result"
    function stubB(input){
        return expected_value_to_trigger_second_if;
    }
    const globalFakeValue = ...;
    const result = a(globalFakeValue, stubB);//As we can see we cannot apply global state changes
    expect(result).toBe(expectedValue)
});
```

As we can apreciate, now that the dependencies are passed to the method, we can eassily mock/stub them, and properly create UTs for our A method.

## Testing sequence

Another issue is that many developer forget to test the functions/classes that got no dependencies first. Usually it makes it more easy the testing and we get more code coverage on the UT.

In this case we should start by those methods that have no o less dependencies and finish by those which have more, in this order of ideas, we start by H, C, E, then followed by D, B and finally A.

This will also help to make sure everything works well before getting to the top.

## Stubs and Mocks on UT

Stubs are a piece of code that allows to run the tests (also called dummy code), it does not contain actual logic and you cannot verify how it was called. Mocks are also dummy code, but with the difference that you can verify that was propely called.

Let's say we have the following code:
```js
function a(listElements, functionB){
    const result = [];
    listElements.forEach(e => {
        result.push(e * functionB(e));
    });
    return result;
}
```

We can test it as:

```js
test("Testing A method ", ()=>{
    const expectedReturn = [1, 8, 27];
    //Defining a function is not necessarily but it can be done
    const mockFunction = mocking_lib.mockFunction(f(value){
        return value * value
    });
    const inputList = [1,2,3];
    const result = a(inputList, mockFunction);

    //Check expected result
    expect(result).toBe(expectedReturn);

    //Check internal state execution
    // As our input only has 3 values, the method be should be called ony 3 times.

    //Most of the mocking libs allows you to know how many times a mocking method was called, and even to know the values it was called with.
    expect(mockFunction.mock.calls).toBe(3);
});
```

## What should cover an UT?

## Test Cases

# Code Coverage for UT

# Make the code testeable

![Function dependency diagrams](/1.unit-testing/diagrams_images/unit_test_dependencies.png)

If we try to unit tests the previous program we can have that :

``` javascript
// Function A "implementation"
function A(){
    ...
    let bResult = B();
    ...
    let eResult = E();
    ...
    return ...
}
```

# Testing examples
## Testing Frontend
## Testing Backend 
## Testing Mobile apps

# Discussion about Unit Tests

Is it important to unit test every single function, method, class in a system?
