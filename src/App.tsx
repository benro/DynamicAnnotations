import { useState } from 'react'

import { useRef } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend

} from 'chart.js';
import { Bar, Chart, getDatasetAtEvent } from 'react-chartjs-2';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const lines = new Array();
let theCount = 0;
var theAnnotation = '';

export const options = {
  onClick: (event, elements, chart) => {
    console.log("chart clicked" + event.x);

    // if (elements[0]) {
    //   const i = elements[0].index;
    //   alert(chart.data.labels[i] + ': ' + chart.data.datasets[0].data[i]);
    // }

    console.log(theAnnotation)

    // // Substitute the appropriate scale IDs
    const dataX = chart.scales.x.getValueForPixel(event.x);
    const dataY = chart.scales.y.getValueForPixel(event.y);

    lines.push({

      type: 'label' as const,
      xValue: dataX,
      yValue: dataY,
      backgroundColor: 'rgba(245,245,245)',
      content: [theAnnotation],
      font: {
        size: 10
      }

    });

    chart.update();
  },
  responsive: true,
  events: ['click'],
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
    annotation: {
      annotations:
        lines
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [635, 529, 80, 831, 356, 535, 340],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function App() {
  const [count, setCount] = useState(0)
  const [myAnnotation, setAnnotation] = useState("Enter an Annotation")
  theCount = count;
  theAnnotation = myAnnotation;


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more and more
        safasdfasdfasdf
      </p>
      {/* <Bar options={options} data={data} onClick={onClick} /> */}
      <input placeholder="Enter Annotation"
        type="string"
        value={myAnnotation}
        onChange={(e) => setAnnotation((myAnnotation) => e.target.value)} />
      <Bar options={options} data={data} />
    </>
  )
}

export default App
