import { jest } from '@jest/globals';
import request from "supertest";
import { apiRouter } from "../../src/API.js";
import express from "express";

const app = express();
app.use("/api", apiRouter);

describe("GET /api/movies/:movieId/reviews", () => {
	it("should return paginated reviews with only verified reviews", async () => {
		const response = await request(app).get("/api/movies/1/reviews?page=1&pageSize=5");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
		// Check that every returned review is verified (verified === true)
		response.body.data.forEach(review => {
			expect(review.attributes.verified).toBe(true);
		});
		expect(response.body.data.length).toBeLessThanOrEqual(5);
	});

	it("should return paginated reviews", async () => {
		const response = await request(app).get("/api/movies/1/reviews?page=1&pageSize=5");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data.length).toBeLessThanOrEqual(5);
	});

	it("should return 404 if no reviews exist", async () => {
		const response = await request(app).get("/api/movies/9999/reviews?page=1&pageSize=5");
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message", "This movie has no review yet!");
	});

	it("should return an error if CMS API fails", async () => {
		jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("CMS API is down"));

		const response = await request(app).get("/api/movies/1/reviews?page=1&pageSize=5");
		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty("error", "CMS API is down");

		global.fetch.mockRestore();
	});

	it("should return 400 for invalid movieId", async () => {
		const response = await request(app).get("/api/movies/invalid/reviews?page=1&pageSize=5");
		expect(response.status).toBe(400);
	});
});