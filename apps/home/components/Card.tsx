import axios from "axios";
import React from "react";
import { mutate } from "swr";
import { Text } from "ui";
import BlogCard from "ui/components/Cards/BlogCard";
import { IBlog } from "ui/lib/interfaces";
import { DoesUserLikeBlog, DoesUserSaveBlog } from "../api/blog";
import { GetSession } from "../api/user";

function Card({
  blog,
  isSmall,
  index,
}: {
  blog: IBlog;
  isSmall?: boolean;
  index?: number;
}) {
  const doesUserLikeBlog = DoesUserLikeBlog(blog.id);
  const doesUserSaveBlog = DoesUserSaveBlog(blog.id);
  const session = GetSession();
  const handleLike = () => {
    try {
      if (session.session?.user) {
        if (doesUserLikeBlog.data) {
          if (doesUserLikeBlog.data.doesLike) {
            axios
              .delete("/blog/like", { withCredentials: true })
              .then((res) => {
                alert("DELETE A LIKE?");
                mutate(`/blog/isLiked/${blog.id}`);
              })
              .catch((err) => console.log("ERROR"));
          } else {
            axios
              .post(
                "/blog/like",
                { blogId: blog.id },
                { withCredentials: true }
              )
              .then((res) => {
                mutate(`/blog/isLiked/${blog.id}`);
              })
              .catch((err) => console.log("ERROR"));
          }
        }
      } else {
      }
    } catch {
      console.log("ERRROR");
    }
  };

  const handleBookmark = () => {
    try {
      if (doesUserSaveBlog.data) {
        if (doesUserSaveBlog.data.doesSave) {
          axios
            .delete("/blog/save", { withCredentials: true })
            .then((res) => {
              alert("Remove from the bookmark?");
              mutate(`/blog/isSaved/${blog.id}`);
            })
            .catch((err) => console.log("ERROR"));
        } else {
          axios
            .post("/blog/save", { blogId: blog.id }, { withCredentials: true })
            .then((res) => {
              mutate(`/blog/isSaved/${blog.id}`);
            })
            .catch((err) => console.log("ERROR"));
        }
      }
    } catch {
      console.log("ERRROR");
    }
  };
  return (
    <div className="bg-red-200 h-full max-h-full">
      <BlogCard
        props={blog}
        session={session.session}
        likeclick={() => handleLike()}
        doesLike={doesUserLikeBlog.data?.doesLike}
        isSmall={isSmall}
        index={index}
        bookmarkclick={handleBookmark}
        doesSave={doesUserSaveBlog.data?.doesSave}
      />
    </div>
  );
}

export default Card;
