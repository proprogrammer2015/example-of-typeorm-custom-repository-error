# Install dependencies
```sh
yarn install
```

# Run tests once
```sh
npm run test:once
```

# Run tests in watch mode
```sh
npm t
```

# Compile *.ts to *.js
```sh
npm run ts
```

# Note
To get tests passing restore commented out lines in TypeConnectionManager.ts file.

# Steps to reproduce the issue
1. Run ```sh 
npm t 
```

 Following exception is thrown:

```
/home/twz/projects/example-of-typeorm-custom-repository-error/node_modules/typeorm/entity-manager/MongoEntityManager.js:7
        extendStatics(d, b);
        ^

TypeError: Object prototype may only be an Object or null: undefined
    at setPrototypeOf (<anonymous>)
    at __extends (/home/twz/projects/example-of-typeorm-custom-repository-error/node_modules/typeorm/entity-manager/MongoEntityManager.js:7:9)
    at /home/twz/projects/example-of-typeorm-custom-repository-error/src/entity-manager/MongoEntityManager.ts:52:41
    at Object.<anonymous> (/home/twz/projects/example-of-typeorm-custom-repository-error/src/entity-manager/MongoEntityManager.ts:52:1)
    at Module._compile (module.js:643:30)
    at Module._extensions..js (module.js:654:10)
    at extensions.(anonymous function) (/home/twz/projects/example-of-typeorm-custom-repository-error/node_modules/require-precompiled/index.js:16:3)
    at Object.require.extensions.(anonymous function) [as .js] (/home/twz/projects/example-of-typeorm-custom-repository-error/node_modules/ava/lib/process-adapter.js:100:4)
    at Module.load (module.js:556:32)
    at tryModuleLoad (module.js:499:12)
    at Function.Module._load (module.js:491:3)
    at Module.require (module.js:587:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/home/twz/projects/example-of-typeorm-custom-repository-error/src/connection/Connection.ts:18:1)
    at Module._compile (module.js:643:30)
    at Module._extensions..js (module.js:654:10)

  1 exception

  ✖ TypeConnectionManager.test.js exited with a non-zero exit code: 1
  ```

