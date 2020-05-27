const SimplexNoise = require("simplex-noise");
import Generator from "./Generator";
import World from "../world/World";
import { Game } from "../index";

export enum Biome {
    Volcano = 0xa00000,
    Desert = 0xdfca78,
    Grass = 0x7fb46d,
    Forest = 0x286c1a,
    Mountain = 0x95897b,
    Water = 0xafd1e7,
}

export default class WorldGenerator extends Generator {
    public static ElevationDeepOceanThreshold = -2;
    public static ElevationSeaLevelThreshold = 0.789;
    public static ElevationMountainThreshold = 1.266;

    public static MoistureVolcanoThreshold = 0.009;
    public static MoistureMountainThreshold = 2.65;
    public static MoistureGrassThreshold = 0.54;
    public static MoistureForestThreshold = 0.89;

    private static gen = new SimplexNoise();

    public static elevationPower = 1;
    public static moisturePower = 1;

    static reset() {
        WorldGenerator.gen = new SimplexNoise();
    }

    static setThreshold(name: any, value: number) {
        (this as any)[name] = value;
    }

    static getThreshold(name: any): number {
        return (this as any)[name];
    }

    noise(nx: number, ny: number) {
        return WorldGenerator.gen.noise2D(nx, ny) / 2 + 0.5;
    }

    private getBiome(elevation: number, moisture: number): Biome {
        if (elevation >= WorldGenerator.ElevationMountainThreshold) {
            if (moisture <= WorldGenerator.MoistureVolcanoThreshold) return Biome.Volcano;
            if (moisture >= WorldGenerator.MoistureMountainThreshold) return Biome.Mountain;
            return Biome.Desert;
        }

        if (elevation >= WorldGenerator.ElevationSeaLevelThreshold) {
            if (moisture >= WorldGenerator.MoistureForestThreshold) return Biome.Forest;
            return Biome.Grass;
        }

        if (elevation >= WorldGenerator.ElevationDeepOceanThreshold) {
            if (moisture <= WorldGenerator.MoistureVolcanoThreshold) return Biome.Volcano;
            return Biome.Water;
        }

        return Biome.Grass;
    }

    private calculateNoise(x: number, y: number, power: number) {
        const normalX = x / World.width - 0.5;
        const normalY = y / World.height - 0.5;

        const sample =
            this.noise(1 * normalX, 1 * normalY) +
            0.5 * this.noise(2 * normalX, 2 * normalY) +
            0.25 * this.noise(4 * normalX, 4 * normalY);

        return Math.pow(sample, power);
    }

    generate() {
        for (let y = 1; y <= World.height; y++) {
            for (let x = 1; x <= World.width; x++) {
                const d = Math.abs(x / World.width - 1 / 2) + Math.abs(y / World.height - 1 / 2);
                const elevation: number = (1 + this.calculateNoise(x, y, WorldGenerator.elevationPower) - d) / 2;
                const moisture: number = (1 + this.calculateNoise(x, y, WorldGenerator.moisturePower) - d) / 2;
                const biome: number = this.getBiome(elevation, moisture);

                Game.getWorld().tiles[(y - 1) * World.width + x - 1].tint = biome;
            }
        }
    }
}
