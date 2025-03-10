/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as IdImport } from './routes/$id'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IdRoute = IdImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$id': {
      id: '/$id'
      path: '/$id'
      fullPath: '/$id'
      preLoaderRoute: typeof IdImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$id': typeof IdRoute
  '/auth': typeof AuthRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$id': typeof IdRoute
  '/auth': typeof AuthRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$id': typeof IdRoute
  '/auth': typeof AuthRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/$id' | '/auth'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/$id' | '/auth'
  id: '__root__' | '/' | '/$id' | '/auth'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  IdRoute: typeof IdRoute
  AuthRoute: typeof AuthRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  IdRoute: IdRoute,
  AuthRoute: AuthRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$id",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$id": {
      "filePath": "$id.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
