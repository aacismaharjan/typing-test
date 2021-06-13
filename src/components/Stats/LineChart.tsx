import { Line } from "react-chartjs-2";
import moment from "moment";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const GameLineChart = (props: any) => {
  const data = {
    labels: props.items.map((item: any) => moment(item.startTime).fromNow()),
    datasets: [
      {
        label: "Accuracy",
        data: props.items.map((item: any) => item.accuracy),
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
      },
      {
        label: "WPM Net",
        data: props.items.map((item: any) => item.wpmNet),
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
      },
      {
        label: "WPM Gross",
        data: props.items.map((item: any) => item.wpmGross),
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div className="bg-white p-3 rounded">
        <Line type="line" data={data} options={options} />
      </div>
    </>
  );
};

export default GameLineChart;
