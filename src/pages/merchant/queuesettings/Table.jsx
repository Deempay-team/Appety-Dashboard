import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/MerchantLayout";
import axios from "axios";

const column = ["Queue", "Pax (Min)", "Pax (Max)", "Waiting Time", "Action"];

const TablePage = () => {
  const modalRef = useRef();
  const [isDropDown, setIsDropDown] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uname, setUName] = useState("");
  const [uemail, setUEmail] = useState("");
  const [editId, setEditId] = useState(-1);

  const closeDropDown = (e) => {
    if (modalRef.current === e.target) {
      setIsDropDown(false);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //ADD DATA TO ARRAY
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = data.length + 1;
    axios
      .post("http://localhost:3000/users", { id: id, name: name, email: email })
      .then((res) => {
        //TO RELOAD PAGE AFTER UPDATE
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
    .get("http://localhost:3000/users"+id)
    .then((res) => {
        setUName(res.data.name)
        setUEmail(res.data.email)
    })
    .catch((err) => console.log(err));
    setEditId(id);
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:3000/users" + editId, { id: editId, name: uname, email: uemail })
      .then((res) => {
        console.log(res);
        window.location.reload();
        setEditId(-1);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
    .delete("http://localhost:3000/users"+id)
    .then((res) => {
        window.location.reload();
    })
    .catch((err) => console.log(err));
  };
  

  return (
    <>
      <div className="bg-[yellow]">
        <div>
          <form className="mb-4" onSubmit={handleSubmit}>
            <input
              className="mr-3"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button>Add</button>
          </form>
        </div>
        <table className=" max-w-[650px] text-base text-center py-1  border-collapse ">
          <thead className="text_16 font-normal capitalize bg-[#ffffff] ">
            <tr className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]">
              <th className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]">
                ID
              </th>
              <th className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]">
                Name
              </th>
              <th className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]">
                Email
              </th>
              <th className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" border-b border-solid border-[#d7d7d7] ">
            {data.map((user, index) =>
              user.id === editId ? (
                <tr>
                  <td className="text_16 px-2 py-5 capitalize">{user.id}</td>
                  <td className="text_16 px-2 py-5 capitalize">
                    <input
                      type="text"
                      value={uname}
                      onChange={(e) => setUName(e.target.value)}
                    />
                  </td>
                  <td className="text_16 px-2 py-5 capitalize">
                    <input
                      type="text"
                      value={uemail}
                      onChange={(e) => setUEmail(e.target.value)}
                    />
                  </td>
                  <td className="text_16 px-2 py-5 capitalize">
                    <button
                      onClick={handleUpdate}
                      className="bg-[green] text-[#fff] p-4"
                    >
                      Update
                    </button>
                    <button className="bg-[red] text-[#fff] p-4">Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={index}
                  className="hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
                >
                  <td className="text_16 px-2 py-5 capitalize">{user.id}</td>
                  <td className="text_16 px-2 py-5 capitalize">{user.name}</td>
                  <td className="text_16 px-2 py-5 capitalize">{user.email}</td>
                  <td className="text_16 px-2 py-5 capitalize">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-[green] text-[#fff] p-4"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="bg-[red] text-[#fff] p-4">Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* </main>
      </Layout> */}
    </>
  );
};

export default TablePage;
