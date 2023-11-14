# 基于nextjs的博客项目

### mdx参考

- https://github.com/orgs/mdx-js/discussions/1948
- https://mdxjs.com/guides/syntax-highlighting/#syntax-highlighting-with-the-meta-field
- https://github.com/remcohaszing/rehype-mdx-code-props
- https://colinhemphill.com/blog/markdown-syntax-highlighting-with-the-nextjs-app-router
- https://github.com/hashicorp/next-mdx-remote/blob/main/README.md#react-server-components-rsc--nextjs-app-directory-support

### TODO

- [ ] [next [slug] route re-mounted solution](https://github.com/vercel/next.js/issues/44793#issuecomment-1382458981)

### ps

- PostgreSQL区分表名、字段名的大小写

- `psql -h localhost -p 5432 -U root(用户名) -d test(库名)`: postgres连接
- `TRUNCATE "Menu" RESTART IDENTITY` ：清空 "Menu" 表的数据，并将该表的自增长标识列的起始值重置为 1
- `INSERT INTO "public"."RequsetKey" ("key") VALUES ('test');` : postgres新增数据
- [Prettier code format take a long time to format](https://github.com/prettier/prettier-vscode/issues/2999),If you are using Auto Import - ES6, TS, JSX, TSX extension, try to uninstall it and replace it with Auto Import.卸载掉`Auto Import - ES6, TS, JSX, TSX`
