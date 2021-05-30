export const trending = (req, res) => {
   const videos = [ 
      {title : "Hello",
       rating : 5,
      commennt : 2,
      createAt : "2 min ago",
      views : 123,
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
   return res.render("home",{pageTitle : "Home", videos })
}; 
export const upload =(req,res) => res.send("Upload Video");
export const see = (req,res) => res.render("watch", {pageTitle : "Watch"});
 export const edit = (req,res) => res.render("edit", {pageTitle : "Edit"});
 export const deleteVideo = (req,res) => {
    return res.send("Delete Video");
 }; 

export const search = (req,res) => res.send("Search");


