import Review from "../models/review.js";
import Post from "../models/post.js";
import ExpressError from "../utils/ExpressError.js";

const reviewnew = async (req, res) => {
  const { rating, comment, postId } = req.body;

  if (!rating || !comment || !postId) {
    return res.status(400).json({ message: "Rating and comment are required" });
  }

  const post = await Post.findById(postId);
  const newReview = new Review({
    rating,
    comment,
    postId,
  });
  await newReview.save();
  post.review.push(newReview._id);
  await post.save();

  res.status(201).send({ message: "review created successfully" });

 
};

const showreview = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate("review");

  if (!post) {
    throw new ExpressError(404, "Post not Found");
  }
  res.json(post.review);

  
};

const deletereview = async (req, res) => {
  const remove = await Review.findByIdAndDelete(req.params.id);
  if (!remove) {
    throw new ExpressError(404, "Review not Found");
  }
  res.status(200).send({ message: "deleted succsessfully" });

 
};

export { reviewnew, showreview, deletereview };
