import { useState } from "react"
import data from "../data.json"
import { MdDelete } from "react-icons/md"
import { BsPencilFill } from "react-icons/bs"

export default function SingleComment({ items, handleDelete, editComment }) {
  const [user] = useState(data.currentUser)

  return (
    <>
      <section className="grid grid-cols-1 gap-5">
        {items.map(({ id, comment }) => (
          <article key={id} className="bg-white p-5 rounded-lg shadow">
            <article>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={user.image.png}
                    alt={user.username}
                    className="w-10"
                  />
                  <h4 className="font-bold ml-3 text-gray-900">
                    {user.username}
                  </h4>

                  {user.username === "juliusomo" && (
                    <p className="px-1 bg-indigo-700 text-white rounded ml-3 text-base">
                      you
                    </p>
                  )}
                </div>

                <ul className="flex items-center">
                  <li className="mx-3">
                    <button
                      className="text-red-500 font-bold flex items-center"
                      onClick={() => handleDelete(id)}
                    >
                      <MdDelete className="mr-1 text-xl" /> Delete
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-indigo-600 font-bold flex items-center"
                      onClick={() => editComment(id)}
                    >
                      <BsPencilFill className="mr-1 text-base" />
                      Edit
                    </button>
                  </li>
                </ul>
              </div>
            </article>
            <p className="text-gray-600 mt-3">{comment}</p>
          </article>
        ))}
      </section>
    </>
  )
}
