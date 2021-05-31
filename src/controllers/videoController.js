let videos = [ 
   {title : "First Video",
    rating : 5,
   commennt : 2,
   createAt : "2 min ago",
   views : 1,
   id : 1
   },
   {title : "Hello2",
    rating : 2,
   commennt :14,
   createAt : "1 min ago",
   views : 432,
   id : 2
   },
   {title : "Hello3",
    rating : 4,
   commennt : 3,
   createAt : "1 min ago",
   views : 123423,
   id : 3
   }
];
export const trending = (req, res) => {
   return res.render("home",{pageTitle : "Home", videos })
}; 
export const watch = (req,res) => {
   const { id } = req.params;
   //const id = req.params.id; 윗 줄이랑 같음
   const video = videos[id-1]
   return res.render("watch",{pageTitle : `Watching: ${video.title}`, video});
}; 
 export const getEdit = (req,res) => {
   const { id } = req.params;
   const video = videos[id-1]
   return res.render("edit", {pageTitle : `Editing: ${video.title}`, video});
}; 
export const postEdit = (req,res) => {
   const { id } = req.params;
   const { title }=req.body;
   videos[id-1].title = title;
   return res.redirect(`/videos/${id}`);
};



