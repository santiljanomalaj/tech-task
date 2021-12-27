// TODO: your api calls should be here
import axios from "axios";

const baseURL = "http://localhost:9090";
const headers = { "Content-Type": "application/json" };

async function getAllUsers() {
  return await axios
    .get(`${baseURL}/users`)
    .then((response) => {
      return response.data.content;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getOneUser(id) {
  return await axios
    .get(`${baseURL}/user/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function editUser(user, id) {
  return await axios
    .put(`${baseURL}/user/${id}`, user, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createUser(newUser) {
  return await axios
    .post(`${baseURL}/users`, newUser, { headers })
    .then((response) => {
      return response.data;
    }) //check status if 201 OK;
    .catch((err) => {
      console.log(err);
    });

  //   name: "test",
  //   surname: "Marku",
  //   birthDate: "1961-09-23",
  //   email: "test@test",
  //   password: "12345678",
  //   phone: "511.419.5179",
  //   identity: "374-60-0297",
  //   passportNumber: "010923-0524",
  //   ...newUser,
}
async function deleteUser(id) {
  return await axios
    .delete(`${baseURL}/user/${id}`)
    .then() //check status if 204 no content OK
    .catch((err) => {
      console.log(err);
    });
}
async function deleteMultipleUsers(listOfUsers) {
  return await axios
    .delete(`${baseURL}/users`, {
      headers: headers,
      data: JSON.stringify(listOfUsers),
    })
    .then() //check status if 204 no content OK
    .catch((err) => {
      console.log(err);
    });
}

export {
  getAllUsers,
  getOneUser,
  editUser,
  createUser,
  deleteUser,
  deleteMultipleUsers,
};
