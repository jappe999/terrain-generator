import World from "~/world/World";

export default abstract class Generator {
    constructor(protected world: World) {}

    abstract generate(): void;
}
