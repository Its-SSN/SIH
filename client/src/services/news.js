import axios from "axios";
const db_url = "http://127.0.0.1:5000";
export const fetchNews = (query) => {
  const dat = { name: query };
  console.log(dat);
  return axios.post(`${db_url}/news`, dat);
};

export const getAllNews = ()=>{
  return axios.get(`${db_url}/news`)
}

export const startTask=  ()=>{
  return axios.get(`${db_url}/start_task`)
}

export const stopTask=  ()=>{
  return axios.get(`${db_url}/stop_task`)
}