const express=require("express");
const app = express();
const server=require("http").Server(app);
const axios = require("axios");

PORT=process.env.PORT || 8000;


//app.use("/", express.static(__dirname + "/"));

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
 res.render("home")

});


app.post("/download",(req,res)=>{
  let vlink=req.body.vlink;
  let platform=req.body.platform;
  console.log(platform);
  if(platform=="youtube"){
  let newlink=vlink.split('/');
  let len=newlink.length;
  let id=newlink[len-1];

  const options = {
    method: 'GET',
    url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
    params: {id: id, geo: 'DE'},
    headers: {
      'X-RapidAPI-Key': '3650a8ed76msh64e89486efce276p1fdec1jsn520233fcf892',
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
   res.render("download",{data:response.data,query:vlink,platform:"youtube"});
  }).catch(function (error) {
    console.error(error);
  });
  }
  else if(platform=="spotify"){
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader.p.rapidapi.com/SpotifyDownloaderV2',
      params: {
        url: vlink
      },
      headers: {
        'X-RapidAPI-Key': '3650a8ed76msh64e89486efce276p1fdec1jsn520233fcf892',
        'X-RapidAPI-Host': 'spotify-downloader.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      res.render("download",{data:response.data,query:vlink,platform:"spotify"});
    }).catch(function (error) {
      console.error(error);
    });
  }
});

server.listen(PORT);