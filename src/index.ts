import app from "./app";
import World from "./world/World";
import WorldGenerator from "./generators/WorldGenerator";

export namespace Game {
    let world: World = new World();

    export const getWorld = (): World => world;

    const setValue = (element: HTMLInputElement) => {
        const type: any = element.dataset.type;
        WorldGenerator.setThreshold(type, parseFloat(element.value));
        new WorldGenerator(world).generate();
        element.parentNode.childNodes[2].textContent = element.value;
    };

    world.debug = true;
    app.stage.addChild(world);

    console.log(World.height, World.width);

    window.onload = () => {
        new WorldGenerator(world).generate();
    };
    document.querySelector("[data-generate]").addEventListener("click", () => {
        WorldGenerator.reset();
        new WorldGenerator(world).generate();
    });
    document.querySelector("[data-copy]").addEventListener("click", () => {
        navigator.clipboard.writeText(`public static ElevationDeepOceanThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="ElevationDeepOceanThreshold"]').value
        };
        public static ElevationSeaLevelThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="ElevationSeaLevelThreshold"]').value
        };
        public static ElevationMountainThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="ElevationMountainThreshold"]').value
        };
    
        public static MoistureVolcanoThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="MoistureVolcanoThreshold"]').value
        };
        public static MoistureMountainThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="MoistureMountainThreshold"]').value
        };
        public static MoistureGrassThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="MoistureGrassThreshold"]').value
        };
        public static MoistureForestThreshold = ${
            document.querySelector<HTMLInputElement>('[data-type="MoistureForestThreshold"]').value
        };`);
    });
    document.querySelectorAll("[data-type]").forEach((input: HTMLInputElement) => {
        input.value = (WorldGenerator.getThreshold(input.dataset.type) as unknown) as string;
        setValue(input);

        input.addEventListener("input", (e) => {
            const element: HTMLInputElement = e.target as HTMLInputElement;
            setValue(element);
        });
    });
}
