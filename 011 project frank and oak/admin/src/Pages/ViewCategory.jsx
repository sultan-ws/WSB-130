import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const fetchCategories = () => {
    axios.get(`http://localhost:4400/api/admin-panel/parent-category/read-categories`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdateStatus = (e) => {
    const status = (e.target.textContent === 'Active') ? false : true;

    axios.put(`http://localhost:4400/api/admin-panel/parent-category/update-status/${e.target.value}`, { status })
      .then((response) => {
        fetchCategories();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status has been updated",
          showConfirmButton: false,
          timer: 600
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:4400/api/admin-panel/parent-category/delete-category/${id}`)
          .then((response) => {
            fetchCategories();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleCheckCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckedCategories([...checkedCategories, value]);
    } else {
      setCheckedCategories(checkedCategories.filter((category) => category !== value));
    }
  }

  const handleDeleteCategories = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post(`http://localhost:4400/api/admin-panel/parent-category/delete-categories`, {ids: checkedCategories})
          .then((response) => {
            fetchCategories();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  const handleCheckAll = (e) => {
    const { checked } = e.target;

    if (checked) {
      setCheckedCategories(categories.map((category) => category._id));
      setIfAllChecked(true)
    } else {
      setCheckedCategories([]);
      setIfAllChecked(false)
    }
  };

  useEffect(() => {
    setIfAllChecked(categories.length === checkedCategories.length && categories.length !== 0);
  }, [categories, checkedCategories]);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handleDeleteCategories}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleCheckAll}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="my-tooltip" />
            {
              categories.map((category, index) => (
                <tr className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      onClick={handleCheckCategory}
                      className="accent-[#5351c9] cursor-pointer"
                      checked={checkedCategories.includes(category._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }
                    >
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        Deserunt nam est delectus itaque sint harum architecto.
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete onClick={() => handleDeleteCategory(category._id)} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${'parentCategory._id'}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={handleUpdateStatus}
                      value={category._id}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={(category.status) ? 'Click to Inactive' : 'Click to Active'}
                      className={`py-[4px] w-[60px] rounded-sm  text-white ${(category.status) ? 'bg-green-500' : 'bg-red-400'}`}
                    >
                      {(category.status) ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))
            }



          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
