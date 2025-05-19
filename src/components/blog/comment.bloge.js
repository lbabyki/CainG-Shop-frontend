import React from "react";
import "../../assets/css/blog/comment.css";
const comments = [
  {
    id: 1,
    avatar: "https://i.imgur.com/A1.png",
    name: "Scarlet withch",
    date: "6 May, 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
    commentreply: [
      {
        id: 2,
        avatar: "https://i.imgur.com/B2.png",
        name: "Kate moss",
        date: "6 May, 2020",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod.",
      },
    ],
  },
  {
    id: 3,
    avatar: "https://i.imgur.com/A1.png",
    name: "Scarlet withch",
    date: "6 May, 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
];

export default function Comments() {
  const totalComments =
    comments.length +
    comments.reduce((total, reply) => {
      return total + (reply.commentreply ? reply.commentreply.length : 0);
    }, 0);
  return (
    <div className="comments margin-auto">
      <h2>Comments({totalComments})</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <img src={comment.avatar} alt={comment.name} />
          <div className="comment-content">
            <div className="comment-header">
              <strong>{comment.name}</strong>
              <span>{comment.date}</span>
              <a href="#" className="reply">
                Reply
              </a>
            </div>
            <p>{comment.text}</p>

            {comment.commentreply &&
              comment.commentreply.map((reply) => (
                <div key={reply.id} className="comment-reply">
                  <img src={reply.avatar} alt={reply.name} />
                  <div className="comment-content">
                    <div className="comment-header">
                      <strong>{reply.name}</strong>
                      <span>{reply.date}</span>
                      <a href="#" className="reply">
                        Reply
                      </a>
                    </div>
                    <p>{reply.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
