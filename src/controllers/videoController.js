import Video from "../models/Video.js";


  
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
   const videos = await Video.find({}).sort({createdAt:"desc"});
   //await 는 database를 기다려준다.
   return res.render("home",{pageTitle : "Home", videos});
}; 
//위가 promise 방식
export const watch = async(req,res) => {
   const { id } = req.params;
   const video = await Video.findById(id);
   
   //const id = req.params.id; 윗 줄이랑 같음
   if (video === null) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
   } 
   return res.render("watch",{pageTitle : video.title, video});
}; 
//(video === null) 은 (!video) 로 표기하기도 한다.


 export const getEdit = async(req,res) => {
   const { id } = req.params;
   const video = await Video.findById(id);
   if (video === null) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
   } 
   return res.render("edit", {pageTitle : `Edit:${video.title} `, video});
}; 

export const postEdit = async(req,res) => {
   const { id } = req.params;
   const { title, description, hashtags} = req.body;
   const video = await Video.exists({_id: id });
   if (!video) {
      return res.status(404).render("404",{pageTitle : "Video not found."});
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
   try {
   const { title, description, hashtags } = req.body;
   await Video.create({ 
      title,
      description,
      createdAt : Date.now(),
      hashtags : Video.formatHashtags(hashtags)
    });

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
      });
   };
   return res.render("search", { pageTitle :"Search", videos});
};