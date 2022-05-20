import axios from "axios";
import { useEffect, useState } from "react";
import { FaRss } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    Cell
  } from "recharts";
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FF69B4','#7B68EE','#FF0000','#0000FF'];
  const RenderBarChart = () => {
    const [url, setUrl] = useState('https://nmcnpm.herokuapp.com/api/v3/category/statistic')
    const [data, setData] = useState([])
    const [statistic,setStatistic]= useState([]);
    const tmp=[]
    const t=[];
    async function getData() {
      const token = localStorage.getItem("token")
      await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
          .then(res => {
              console.log(res.data.data1);
              res.data.data1.forEach(element => {
                   t.push({name:element.category[0],number:element.number})
              });
              setData(t);
              tmp.push(
                {name:"Đang rảnh","Số lượng xe":res.data.data2.free},
                {name:"Đang ở trạng thái chờ","Số lượng xe":res.data.data2.waiting},
                {name:"Đã có người thuê","Số lượng xe":res.data.data2.hiring},
                {name:"Đang sửa chữa","Số lượng xe":res.data.data2.breakdown}
              )
              setStatistic(tmp);
          })
         
  }
  useEffect(() => {
    getData()
},[url])
    // const data1 = [
    //   { name: "Xe đạp gấp", "Số lượng xe": 121 },
    //   { name: "Xe đạp cào cào", "Số lượng xe": 101 },
    //   { name: "Xe trợ lực", "Số lượng xe": 50 },
    //   { name: "Xe đạp lai", "Số lượng xe": 2 },
    //   { name: "Xe đạp la", "Số lượng xe": 90 },
    // ];
  
    return (
      <div style={{ 
                    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    width: "79%",
    height: "68%",
    backgroundColor: "#FFFFFF",
    borderRadius: "40px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    marginLeft: "3.3%",
    marginTop: "320px", }}>
    <div style={{ 
                    position: "relative",
                    textAlign: "center",
                    top:"0px" }}
>
        <h1 style={{position:"relative",top:"-50px",fontFamily:"Inter"}}>Thống kê số lượng xe</h1>
        <div style={{textAlign: "center",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    }}>
          <div>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="number"
                isAnimationActive={true}
                data={data}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                label
              >{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				    </Pie>
              <Tooltip />
            </PieChart>
            <span style={{position:"relative",top:"50px",fontFamily:"Inter",fontSize:"1vw",fontWeight:"bold"}}>Theo loại xe</span>
          </div>
          <div>
            <BarChart
              width={720}
              height={420}
              data={statistic}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="Số lượng xe" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
            <span style={{position:"relative",top:"50px",fontFamily:"Inter",fontSize:"1vw",fontWeight:"bold",left:"100px"}}>Theo trạng thái</span>
          </div>
        </div>
        </div>
      </div>
    );
  };
  export default RenderBarChart
  
