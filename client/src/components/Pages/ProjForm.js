import React, { useState } from "react";
import { baseURL } from "../../baseUtils"

export default function ProjForm(props) {
  const [formData, setformData] = useState({
    title: "",
    teamname: "",
    description: "",
    objective: "",
  });
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        fetch(`${baseURL}/api/projects`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            title: formData.title,
            teamname: formData.teamname,
            description: formData.description,
            objective: formData.objective,
          }),
        })
          .then((res) => {
            setLoading(false);
            setformData({
              title: "",
              teamname: "",
              description: "",
              objective: "",
            });
            props.setr(props.r + 1)
          })
          .catch((err) => {
            setLoading(false);
            setformData({
              title: "",
              teamname: "",
              description: "",
              objective: "",
            });
          });
      }}
    >
      <div className="form-floating mb-3">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          value={formData.title}
          onChange={(e) => {
            setformData(prev => ({
              ...prev,
              title: e.target.value
            }))
          }}
        />
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="teamName">Team Name</label>

        <input
          type="text"
          className="form-control"
          id="teamName"
          required
          value={formData.teamname}
          onChange={(e) => {
            setformData(prev => ({
              ...prev,
              teamname: e.target.value
            }))
          }}
        />
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="description">Description</label>

        <textarea
          className="form-control"
          id="description"
          required
          value={formData.description}
          onChange={(e) => {
            setformData(prev => ({
              ...prev,
              description: e.target.value
            }))
          }}
        ></textarea>
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="objective">Objective</label>

        <input
          type="text"
          className="form-control"
          id="objective"
          required
          value={formData.objective}
          onChange={(e) => {
            setformData(prev => ({
              ...prev,
              objective: e.target.value
            }))
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {loading ? "loading..." : "Submit"}
      </button>
    </form>
  );
}
