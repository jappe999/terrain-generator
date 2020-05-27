import { container } from "../app";
import { Sprite, Texture } from "pixi.js";
import World from "../world/World";

export default class Tile extends Sprite {
    constructor(public id: number) {
        super(Texture.WHITE);

        this.x =
            World.tileSize * Math.floor(id % World.width) +
            container.clientWidth / 2 -
            World.width * (World.tileSize / 2);
        this.y =
            World.tileSize * Math.floor(id / World.width) +
            container.clientHeight / 2 -
            World.height * (World.tileSize / 2);
        this.height = this.width = World.tileSize;
    }
}
