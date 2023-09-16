# gpt-prompter-frontend

## development

```sh
# expo
npm start

# tailwind
npm run dev:tailwind
```

## build

```sh
npm ci
npm run build:tailwind

# build and submit via EAS
npx eas-cli@latest build --platform ios --auto-submit --non-interactive --no-wait

# push store metadata
npx eas-cli@latest metadata:push
```

### build & update

```sh
# development channel

## build
npx eas-cli@latest build --profile development --platform ios

## update
npx eas-cli@latest update --branch development --platform ios
```
