/* eslint-disable no-undef */

import express from "express";
import dbConnect from "./db/dbConnect.js";
import dotenv from "dotenv";
import Blog from "./model/blog.model.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import { upload } from "./cloudinary/multer.js";
import { uploadOnCloudinary } from "./cloudinary/index.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://blogmgnt.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.json({
//     message: " hello baedhjd ",
//     name: "samir",
//     yetikai: "sagar",
//     status: 200,
//   });
// });

//create blog api

app.post("/blog", upload.single("image"), async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
   const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }
    const data = await Blog.create({
      title,
      subTitle,
      description,
      Image: cloudinaryResponse.url ,
     cloudinaryId:cloudinaryResponse.public_id
    });

    res.status(201).json({ message: "Blog created", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving blog" });
  }
});

// get all blogs
app.get("/blog", async (req, res) => {
  const data = await Blog.find();

  res.json({
    message: " successfully  get all blogs ",
    data: data,
  });
});

// get single  blog

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;

  const data = await Blog.findById(id);
  if (data) {
    res.json({
      message: " successfully got single Blog ",
      data: data,
    });
  } else {
    res.json({
      message: "error while getting single Blog",
    });
  }
});

// delete blog by id
app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;

  const data = await Blog.findByIdAndDelete(id);
  const cloudinaryId=data.cloudinaryId
    // Delete from Cloudinary
    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId);
    }

  res.json({
    message: "deleted successfully ",
    data: data,
  });
});

//update
app.patch("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const { title, subTitle, description } = req.body;

  const data = await Blog.findByIdAndUpdate(id, {
    title,
    subTitle,
    description,
  });

  if (data) {
    res.status(200).json({
      message: " updated successfully ",
      data: data,
    });
  } else {
    res.status(400).json({
      message: " error on update  ",
    });
  }
});

// app.patch("/blog", async(req,res)=>{
//  const {title,subTitle,description}=req.body
//   const foundContent = await Blog.findOne({
//      title
//   })
//   foundContent.title=title
//   foundContent.subTitle=subTitle
//   foundContent.description=description
//     await foundContent.save();
//     res.json({
//        " message ":"successfully updated ",

//     })

// })

app.listen(port, () => {
  dbConnect();
  console.log(" successfully hosted on port:3000");
});
