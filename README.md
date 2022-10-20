# extra-proxy
## Install
```sh
npm install --save extra-proxy
# or
yarn add extra-proxy
```

## API
### bind
```ts
function bind<T extends object>(obj: T, thisArg: object = obj): T
```

Returns a `Proxy` object whose first-level method's `this` is always bound to `thisArg`.

### applyPropertyDecorators
```ts
type Decorator<T> = (value: T) => T

function applyPropertyDecorators<T extends object, U>(
  obj: T
, propertyKeys: PropertyKey[]
, propertyDecorator: Decorator<U>
): T
```
