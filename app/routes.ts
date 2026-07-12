// import { flatRoutes } from "@react-router/fs-routes";
import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// This automatically maps your file system to the router
export default [
    index("./routes/home.tsx"),
    layout("./routes/character-menu/CharacterMenuLayout.tsx",[
        route("character","./routes/character-menu/character/CharacterScreen.tsx"),
        route("my-work","./routes/character-menu/my-work/MyWork.tsx"),
        route("about","./routes/character-menu/about/About.tsx")
    ]),
    // route("model-paths","./routes/api/characters/model-paths.ts")
] satisfies RouteConfig;