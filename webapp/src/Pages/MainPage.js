import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context";
import styled from "styled-components";
import SearchBar from "../Components/SearchBar";
// import ListItem from "../Components/ListItem";
import CustomDialog from "../Components/Dialogs";
// import { CircularProgress } from "@material-ui/core";
// import Table from '../Components/Tables'
import EnhancedTable from "../Components/Tables/EnhancedTable";


const Container = styled.main`
  display: grid;
  grid-area: 2/2/4/4;
  background: var(--clr-background);
  width: 80vw;
  height: 70vh;
  /* justify-items: center; */
`;

// const ScrollableContainer = styled.div`
//   overflow-y: auto;
// `;

// const Hrline = styled.br`
//   display: block;
//   content: "";
//   height: 5px;
// `;

const MainPage = () => {
  const {
    getAllUsers,
    deleteUser,
    deleteMultipleUsers,

    data,
    setData,
    displayData,
    setDisplayData,

    modalData,
    setModalData,

    loading,
    setLoading,
  } = useContext(AppContext);


  const [deletingID, setDeletingID] = useState(-1);

  useEffect(() => {
    getAllUsers().then((items) => {
      setData(items);
      setDisplayData(items.map((x) => x.id));
      setLoading(false);
    });
  }, [getAllUsers, setData, setDisplayData, setLoading /* deletingID */]);

  const getDeletingID = (id) => {
    setDeletingID(id);
  };

  function onYesClicked(toDelete) {
    console.log("yes clicked in modal, deletingID is:", toDelete);
    const { selectedData } = toDelete;
    if (selectedData.length === 1) {
      // deleteUser(deletingID);
      deleteUser(selectedData[0]).then(() => {
        // setDisplayData((oldState) => {
        //   oldState.filter((x) => !selectedData.includes(x.id));
        // });
      });
    } else if (selectedData.length > 1) {
      deleteMultipleUsers(selectedData).then(() => {
        // setDisplayData((oldState) => {
        //   oldState.filter((x) => !selectedData.includes(x));
        // });
      });
    }

    setDeletingID(-1);
  }

  return (
    <>
      {modalData && (
        <CustomDialog
          modalData={modalData}
          setModalData={setModalData}
          // title={`Are you sure you want to delete all ${data
          //   .filter((x) => x.id === deletingID)
          //   .map((y) => y.name)}'s data?`}
          onYesClicked={onYesClicked}
          // deletingID={deletingID}
        />
      )}

      <Container>
        <SearchBar />
        {/* {!loading ? (
          <ScrollableContainer>
            {data
              .filter((x) => displayData.includes(x.id))
              .map((x) => {
                return (
                  <div key={x.id}>
                    <ListItem profile={x} parentCallback={getDeletingID} />
                    <Hrline />
                  </div>
                );
              })}
          </ScrollableContainer>
        ) : (
          <CircularProgress style={{ justifySelf: "center" }} />
        )} */}

        {/* <Table data={data.filter((x) => displayData.includes(x.id))}></Table> */}

        <EnhancedTable
          data={displayData && data.filter((x) => displayData.includes(x.id))}
        />
      </Container>
    </>
  );
};

export default MainPage;
