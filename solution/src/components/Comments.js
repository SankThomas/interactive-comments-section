import React, { useEffect, useState } from "react"
import data from "../data.json"
import SingleComment from "./SingleComment"

const getLocalStorage = () => {
  let items = localStorage.getItem("items")

  if (items) {
    return JSON.parse(localStorage.getItem("items"))
  } else {
    return []
  }
}

export default function Comments() {
  const [comments] = useState(data.comments)
  const [user] = useState(data.currentUser)
  const [items, setItems] = useState(getLocalStorage())
  const [text, setText] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert("Please add a comment")
    } else {
      const newComments = {
        id: new Date().getTime().toString(),
        comment: text,
      }
      setItems([newComments, ...items])
      setText("")
      setIsEditing(false)
    }
  }

  const handleDelete = (id) => setItems(items.filter((item) => item.id !== id))

  const editComment = (id) => {
    const editingComment = items.find((item) => item.id === id)
    setItems(items.filter((item) => item.id !== id))
    setIsEditing(true)
    setText(editingComment.comment)
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  return (
    <>
      <section>
        <div className="grid grid-cols-1">
          {comments.map(({ id, content, createdAt, user, replies }) => (
            <div className="grid grid-cols-1 gap-5" key={id}>
              <article className="bg-white p-5 rounded-lg shadow">
                <div className="flex items-center">
                  <img src={user.image.png} alt="" className="w-10 mr-3" />
                  <h2 className="text-gray-900 font-bold mr-3">
                    {user.username}
                  </h2>
                  <p className="text-gray-500">{createdAt}</p>
                </div>
                <p className="text-gray-600 mt-3">{content}</p>
              </article>

              <div className="grid grid-cols-1 gap-5 pl-10">
                {replies.length !== 0 &&
                  replies.map((reply) => (
                    <article
                      key={reply.id}
                      className="bg-white p-5 rounded-lg shadow"
                    >
                      <div className="flex items-center">
                        <img
                          src={reply.user.image.png}
                          alt=""
                          className="w-10 mr-3"
                        />
                        <h2 className="text-gray-900 font-bold mr-3">
                          {reply.user.username}
                        </h2>
                        <p className="text-gray-500">{reply.createdAt}</p>
                      </div>
                      <p className="text-gray-600 mt-3">{reply.content}</p>
                    </article>
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-5">
            <SingleComment
              items={items}
              handleDelete={handleDelete}
              editComment={editComment}
            />
          </div>

          {/* Add a comment */}
          <div className="flex justify-between mt-5 bg-white p-5 rounded shadow">
            <article>
              <img
                src={user.image.png}
                alt={user.username}
                className="w-auto"
              />
            </article>
            <form className="flex items-start" onSubmit={handleSubmit}>
              <textarea
                name="comment"
                id="comment"
                cols="100"
                rows="5"
                placeholder="Add a comment"
                className="w-full rounded p-5 border border-gray-200 ml-3"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="ml-3 py-2 px-6 bg-indigo-700 rounded shadow text-white font-light uppercase text-sm tracking-wider border border-indigo-700 hover:bg-transparent transition-all duration-500 hover:text-indigo-700"
                onClick={handleSubmit}
              >
                {isEditing ? "Editing" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
