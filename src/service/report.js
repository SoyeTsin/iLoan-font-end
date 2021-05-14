import ajax from "../lib/ajax";

const Report = {
  getFileList(param) {
    return new Promise((resolve, reject) => {
      ajax
        .post("/il/FM140002", { isOldBody: true, FormID: "FM140002", body: param })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getNameList(param) {
    return new Promise((resolve, reject) => {
      ajax
        .post("/il/FM140003", { isOldBody: true, FormID: "FM140003", body: param })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default Report;
