import axios from "axios";
import './index.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Button } from '@mui/material'
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const RenderBarChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [url, setUrl] = useState('https://nmcnpm.herokuapp.com/api/v3/statistic/payment')
  const [statistic, setStatistic] = useState([]);

  function tiennap() {
      setUrl('https://nmcnpm.herokuapp.com/api/v3/statistic/payment')

  }

  function tienthuexe() {
    setUrl('https://nmcnpm.herokuapp.com/api/v3/receptionist/hiring/statistic')
}

  function processDataHiring(payment, days, startDate) {
    const tmp = [];
    let map = new Map();
    if (payment !== []) {
      payment.map(e => { 
        let newDate = new Date(parseInt(e.endDate));
        console.log(newDate);
        let key = String(newDate.getDate()+ '/' + (parseInt(newDate.getMonth())+1));
        if (map.has(key)) {
          let values = parseFloat(map.get(key))+ parseFloat(e.total).toFixed(0);
          map.delete(key)
          map.set(key, values);
        } else map.set(key, parseFloat(e.total).toFixed(0));
      })
      console.log(map);

    }
    if (days <= 30) {
      for (var i=0; i< days; i++) {
        let today = new Date((Math.abs(startDate)+86400000*i));
        let date = today.getDate() + '/' + (parseInt(today.getMonth())+1)
        tmp.push(
          {name: date, "Money":map.get(date)}
        )
      }
      setStatistic(tmp);
      console.log(tmp);
    }


  }

  function processData( payment, days, startDate) {
    const tmp = [];
    let map = new Map();
    if (payment !== []) {

      payment.map(e => {
        let newDate = new Date(e.time);
        let key = String(newDate.getDate()+ '/' + (parseInt(newDate.getMonth())+1));
        if (map.has(key)) {
          let values = parseInt(map.get(key)) + parseInt(e.amount);
          map.delete(key)
          map.set(key, values);
        } else map.set(key, e.amount);
      })

    }

    if (days <= 30) {
      for (var i=0; i< days; i++) {
        let today = new Date((Math.abs(startDate)+86400000*i));
        let date = today.getDate() + '/' + (parseInt(today.getMonth())+1)

        tmp.push(
          {name: date, "Money":map.get(date)}
        )
      }
      setStatistic(tmp);
    }

  }

  async function getData() {
    const token = localStorage.getItem("token")
    await axios.post(url, { startDate: startDate.getTime(), endDate: endDate.getTime() }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log(res.data.data);
        var delta = Math.abs(startDate - endDate) / 1000;
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        if (url === 'https://nmcnpm.herokuapp.com/api/v3/statistic/payment') processData(res.data.data, days+1, startDate);
        if (url === 'https://nmcnpm.herokuapp.com/api/v3/receptionist/hiring/statistic') processDataHiring(res.data.data, days+1, startDate);
      })

  }

  useEffect(() => {
    getData()
  }, [url, startDate, endDate])

  return (
    <div class="baothongke">
      <div style={{
        position: "relative",
        display: "flex",
        top: "50px",
        left: "200px"
      }}>
        <div className="timesup" style={{width: "400px"}}>Tính từ thời điểm: </div>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <div className="timesup" style={{width: "350px"}}>Đến thời điểm: </div>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      <div class='Chart'>
        <BarChart
          width={1200}
          height={420}
          data={statistic}
          margin={{
            top: 50,
            right: 20,
            left: 80,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Money" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        <div style={{display:'flex'}}>
            <Button id="tiennapbutton" onClick={() => {tiennap()}}>Tiền nạp</Button>
            <Button id="tiennapbutton" onClick={() => {tienthuexe()}}>Tiền thuê xe</Button>
        </div>
      </div>
    </div>
  );
};
export default RenderBarChart