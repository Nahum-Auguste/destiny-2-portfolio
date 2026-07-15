// import { flatRoutes } from "@react-router/fs-routes";
import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// This automatically maps your file system to the router
export default [
    index("./routes/home.tsx"),
    route("orbit","./routes/orbit/Orbit.tsx"),
    layout("./routes/character-menu/CharacterMenuLayout.tsx",[
        route("character","./routes/character-menu/character/CharacterScreen.tsx"),
        route("about-me","./routes/character-menu/about/About.tsx")
    ]),
    layout("./routes/net-menu/NetMenuLayout.tsx",[
        route("my-work","./routes/net-menu/my-work/MyWork.tsx")
    ])
    // route("model-paths","./routes/api/characters/model-paths.ts")
] satisfies RouteConfig;