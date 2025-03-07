import express from "express";
import {
	renderMovies,
	renderPage,
	renderMoviePage,
} from "../lib/renderPage.js";
import { errorHandler } from "../lib/middleware.js";
import { apiRouter } from "./API.js";
import { loadMovieRatings } from "./ratings.js";

function initApp(API) {
	const app = express();

	app.set("view engine", "pug").set("views", "views");

	app
		.get("/", (_req, res) => {
			renderPage(res, "home");
		})
		.get("/home", (_req, res) => {
			renderPage(res, "home");
		})
		.get("/movies", async (_req, res) => {
			const movies = await API;
			renderMovies(res, "movies", movies);
		})
		.get("/movies/:id", async (req, res) => {
			renderMoviePage(res, "movie", req.params.id);
		})
		.get("/test", async (_req, res) => {
			renderPage(res, "test")
		})
		.get("/test-login", (_req, res) => {
			renderPage(res, "test-login");
		});

	app
		.use(express.json())
		.use(apiRouter)
		.use("/static", express.static("./static"))
		.use("/pictures", express.static("./pictures"))
		.use("/content", express.static("./content"))
		.use("/js", express.static("./js"))
		.use("/api", apiRouter);

	app.all("*", (_req, res) => {
		res.status(404);
		const status = res.statusCode;
		res.render("404", { status });
	});

	app.use(errorHandler);

	return app;
}

export default initApp;
