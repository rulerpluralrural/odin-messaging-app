import CustomAPIError from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

export default class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCodes = StatusCodes.UNAUTHORIZED;
	}
}