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
function applyPropertyDecorators<
  Obj extends object
, Keys extends keyof Obj
, OldValue
, NewValue
>(
  obj: Obj
, propertyKeys: Keys[]
, propertyDecorator: (value: OldValue) => NewValue
): MapPropsByKey<Obj, Keys, NewValue>
```
