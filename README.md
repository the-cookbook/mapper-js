# @cookbook/mapper-js
> Fast, reliable and intuitive object mapping.

[![NPM Version][npm-image]][npm-url]
[![CI Status][circleci-image]][circleci-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![GitHub stars][stars-image]][stars-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![GitHub issues][issues-image]][issues-url]
[![Awesome][awesome-image]][awesome-url]
[![install size][install-size-image]][install-size-url]
[![gzip size][gzip-size-image]][gzip-size-url]

![](mapper-js.png)

## Demo

Play around with _mapper-js_ and experience **the magic**!

[![Edit @cookbook/mapper-js](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/cookbookmapper-js-jo7gf?fontsize=14&hidenavigation=1&theme=dark)

## Installation

```sh
npm install @cookbook/mapper-js --save
#or
yarn add @cookbook/mapper-js
```

## How to use

### 1) Know the structure from your source data

Before we start, it is essential that we know your data structure
so we can map it accordingly.

For this demo case, let's assume that we have the following object:

```js
const source = {
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe'
    },
    age: 32,
    drinks: ['beer', 'whiskey'],
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States'
      },
      {
        street: '1600 Amphitheatre',
        city: 'Mountain View',
        state: 'CA',
        postalCode: 94043,
        country: 'United States',
      },
    ]
  }
}
```


### 2) Create your mapping using dot notation

At this step, we need to create our `mapping` against our data `source`.

We will be using `dot notation` to create our `final structure`.

> For more info about `dot notation` API, check out the [documentation](https://github.com/the-cookbook/dot-notation)

With `mapper`, it is possible to `get` _one_ or _several_ values from our `source`
and even `transform` it in the way we need.

For that, `map()` accepts `single dot notation` path or
`an array of dot notation paths`. E.g.: `map('person.name.firstName')`, `map([person.name.firstName, person.name.lastName]);`'

Those values can be _transformed_ by using the `.transform()` method, which expects a `function` as argument and provides
the selected values as array in the `parameter`. 

> For more information about the usage, check the [API Documentation](#api-documentation).


Now let's create our `mapping`!

```js
import mapper from '@cookbook/mapper-js';

...

const mapping = mapper((map) => ({
  'person.name': map('person.name')
                .transform(({ firstName, lastName }) => `${firstName} ${lastName}`)
                .value,
  'person.lastName': map('person.lastName').value,
  'person.isAllowedToDrive': map(['person.age', 'person.drinks'])
  				.transform((age, drinks) => age > 18 && drinks.includes('soft-drink'))
  				.value,
  address: map('person.address').value,
  defaultAddress: map('person.address[0]').value,
}));
```


### 3) Create your mapped object

```js
import mapper from '@cookbook/mapper-js';
...

const result = mapping(source);
/* outputs 
{
  person: {
    name: 'John Doe',
    isAllowedToDrive: false,
  },
  address: [
    {
      street: 'Infinite Loop',
      city: 'Cupertino',
      state: 'CA',
      postalCode: 95014,
      country: 'United States'
    },
    ...
  ],
  defaultAddress: {
    street: 'Infinite Loop',
    city: 'Cupertino',
    state: 'CA',
    postalCode: 95014,
    country: 'United States'
  }
}
*/

```

# API Documentation

## mapper

**Type:** `function()`
**Parameter:** `mapping: Mapping`
**Return:** `<T>(source: object | object[], options?: Options) => T extends [] ? T[] : T`,
**Signature:** `(mapping: Mapping) => <T>(source: object | object[], options?: Options) => T extends [] ? T[] : T`


**Description:**

  `mapper()` is the main method and responsible for mapping the _values_ from your _data source_ against the _mapping instructions_.
  It accepts `dot notation` path(s) as `key(s)`.

Example:

```ts
// raw definition
const mapping = mapper((map) => ({
    ...
}));

// with map() query
const mapping = mapper((map) => ({
  'employee.name': map('person.name.firstName').value,
  'employee.age': map('person.name.age').value,
  'employee.address': map('person.address').value,
}));
```

  As a result from the above implementation, `mapper()` return a new `function` to map and compile your _source data_ against your _mapping_.

  It accepts an extra (_optional_) argument defining the [_global mapping options_](#mapper-options).

Example:

```ts
...

mapping(source, options);

/* outputs 
{
  employee: {
    name: 'John',
    age: 32,
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States'
      },
      ...
    ],
  },
}
*/
```
___


## map

**Type:** `function`
**Parameter:** `keys: string | string[], options?: Options` 
**Return:** `MapMethods<T>`,
**Signature:** `<T = unknown>(keys: string | string[], options?: Options) => MapMethods<T>`

**Description:** 

  `root` method retrieves values from your _source data_ using `dot notation` path, it accepts a string or array of string.

  It accepts an extra (_optional_) argument to define the [_mapping options for current entry_](#mapper-options), _overriding_ the _global mapping options_.

Example:
```ts
map('person.name.firstName');
map(['person.name.firstName', 'person.name.lastName']);
map(['person.name.firstName', 'person.name.lastName'], options);
```


#### `transform`

**Type:** `function`
**Parameter:** `...unknown[]`
**Return:** `unknown | unknown[]`,
**Signature:** `(...args: unknown[]) => unknown | unknown[]`

**Description:** 

  `.transform` method provides you the ability to _transform_ the retrieved value(s) from `map()` according to your needs, and for that, it expects a return value.

  `.transform` provides you as _parameter_, the retrieved value(s) in the **same order** as defined in the `map()` method, otherwise

Example:
```ts
// single value
map('person.name.firstName')
   .transform((firstName) => firstName.toLoweCase());

// multiple values
map(['person.name.firstName', 'person.name.lastName'])
   .transform((firstName, lastName) => `${firstName} ${lastName}`);
```


#### `value`

**Type:** `readonly`
**Return:** `T`
**Description:** 

  `.value` returns the value of your `dot notation` query. If transformed, returns the transformed value.

Example:
```ts
// single value
map('person.name.firstName')
   .transform((firstName) => firstName.toLoweCase())
   .value;

// multiple values
map(['person.name.firstName', 'person.name.lastName'])
   .transform((firstName, lastName) => `${firstName} ${lastName}`)
   .value;
```


## Mapper Options

### defaults

```js
{
  omitNullUndefined: false,
  omitStrategy: () => false,
}
```

### Details

**`omitNullUndefined`**

**Type:** `boolean`
**default value:** `false`

**Description:** 

  Removes `null` or `undefined` entries from the _mapped_ object.

Example:

```ts
/* source object
{
  person: {
    name: 'John',
    lastName: 'Doe',
    age: 32,
  },
}
*/
const mapping = mapper((map) => ({
  'name': map('person.name').value,
  'age': map('person.age').value,
   // source doesn't have property 'address',
   // therefore will return "undefined"
  'address': map('person.address').value,
}));

mapping(source, { omitNullUndefined: true });
/* outputs 
{
  name: 'John',
  age: 32,
}
*/

```

**`omitStrategy`**

**Type:** `function`
**Parameter:** `value: unknown | unknown[]`
**Return:** `boolean`
**Signature:** `(value: unknown | unknown[]) => boolean`

**Description:** 

  Defines a _custom strategy_ to omit (_suppress_) entries from the _mapped object_.

Example:
```tsx
/* source object
{
  person: {
    name: 'John',
    lastName: 'Doe',
    age: 32,
    address: {
      street: 'Infinite Loop',
      city: 'Cupertino',
      state: 'CA',
      postalCode: 95014,
      country: 'United States',
    }
  },
}
*/

const customOmitStrategy = (address: Record<string, string>): boolean => address && address.city === 'Cupertino';

const mapping = mapper((map) => ({
  'name': map('person.name').value,
  'age': map('person.age').value,
  'address': map('person.address').value,
}));

mapping(source, { omitStrategy: customOmitStrategy });
/* outputs 
{
  name: 'John',
  age: 32,
}
*/

```

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@cookbook/mapper-js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@cookbook/mapper-js
[npm-downloads]: https://img.shields.io/npm/dm/@cookbook/mapper-js.svg?style=flat-square
[circleci-image]: https://circleci.com/gh/the-cookbook/mapper-js.svg?style=svg
[circleci-url]: https://circleci.com/gh/the-cookbook/mapper-js
[stars-image]: https://img.shields.io/github/stars/the-cookbook/mapper-js.svg
[stars-url]: https://github.com/the-cookbook/mapper-js/stargazers
[vulnerabilities-image]: https://snyk.io/test/github/the-cookbook/mapper-js/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/the-cookbook/mapper-js
[issues-image]: https://img.shields.io/github/issues/the-cookbook/mapper-js.svg
[issues-url]: https://github.com/the-cookbook/mapper-js/issues
[awesome-image]: https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg
[awesome-url]: https://github.com/the-cookbook/mapper-js
[install-size-image]: https://packagephobia.now.sh/badge?p=@cookbook/mapper-js
[install-size-url]: https://packagephobia.now.sh/result?p=@cookbook/mapper-js
[gzip-size-image]: http://img.badgesize.io/https://unpkg.com/@cookbook/mapper-js/lib/mapper.min.js?compression=gzip
[gzip-size-url]: https://unpkg.com/@cookbook/mapper-js/lib/mapper.min.js
