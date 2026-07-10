import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("./routes/character-menu/CharacterMenuLayout.tsx", [
        route('character',"./routes/character-menu/character/Character.tsx"),
        route('about',"./routes/character-menu/about/About.tsx"),
        route('my-work',"./routes/character-menu/my-work/MyWork.tsx")
    ])
    
] satisfies RouteConfig;
