import React from "react";
import "./myGigs.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });
console.log(data)
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("myGigs");
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  
  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((x) => (
              <tr key={x._id}>
                <td>
                  <img className="img" src={x.cover} alt="" />
                </td>

                <td>{x.title}</td>
                <td>{x.price}$</td>
                <td>{x.sales}</td>
                <td>
                  <img
                    src="/images/delete.png"
                    alt=""
                    className="delete"
                    onClick={() => handleDelete(x._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
