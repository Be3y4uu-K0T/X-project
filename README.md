# X-PROJECT

> TODO: Обновить README для запуска кода!

`X-project` -- это кодовое название нашего проекта решения цифровой платформы проекта «Креатур», который предствляет из себя набор из 2 модулей `server.mts` и `client.mts`, написанные на ЯП `typescript`.

Вначале нам потребуется установить последнюю версию `node.js` (19.4.0):
```
$ brew install node
$ node --version
v19.4.0
```

А также обновить, если требуется `npm` до послдней версии (9.3.1):
```
$ npm update -g npm
$ npm --version
9.3.1
```

Затем нам потребуется установить все зависимости для проекта, которые описаны в файле `package-lock.json`, командой:
```
$ npm install
```

Так же в файле `package.json` описаны два скрипта, один для компиляции кода из `typescript` в `javascript` -- `compile`, и другой для запуска сервера (включает в себя также компиляцию) -- `start`.

Запуситить сервер можно используя команду:
```
$ npm run start

...

🚀 Server listening at: http://localhost:4000/ 🚀
```

Дальше переходим по указанному url (http://localhost:4000/), на котором запустился наш сайт, Et Voilà! У нас что-то есть 😁 🎉
