import React from "react";
import {createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: React.lazy(() => import("./layout/LayoutBase")),
    children: [
      {
        index: true,
        Component: React.lazy(() => import("./containers/Home")),
      },
      {
          path: "podcast",
          async lazy() {
            const { default: Component } = await import("./containers/Podcast");
            return { Component };
          },
          children: [
            {
              path: ":podcastId",
              async lazy() {
                const { default: Component } = await import("./containers/Episodes");
                return { Component };
              },
            },
            {
              path: ":podcastId/episode/:episodeId",
              async lazy() {
                const { default: Component } = await import("./containers/Episode");
                return { Component };
              },
            },
          ],
      },
    ]
  },
], {
  basename: process.env.NODE_ENV === 'production' ? "/podcaster/" : '/',
});

export default router;