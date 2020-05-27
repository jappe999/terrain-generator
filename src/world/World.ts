import { Container } from "pixi.js";
import Tile from "../entity/Tile";

export default class World extends Container {
    public static tileSize: number = 10;
    public static get height() {
        return Math.round(document.body.clientHeight / this.tileSize);
    }
    public static get width() {
        return Math.round(document.body.clientWidth / this.tileSize);
    }

    public debug = true;

    public tiles: Tile[] = [];

    constructor() {
        super();

        this.placeObjects();
    }

    private placeObjects() {
        for (let i = 0; i < World.height * World.width; i++) {
            const tile = new Tile(i);
            this.tiles.push(tile);
            this.addChild(tile);
        }
    }
}
