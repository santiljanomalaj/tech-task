import React from "react";
import {
  getAllUsers,
  getOneUser,
  editUser,
  createUser,
  deleteUser,
  deleteMultipleUsers,
} from "./api/userApi";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [displayData, setDisplayData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [modalData, setModalData] = React.useState({
    isOpen: false,
    title: "",
    data: {},
  });

  const fetchUser = (searchName) => {
    if (searchName === "") {
      setDisplayData([...data].map((x) => x.id));
    } else if (searchName) {
      setDisplayData(
        [...data]
          .filter((user) => {
            return `${user.name} ${user.surname}`
              .toLowerCase()
              .includes(searchName.toLowerCase());
          })
          .map((x) => x.id)
      );
    }
  };

  // React.useEffect(() => {
  //   console.log("data:", data);
  // }, [data]);
  // React.useEffect(() => {
  //   console.log("displayData:", displayData);
  // }, [displayData]);

  return (
    <AppContext.Provider
      value={{
        getAllUsers,
        getOneUser,
        editUser,
        createUser,
        deleteUser,
        deleteMultipleUsers,
        fetchUser,
        data,
        setData,

        displayData,
        setDisplayData,

        name,
        setName,

        modalData,
        setModalData,

        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
