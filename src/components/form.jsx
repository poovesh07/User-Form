import React, { useState } from "react";
import "../index.css"; // 

function Form() {
  const [data, setData] = useState({
    name: "",
    mail: "",
    age: "",
  });

  const [user, setUser] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedUsers = [...user];
      updatedUsers[editIndex] = data;
      setUser(updatedUsers);
      setEditIndex(null);
    } else {
      setUser([...user, data]);
    }

    setData({
      name: "",
      mail: "",
      age: "",
    });
  };

  const handleDelete = (index) => {
    setUser(user.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setData(user[index]);
    setEditIndex(index);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={data.name} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="mail" value={data.mail} onChange={handleChange} />

        <label>Age</label>
        <input type="number" name="age" value={data.age} onChange={handleChange} />

        <button type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
      </form>

      <div>
        <h2>Submitted Users:</h2>
        <ul>
          {user.map((u, index) => (
            <li key={index}>
              {u.name} — {u.mail} — {u.age}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Form;
