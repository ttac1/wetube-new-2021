import express from "express";
import {watch,getEdit,postEdit,getUpload,postUpload} from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
//videoRouter.get("/:id(\\d+)/edit", getEdit);
//videoRouter.post("/:id(\\d+)/edit", postEdit);
//이 두줄을 합쳐놓은 것이 위의 한 줄
//videoRouter.get("/upload", getUpload);
//videoRouter.post("/upload", postUpload);
//이 두줄을 합쳐놓은 것아 아래 한 줄

export default videoRouter;