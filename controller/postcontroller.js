import Post from "../models/post.js";
import ExpressError from "../utils/ExpressError.js";
// import PostData from "../data/postData.js";

// const saveAllPosts = async (req, res) => {
//   try {
//     await Post.insertMany(PostData);
//     res.send("Data saved successfully");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };


const showAllPost = async (req, res) => {
  const allPosts = await Post.find();

  res.json(allPosts);


};
const createPost = async (req, res) => {


  const {
    title,
    description,
    price,
    location,
    country
  } = req.body;
  if (!req.file) {
    return res.status(400).json({
      message: "Image upload failed"
    });
  }
  let url = req.file.path;
  let filename = req.file.filename;



  const newPost = new Post({
    title,
    description,
    price,
    location,
    country,
    image: {
      url,
      filename
    },

  });
  await newPost.save();
  res.status(201).send({
    message: "Post created successfully"
  });


}
const detailedPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    throw new ExpressError(404, "Post not Found");
  }


};

const PostEdit = async (req, res) => {
  sdk;



  const id = req.params.id;
  const updateValue = await Post.findByIdAndUpdate(
    id, {
      ...req.body
    }, {
      new: true
    }
  )
  if (!updateValue) {
    throw new ExpressError(404, " not Found");
  }

  res.send({
    message: "Update successful"
  });


};

const deletePost = async (req, res) => {
  const removed = await Post.findByIdAndDelete(req.params.id);
  res.status(200).send({
    message: "deleted succsessfully"
  });


};

export {
  showAllPost,
  createPost,
  detailedPost,
  PostEdit,
  deletePost
};