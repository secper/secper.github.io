---
title: Vue
---

## 设置路径别名

```js {2-6} title="vite.config.ts"
export default defineConfig(async () => ({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));
```

点击路径时跳转到文件，而不是 `vite-env.d.ts`：

```json {2-5} title="tsconfig.json"
{
  "baseUrl": "src",
  "paths": {
    "@/*": ["/*"]
  }
}
```
