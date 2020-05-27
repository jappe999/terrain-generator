import { Application, settings, SCALE_MODES } from "pixi.js";

export const container = document.querySelector<HTMLElement>("#app-container");
container.oncontextmenu = () => false;

const app = new Application({
    width: container.clientWidth,
    height: container.clientHeight,
    transparent: true,
});

settings.SCALE_MODE = SCALE_MODES.NEAREST;

document.body.style.margin = "0";

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

window.onresize = () => {
    app.renderer.resize(container.clientWidth, container.clientHeight);
};

// Add the canvas that Pixi automatically created for you to the HTML document
container.appendChild(app.view);

export default app;
