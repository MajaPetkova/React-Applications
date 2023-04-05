import { useState, useContext } from "react";
import { GithubContext } from "../../context/github/GithubContext";

export const UserSearch = () => {
  const [text, setText] = useState("");
  const { users, searchUsers, clearUsers} = useContext(GithubContext);

  const handleChange = (ev) => {
    setText(ev.target.value);
  };
  const submitHandler = (ev) => {
    ev.preventDefault();
    if (text === "") {
      alert("Please enter something");
    } else {
      searchUsers(text)
      setText("");
    }
  };
  return (
    <div className="search">
      <div className="form">
        <form onSubmit={submitHandler} className="form-control">
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={text}
          />
          <button className="btn-search">Go</button>
        </form>
      </div>
      {users.length > 0 && <button className="btn-clear" onClick={clearUsers}>Clear</button>}
      
    </div>
  );
};
