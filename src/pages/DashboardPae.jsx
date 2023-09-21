import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)


export function DashboardPage() {

    const [toys, setToys] = useState([])
    useEffect(() => {
        toyService.query().then((toys) => setToys(toys))
    }, [])

    const data = {
        labels: toyService.getToyLabels(),

        datasets: [{
            label: 'My First Dataset',
            data: toyService.getDataValues(toyService.getLabels(toys)),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 10, 64, 1)',
                'rgba(153, 12, 250, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            hoverOffset: 4
        }]
    }
console.log('data',data.datasets.data)
    return (
        <section style={{ maxWidth: '60vw', margin: 'auto' }}>
            <Doughnut data={data} />
        </section>
    )
}