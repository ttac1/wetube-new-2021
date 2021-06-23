import Video from "../models/Video.js";
import User from "../models/User";

  
/*

Video.find({},(error, videos)=> { 
   if(error){
   return res.render("Server-error");
  }
  return res.render("home",{pageTitle : "Home", videos});
});

*/
//위가 callback 함수

export const home = async(req, res) => { 
   const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
   //await 는 database를 기다려준다.
   return res.render("home",{pageTitle : "Home", videos});
}; 
//위가 promise 방식
export const watch = async(req,res) => {
   const { id } = req.params;
   const video = await Video.findById(id).populate("owner");
  
   
   //const id = req.params.id; 윗 줄이랑 같음
   if (video === null) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
   } 
   return res.render("watch",{pageTitle : video.title, video});
}; 
//(video === null) 은 (!video) 로 표기하기도 한다.


 export const getEdit = async(req,res) => {
   const { id } = req.params;
   const { user: { _id }} = req.session;
   const video = await Video.findById(id);
   if (video === null) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
   } 
   if (String(video.owner) !== String(_id)) {
      return res.status(403).redirect("/");
   }
   return res.render("edit", {pageTitle : `Edit:${video.title} `, video});
}; 

export const postEdit = async(req,res) => {
   const { id } = req.params;
   const { user: { _id }} = req.session;
   const { title, description, hashtags} = req.body;
   const video = await Video.exists({_id: id });
   if (!video) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
   } 
   if (String(video.owner) !== String(_id)) {
      return res.status(403).redirect("/");
   }
   await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags)
    });
   
   return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
   return res.render("upload", {pageTitle :"Upload Video"});
};

export const postUpload = async (req, res) => {
   const { user: {_id} } =req.session;
   const {path: fileUrl} = req.file;
   const { title, description, hashtags } = req.body;
   try {
   const newVideo = await Video.create({ 
      title,
      description,
      fileUrl,
      owner:_id,
      createdAt : Date.now(),
      hashtags : Video.formatHashtags(hashtags)
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();


   /*
   const video = new Video({ 
      title,
      description,
      createdAt : Date.now(),
      hashtags : hashtags.split(",").map(word => `#${word}`),
      meta : { 
         views : 0,
         rating : 0,
      }
    });
   await video.save();
   
    위의 await Video.create(
       ...
    부분과 같음
  */
  
   return res.redirect("/");
} catch(error) { 
   return res.status(400).render("upload", {pageTitle :"Upload Video",
   errorMessage : error._message
   });
 }
};

export const deleteVideo = async(req,res) => {
   const { id } = req.params;
   const { user: { _id }} = req.session;
   const video = await Video.findById(id);

   if (!video) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
   } 

   if (String(video.owner) !== String(_id)) {
      return res.status(403).redirect("/");
   }
   await Video.findByIdAndDelete(id);
   return res.redirect("/");
    };


export const search = async(req,res) => {
   const { keyword }  =req.query;
   let videos = [];
    if (keyword) {
      videos = await Video.find({ 
         title : { 
            $regex : new RegExp(keyword, "i")
         }
      }).populate("owner");
   }
   return res.render("search", { pageTitle :"Search", videos});
};

export const registerView = async(req,res) => {
   const { id } =req.params;
   const video = await Video.findById(id)
   if(!video) { 
      return res.sendStatus(404);
   }
   video.meta.views = video.meta.views + 1;
   await video.save();
   return res.sendStatus(200);
};