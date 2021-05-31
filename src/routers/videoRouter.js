import express from "express";
import {watch,upload,deleteVideo,getEdit,postEdit} from "../controllers/videoController"

const videoRouter = express.Router();


videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
//videoRouter.get("/:id(\\d+)/edit", getEdit);
//videoRouter.post("/:id(\\d+)/edit", postEdit);
//이 두줄을 합쳐놓은 것이 위의 한 줄



export default videoRouter;