
<h1>CodeJS</h1> <image src="codeJS.jpeg" width="200" height="200">

CodeJS is a lightweight JavaScript library that provides a wide range of functions for string manipulation, array operations, object utilities, DOM interactions, math calculations, and more.

## Features

- **String Utilities**: Convert cases, truncate, reverse, slugify, and more.
- **Array Utilities**: Unique, shuffle, chunk, flatten, and other array operations.
- **Object Utilities**: Deep clone, merge, pick, omit, and more.
- **DOM Utilities**: Select elements, manipulate classes, create elements, and handle events.
- **Math Utilities**: Random numbers, factorial, GCD, prime checks, and more.
- **Date Utilities**: Format dates, calculate time differences, and manipulate dates.
- **Function Utilities**: Debounce, throttle, memoize, and more.
- **Browser Storage**: Simplified localStorage handling.

## Installation

You can include `code.js` in your project by downloading the file or using it as a module.

### Direct Script Tag

```html
<script src="https://cdn.jsdelivr.net/gh/G-man124/CodeJS/main.js"></script>
```

### Node.js / CommonJS

```javascript
const CodeJS = require('https://cdn.jsdelivr.net/gh/G-man124/CodeJS/main.js');
```

### AMD

```javascript
require(['https://cdn.jsdelivr.net/gh/G-man124/CodeJS/main.js'], function (CodeJS) {
  // Use CodeJS here
});
```

## Usage

### String Utilities

```javascript
CodeJS.upper("hello"); // "HELLO"
CodeJS.camelCase("hello world"); // "helloWorld"
CodeJS.slugify("Hello World!"); // "hello-world"
```

### Array Utilities

```javascript
CodeJS.unique([1, 2, 2, 3]); // [1, 2, 3]
CodeJS.shuffle([1, 2, 3]); // [2, 1, 3] (randomized)
CodeJS.chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
```

### Object Utilities

```javascript
const obj = { a: 1, b: 2, c: 3 };
CodeJS.pick(obj, ['a', 'c']); // { a: 1, c: 3 }
CodeJS.omit(obj, ['b']); // { a: 1, c: 3 }
```

### DOM Utilities

```javascript
const el = CodeJS.$('#myElement');
CodeJS.addClass(el, 'active');
CodeJS.on(el, 'click', () => console.log('Clicked!'));
```

### Math Utilities

```javascript
CodeJS.randomInt(1, 10); // Random integer between 1 and 10
CodeJS.isPrime(7); // true
CodeJS.clamp(15, 0, 10); // 10
```

### Date Utilities

```javascript
CodeJS.formatDate(new Date(), { year: 'numeric', month: 'long', day: 'numeric' });
// "October 10, 2026"
CodeJS.timeAgo('2026-10-01');
```

### Function Utilities

```javascript
const debouncedFn = CodeJS.debounce(() => console.log('Debounced!'), 300);
debouncedFn();
```

### Browser Storage

```javascript
CodeJS.storage.set('key', { value: 123 });
const data = CodeJS.storage.get('key'); // { value: 123 }
CodeJS.storage.remove('key');
```

## License

This project is licensed under the MIT License.
