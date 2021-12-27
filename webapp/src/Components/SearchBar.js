import { useEffect, useContext } from "react";
import { AppContext } from "../context";
import { TextField } from "@material-ui/core";
import { SearchOutlined } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = () => {
  const { fetchUser, name, setName } = useContext(AppContext);

  useEffect(() => {
    console.log("searching", name);
     fetchUser(name);
  }, [name]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search by name"
      value={name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

export default SearchBar;
