import React from "react";
import delete_icon from "../assets/icons/delete.svg";
import edit_icon from "../assets/icons/edit.svg";

const PostItem = ({ post, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(post.post_id);
  };

  const handleDelete = () => {
    onDelete(post.post_id);
  };

  return (
    <tr key={post.post_id}>
      <td className="post-image">
          <img
            src={post.post_image_path}
            className="post-image"
            alt="Post Image"/>
      </td>
      <td>{post.post_content}</td>
      <td>{post.source_string}</td>
      <td>
        <img
          src={delete_icon}
          alt="Delete post"
          className="icon"
          onClick={handleDelete}
        />
      </td>
      <td>
        <img
          src={edit_icon}
          alt="Edit post"
          className="icon"
          onClick={handleEdit}
        />
      </td>
    </tr>
  );
};

export default PostItem;
